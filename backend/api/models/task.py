# backend/api/models/task.py

from sqlalchemy import Column, Integer, String
from backend.database.base import Base

# Modelo de dados para tarefas do Kanban Board
class Task(Base):
    __tablename__ = "tasks"

    id: int = Column(Integer, primary_key=True)
    title: str = Column(String, index=True)
    description: str = Column(String, index=True)
    status: str = Column(String, index=True)
    #user_responsible: str = Column(String, index=True)