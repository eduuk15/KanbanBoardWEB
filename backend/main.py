from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database.base import Base
from backend.database.engine import engine
from backend.api.routes.task import router as task_router
from backend.api.routes.user import router as user_router
from backend.api.routes.login import router as login_router
from backend.api.routes.group import router as group_router

app = FastAPI()

@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "https://kanbanboardweb.up.railway.app, http://localhost:3000, https://kanbanboardweb-production.up.railway.app, http://kanbanboardweb.up.railway.app"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://kanbanboardweb.up.railway.app",
        "https://kanbanboardweb-production.up.railway.app",
        "http://kanbanboardweb.up.railway.app"
        # Adicione outras origens permitidas aqui
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from backend.api.models.task import Task
from backend.api.models.user import User
from backend.api.models.group import Group, user_group
from backend.api.models.invite import Invite


Base.metadata.create_all(bind=engine)

app.include_router(task_router, prefix='/tasks', tags=['tasks'])
app.include_router(user_router, prefix='/users', tags=['users'])
app.include_router(login_router, prefix='/login', tags=['login'])
app.include_router(group_router, prefix='/groups', tags=['groups'])