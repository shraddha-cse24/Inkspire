from .. import auth
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models

router = APIRouter(
    prefix="/api/likes",
    tags=["Likes"],
)


@router.post("/{post_id}")
def toggle_like(
    post_id: str,
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

    like = (
        db.query(models.Like)
        .filter(
            models.Like.post_id == post_id,
            models.Like.user_id == current_user.id,
        )
        .first()
    )

    if like:
        db.delete(like)
        db.commit()
        return {"liked": False}

    like = models.Like(
        post_id=post_id,
        user_id=current_user.id,
    )

    db.add(like)
    db.commit()

    return {"liked": True}

@router.get("/{post_id}/status")
def like_status(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    like = (
        db.query(models.Like)
        .filter(
            models.Like.post_id == post_id,
            models.Like.user_id == current_user.id,
        )
        .first()
    )

    return {"liked": like is not None}