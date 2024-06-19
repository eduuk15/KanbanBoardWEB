# backend/main.py

from fastapi import FastAPI
from backend.database.base import Base
from backend.database.engine import engine
from backend.api.routes.task import router as task_router
from backend.api.routes.user import router as user_router

app = FastAPI()

# Importa todos os modelos de dados que deseja criar tabelasrewrw
from backend.api.models.task import Task
from backend.api.models.user import User

# Cria todas as tabelas definidas nos modelos de dados
Base.metadata.create_all(bind=engine)

# Inclui as rotas definidas no router de tarefas
app.include_router(task_router, prefix='/tasks', tags=['tasks'])
app.include_router(user_router, prefix='/users', tags=['users'])