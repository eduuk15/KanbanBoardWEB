# backend/api/models/user.py

from sqlalchemy import Column, Integer, String
from backend.database.base import Base

# Modelo de dados para usuários
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, index=True, nullable=False)
    security_question = Column(String, index=True, nullable=False)
    security_answer = Column(String, index=True, nullable=False)