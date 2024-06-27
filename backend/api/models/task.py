from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from backend.database.base import Base
from backend.api.models.associations import group_tasks


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    description = Column(String)
    status = Column(Enum('1', '2', '3', name='status_enum'))

    groups = relationship("Group", secondary=group_tasks, back_populates="tasks")