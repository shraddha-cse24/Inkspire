from ..import auth, models
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas

router = APIRouter(
    prefix="/api/overheard",
    tags=["Overheard"],
)


@router.post(
    "/",
    response_model=schemas.OverheardResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_snippet(
    snippet: schemas.OverheardCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    new_snippet = models.OverheardSnippet(
        content=snippet.content,
        theme_color=snippet.theme_color,
    )

    db.add(new_snippet)
    db.commit()
    db.refresh(new_snippet)

    return new_snippet


@router.get(
    "/",
    response_model=list[schemas.OverheardResponse],
)
def get_snippets(
    db: Session = Depends(get_db),
):
    return (
        db.query(models.OverheardSnippet)
        .order_by(models.OverheardSnippet.created_at.desc())
        .all()
    )