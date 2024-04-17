# backend/main.py

from fastapi import FastAPI
from backend.database.base import Base
from backend.database.engine import engine
from backend.api.routes.task import router as task_router

app = FastAPI()

# Importa todos os modelos de dados que deseja criar tabelas
from backend.api.models.task import Task

# Cria todas as tabelas definidas nos modelos de dados
Base.metadata.create_all(bind=engine)

# Inclui as rotas definidas no router de tarefas
app.include_router(task_router)
