# backend/main.py

from fastapi import FastAPI, Depends
from backend.database.models import Base
from backend.database.engine import engine
from backend.api.routes.task import router as task_router
from backend.api.routes.users import router as users_router

app = FastAPI(
    root_path=""
)

# Cria todas as tabelas definidas nos modelos de dados
Base.metadata.create_all(bind=engine)

# Inclui as rotas definidas no router de tarefas
app.include_router(task_router, prefix='/tasks', tags=['Tasks'])
app.include_router(users_router, prefix='/user', tags=['Users'])