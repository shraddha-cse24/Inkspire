from datetime import timedelta

from .. import auth, models,schemas
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..database import get_db

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=schemas.Token,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db),
):

    existing = (
        db.query(models.User)
        .filter(models.User.email == user.email)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    hashed_password = auth.get_password_hash(
        user.password
    )

    new_user = models.User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        hashed_password=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = auth.create_access_token(
        {
            "sub": new_user.id,
        },
        timedelta(
            minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES
        ),
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": new_user,
    }


@router.post(
    "/login",
    response_model=schemas.Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    user = (
        db.query(models.User)
        .filter(
            models.User.email == form_data.username
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    if not auth.verify_password(
        form_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    access_token = auth.create_access_token(
        {
            "sub": user.id,
        },
        timedelta(
            minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES
        ),
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user,
    }


@router.get(
    "/me",
    response_model=schemas.UserResponse,
)
def me(
    current_user: models.User = Depends(
        auth.get_current_user
    ),
):
    return current_user