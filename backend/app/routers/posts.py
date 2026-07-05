from .. import auth, models
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..import schemas

router = APIRouter(
    prefix="/api/posts",
    tags=["Posts"],
)


@router.post(
    "/",
    response_model=schemas.PostResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_post(
    post: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    new_post = models.Post(
        title=post.title,
        content=post.content,
        cover_image=post.cover_image,
        published=post.published,
        author_id=current_user.id,
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    new_post.like_count = len(new_post.likes)
    new_post.comment_count = len(new_post.comments)

    return new_post


@router.get(
    "/",
    response_model=list[schemas.PostResponse],
)
def get_posts(
    db: Session = Depends(get_db),
):
    posts = (
        db.query(models.Post)
        .order_by(models.Post.created_at.desc())
        .all()
    )

    for post in posts:
        post.like_count = len(post.likes)
        post.comment_count = len(post.comments)

    return posts


@router.get(
    "/{post_id}",
    response_model=schemas.PostResponse,
)
def get_post(
    post_id: str,
    db: Session = Depends(get_db),
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

    post.like_count = len(post.likes)
    post.comment_count = len(post.comments)

    return post


@router.put(
    "/{post_id}",
    response_model=schemas.PostResponse,
)
def update_post(
    post_id: str,
    data: schemas.PostUpdate,
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

    if post.author_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not allowed",
        )

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(post, key, value)

    db.commit()
    db.refresh(post)

    post.like_count = len(post.likes)
    post.comment_count = len(post.comments)

    return post


@router.delete(
    "/{post_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_post(
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

    if post.author_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not allowed",
        )

    db.delete(post)
    db.commit()