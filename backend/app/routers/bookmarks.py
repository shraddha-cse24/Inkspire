from .. import auth
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models

router = APIRouter(
    prefix="/api/bookmarks",
    tags=["Bookmarks"],
)


@router.post("/{post_id}")
def toggle_bookmark(
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

    bookmark = (
        db.query(models.Bookmark)
        .filter(
            models.Bookmark.post_id == post_id,
            models.Bookmark.user_id == current_user.id,
        )
        .first()
    )

    if bookmark:
        db.delete(bookmark)
        db.commit()
        return {"bookmarked": False}

    bookmark = models.Bookmark(
        user_id=current_user.id,
        post_id=post_id,
    )

    db.add(bookmark)
    db.commit()

    return {"bookmarked": True}

@router.get("/{post_id}/status")
def bookmark_status(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    bookmark = (
        db.query(models.Bookmark)
        .filter(
            models.Bookmark.post_id == post_id,
            models.Bookmark.user_id == current_user.id,
        )
        .first()
    )

    return {"bookmarked": bookmark is not None}