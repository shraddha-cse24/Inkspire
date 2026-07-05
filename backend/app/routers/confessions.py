from .. import auth, models
from fastapi import (
    APIRouter,
    Depends,
    status,
    HTTPException,
)
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas

router = APIRouter(
    prefix="/api/confessions",
    tags=["Confessions"],
)


@router.post(
    "/",
    response_model=schemas.ConfessionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_confession(
    confession: schemas.ConfessionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    new_confession = models.Confession(
        content=confession.content,
        theme_color=confession.theme_color,
        author_id=current_user.id,
    )

    db.add(new_confession)
    db.commit()
    db.refresh(new_confession)

    return new_confession


@router.get(
    "/",
    response_model=list[schemas.ConfessionResponse],
)
def get_confessions(
    db: Session = Depends(get_db),
):
    return (
        db.query(models.Confession)
        .order_by(models.Confession.created_at.desc())
        .all()
    )

@router.delete("/{confession_id}")
def delete_confession(
    confession_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):

    confession = (
        db.query(models.Confession)
        .filter(models.Confession.id == confession_id)
        .first()
    )

    if not confession:
        raise HTTPException(
            status_code=404,
            detail="Confession not found",
        )

    if confession.author_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not allowed",
        )

    db.delete(confession)
    db.commit()

    return {"message": "Deleted"}

class ReactionBody(BaseModel):
    emoji: str


@router.post("/{confession_id}/react")
def react(
    confession_id: str,
    body: ReactionBody,
    db: Session = Depends(get_db),
):

    reaction = (
        db.query(models.ConfessionReaction)
        .filter(
            models.ConfessionReaction.confession_id == confession_id,
            models.ConfessionReaction.emoji == body.emoji,
        )
        .first()
    )

    if reaction:
        reaction.count += 1
    else:
        reaction = models.ConfessionReaction(
            confession_id=confession_id,
            emoji=body.emoji,
            count=1,
        )
        db.add(reaction)

    db.commit()

    return {"success": True}