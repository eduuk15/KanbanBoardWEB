from sqlalchemy import Column, Integer, String
#test
#test
from database.base import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    description = Column(String)
    status = Column(String)
