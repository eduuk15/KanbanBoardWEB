from sqlalchemy import Column, Integer, String, Enum, Index
from sqlalchemy.orm import relationship
from backend.database.base import Base
import bcrypt
from backend.api.models.associations import user_groups

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String)
    confirmation_question = Column(Enum('1', '2', '3', name='confirmation_question_enum')) 
    confirmation_answer = Column(String)

    groups = relationship("Group", secondary=user_groups, back_populates="users")

def set_password(self, password: str):
        self.password = self.generate_password_hash(password)

def check_password(self, password: str):
    return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
def check_security_answer(self, answer: str) -> bool:
    return str(self.confirmation_answer).lower() == answer.lower()
    
@staticmethod
def generate_password_hash(password: str) -> str:
    hashed_bytes = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')