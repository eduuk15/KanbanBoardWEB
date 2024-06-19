from sqlalchemy import Column, Integer, String, Enum, Index
from backend.database.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String)
    confirmation_question = Column(Enum('1', '2', '3', name='confirmation_question_enum')) 
    confirmation_answer = Column(String)
