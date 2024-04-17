# backend/api/models/task.py

from sqlalchemy import Column, Integer, String
from backend.database.base import Base

# Modelo de dados para tarefas do Kanban Board
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    status = Column(String, index=True)
