from .. import auth, models
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas

router = APIRouter(
    prefix="/api/users",
    tags=["Users"],
)


@router.get(
    "/me",
    response_model=schemas.UserResponse,
)
def get_me(
    current_user: models.User = Depends(auth.get_current_user),
):
    return current_user


@router.get(
    "/me/posts",
    response_model=list[schemas.PostResponse],
)
def my_posts(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):

    posts = (
        db.query(models.Post)
        .filter(models.Post.author_id == current_user.id)
        .order_by(models.Post.created_at.desc())
        .all()
    )

    for post in posts:
        post.like_count = len(post.likes)
        post.comment_count = len(post.comments)

    return posts


@router.get(
    "/me/comments",
    response_model=list[schemas.CommentResponse],
)
def my_comments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):

    return (
        db.query(models.Comment)
        .filter(models.Comment.author_id == current_user.id)
        .order_by(models.Comment.created_at.desc())
        .all()
    )

@router.get(
    "/me/bookmarks",
    response_model=list[schemas.PostResponse],
)
def my_bookmarks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):

    bookmarks = (
        db.query(models.Bookmark)
        .filter(models.Bookmark.user_id == current_user.id)
        .all()
    )

    posts = []

    for bookmark in bookmarks:
        post = bookmark.post

        post.like_count = len(post.likes)
        post.comment_count = len(post.comments)

        posts.append(post)

    return posts