from sqlalchemy import Column, Integer, String
from backend.database.base import Base

class User(Base):
    __tablename__ = "users"

    id: str = Column(String, primary_key=True)
    name: str = Column(String, index=True)
    email: str = Column(String, index=True)
    password: str = Column(String, index=True)