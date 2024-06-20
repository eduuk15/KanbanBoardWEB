from sqlalchemy import Column, Integer, String, Enum, Index
from backend.database.base import Base
import bcrypt

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(255), unique=True, index=True)
    password = Column(String)
    confirmation_question = Column(Enum('1', '2', '3', name='confirmation_question_enum')) 
    confirmation_answer = Column(String)

    def set_password(self, password: str):
        self.password = self.generate_password_hash(password)

    def check_password(self, password: str):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
    @staticmethod
    def generate_password_hash(password: str) -> str:
        hashed_bytes = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return hashed_bytes.decode('utf-8')