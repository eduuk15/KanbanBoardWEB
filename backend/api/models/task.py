from sqlalchemy import Column, Integer, String, Enum, Date, Boolean
from backend.database.base import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    description = Column(String)
    status = Column(String)
    priority = Column(Enum("1", "2", "3", name="priority_enum"))
    assigned_user_id = Column(Integer)
    created_by = Column(Integer)
    created_at = Column(Date)
    updated_by = Column(Integer)
    updated_at = Column(Date)
    deleted = Column(Boolean, default=False)
    deleted_by = Column(String)
