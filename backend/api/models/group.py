from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from backend.database.base import Base
from backend.api.models.associations import group_tasks, user_groups

class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)

    tasks = relationship("Task", secondary=group_tasks, back_populates="groups")
    users = relationship("User", secondary=user_groups, back_populates="groups")