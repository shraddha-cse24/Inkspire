from .. import auth, models
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas

router = APIRouter(
    prefix="/api/comments",
    tags=["Comments"],
)


@router.post(
    "/post/{post_id}",
    response_model=schemas.CommentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_comment(
    post_id: str,
    data: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):

    post = (
        db.query(models.Post)
        .filter(models.Post.id == post_id)
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found",
        )

    comment = models.Comment(
        content=data.content,
        author_id=current_user.id,
        post_id=post_id,
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment


@router.get(
    "/post/{post_id}",
    response_model=list[schemas.CommentResponse],
)
def get_comments(
    post_id: str,
    db: Session = Depends(get_db),
):

    return (
        db.query(models.Comment)
        .filter(models.Comment.post_id == post_id)
        .order_by(models.Comment.created_at.desc())
        .all()
    )