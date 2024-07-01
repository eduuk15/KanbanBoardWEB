from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.base import Base
from database.engine import engine
from api.routes.task import router as task_router
from api.routes.user import router as user_router
from api.routes.login import router as login_router
from api.routes.group import router as group_router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
    "https://kanbanboardweb.up.railway.app",
    "https://kanbanboardweb.up.railway.app:8080",
    "http://kanbanboardweb-production.up.railway.app",
    "https://kanbanboardweb-production.up.railway.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],   
)

from api.models.task import Task
from api.models.user import User
from api.models.group import Group, user_group
from api.models.invite import Invite


Base.metadata.create_all(bind=engine)

app.include_router(task_router, prefix='/tasks', tags=['tasks'])
app.include_router(user_router, prefix='/users', tags=['users'])
app.include_router(login_router, prefix='/login', tags=['login'])
app.include_router(group_router, prefix='/groups', tags=['groups'])