from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, EmailStr, ConfigDict


# ---------------- USERS ----------------

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    created_at: datetime


# ---------------- TOKEN ----------------

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class TokenData(BaseModel):
    user_id: Optional[str] = None


# ---------------- POSTS ----------------

class PostBase(BaseModel):
    title: str
    content: str
    cover_image: Optional[str] = None
    published: bool = True

class PostCreate(PostBase):
    pass


class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    published: Optional[bool] = None


class PostResponse(PostBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    author_id: str
    created_at: datetime
    updated_at: Optional[datetime]

    author: UserResponse

    like_count: int = 0
    comment_count: int = 0


# ---------------- COMMENTS ----------------

class CommentCreate(BaseModel):
    content: str

class CommentPost(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
class CommentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    content: str

    author_id: str
    post_id: str

    created_at: datetime

    author: UserResponse
    post: CommentPost


# ---------------- PASSWORD ----------------

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str


# ---------------- CONFESSIONS ----------------

class ConfessionCreate(BaseModel):
    content: str
    theme_color: str = "rose"


class ReactionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    emoji: str
    count: int


class ConfessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    content: str
    theme_color: str
    created_at: datetime

    reactions: List[ReactionResponse] = []



# ---------------- OVERHEARD ----------------

class OverheardCreate(BaseModel):
    content: str
    theme_color: str = "blue"


class OverheardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    content: str
    theme_color: str

    created_at: datetime

