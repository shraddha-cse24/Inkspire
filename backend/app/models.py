import uuid

from sqlalchemy import (
    Column,
    String,
    Text,
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


def generate_uuid():
    return str(uuid.uuid4())


# ==========================
# User
# ==========================

class User(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, default=generate_uuid)

    email = Column(String, unique=True, nullable=False, index=True)
    username = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)

    hashed_password = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    posts = relationship(
        "Post",
        back_populates="author",
        cascade="all, delete",
    )

    comments = relationship(
        "Comment",
        back_populates="author",
        cascade="all, delete",
    )

    likes = relationship(
        "Like",
        back_populates="user",
        cascade="all, delete",
    )

    bookmarks = relationship(
        "Bookmark",
        back_populates="user",
        cascade="all, delete",
    )


# ==========================
# Posts
# ==========================

class Post(Base):
    __tablename__ = "posts"

    id = Column(
        String,
        primary_key=True,
        default=generate_uuid,
    )

    title = Column(String, nullable=False)

    content = Column(Text, nullable=False)

    cover_image = Column(String, nullable=True)

    published = Column(
        Boolean,
        default=True,
    )

    author_id = Column(
        String,
        ForeignKey(
            "profiles.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    author = relationship(
        "User",
        back_populates="posts",
    )

    comments = relationship(
        "Comment",
        back_populates="post",
        cascade="all, delete",
    )

    likes = relationship(
        "Like",
        back_populates="post",
        cascade="all, delete",
    )

    bookmarks = relationship(
        "Bookmark",
        back_populates="post",
        cascade="all, delete",
    )


# ==========================
# Comments
# ==========================

class Comment(Base):
    __tablename__ = "comments"

    id = Column(
        String,
        primary_key=True,
        default=generate_uuid,
    )

    content = Column(
        Text,
        nullable=False,
    )

    author_id = Column(
        String,
        ForeignKey(
            "profiles.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    post_id = Column(
        String,
        ForeignKey(
            "posts.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    author = relationship(
        "User",
        back_populates="comments",
    )

    post = relationship(
        "Post",
        back_populates="comments",
    )


# ==========================
# Likes
# ==========================

class Like(Base):
    __tablename__ = "likes"

    id = Column(
        String,
        primary_key=True,
        default=generate_uuid,
    )

    user_id = Column(
        String,
        ForeignKey(
            "profiles.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    post_id = Column(
        String,
        ForeignKey(
            "posts.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    user = relationship(
        "User",
        back_populates="likes",
    )

    post = relationship(
        "Post",
        back_populates="likes",
    )


# ==========================
# Bookmarks
# ==========================

class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(
        String,
        primary_key=True,
        default=generate_uuid,
    )

    user_id = Column(
        String,
        ForeignKey(
            "profiles.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    post_id = Column(
        String,
        ForeignKey(
            "posts.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    user = relationship(
        "User",
        back_populates="bookmarks",
    )

    post = relationship(
        "Post",
        back_populates="bookmarks",
    )


# ==========================
# Confessions
# ==========================

class Confession(Base):
    __tablename__ = "confessions"

    id = Column(
        String,
        primary_key=True,
        default=generate_uuid,
    )

    content = Column(
        Text,
        nullable=False,
    )

    theme_color = Column(
        String,
        default="rose",
    )

    author_id = Column(
        String,
        ForeignKey(
            "profiles.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    reactions = relationship(
    "ConfessionReaction",
    cascade="all, delete",
    )


class ConfessionReaction(Base):
    __tablename__ = "confession_reactions"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    confession_id = Column(
        String,
        ForeignKey(
            "confessions.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    emoji = Column(
        String,
        nullable=False,
    )

    count = Column(
        Integer,
        default=1,
    )
    confession = relationship(
    "Confession",
    )


# ==========================
# Overheard
# ==========================

class OverheardSnippet(Base):
    __tablename__ = "overheard_snippets"

    id = Column(
        String,
        primary_key=True,
        default=generate_uuid,
    )

    content = Column(
        String(150),
        nullable=False,
    )

    theme_color = Column(
        String,
        default="blue",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )