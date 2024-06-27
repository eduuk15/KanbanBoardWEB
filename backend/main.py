from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database.base import Base
from backend.database.engine import engine
from backend.api.routes.task import router as task_router
from backend.api.routes.user import router as user_router
from backend.api.routes.login import router as login_router

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from backend.api.models.task import Task
from backend.api.models.user import User

Base.metadata.create_all(bind=engine)

app.include_router(task_router, prefix='/tasks', tags=['tasks'])
app.include_router(user_router, prefix='/users', tags=['users'])
app.include_router(login_router, prefix='/login', tags=['login'])