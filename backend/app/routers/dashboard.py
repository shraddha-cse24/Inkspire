from .. import auth
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
def dashboard(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    stories = (
        db.query(models.Post)
        .filter(models.Post.author_id == current_user.id)
        .count()
    )

    confessions = (
        db.query(models.Confession)
        .filter(models.Confession.author_id == current_user.id)
        .count()
    )

    overheard = (
        db.query(models.OverheardSnippet)
        .count()
    )

    recent_posts = (
        db.query(models.Post)
        .filter(models.Post.author_id == current_user.id)
        .order_by(models.Post.created_at.desc())
        .limit(5)
        .all()
    )
    comments = (
    db.query(models.Comment)
    .filter(models.Comment.author_id == current_user.id)
    .count()
    )

    return {
        "user": current_user,
        "stats": {
            "stories": stories,
            "comments": comments,
            "confessions": confessions,
            "overheard": overheard,
        },
        "recent_posts": recent_posts,
    }