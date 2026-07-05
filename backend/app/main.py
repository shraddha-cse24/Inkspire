from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import Base, engine
from .routers import auth
from .routers import dashboard
from .routers import posts
from .routers import users
from .routers import confessions
from .routers import overheard
from .routers import comments
from .routers import likes
from .routers import bookmarks

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Inkspire API")

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(posts.router)
app.include_router(users.router)
app.include_router(confessions.router)
app.include_router(overheard.router)
app.include_router(comments.router)
app.include_router(likes.router)
app.include_router(bookmarks.router)

@app.get("/")
def root():
    return {
        "message": "Inkspire Backend Running 🚀"
    }