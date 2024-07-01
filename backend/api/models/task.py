from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Date, Boolean
from backend.database.base import Base
from sqlalchemy.orm import relationship

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    description = Column(String)
    status = Column(String)
    type = Column(Enum("fix", "feature", "investigation", "refactor", name="type_enum"))
    priority = Column(Enum("1", "2", "3", name="priority_enum"))
    assigned_user_id = Column(Integer, ForeignKey('users.id'))
    created_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(Date)
    updated_by = Column(Integer)
    updated_at = Column(Date)
    deleted = Column(Boolean, default=False)
    deleted_by = Column(String)
    due_date = Column(Date)

    creator = relationship("User", back_populates="created_tasks", foreign_keys="[Task.created_by]")
    assigned_user = relationship("User", back_populates="assigned_tasks", foreign_keys="[Task.assigned_user_id]")
