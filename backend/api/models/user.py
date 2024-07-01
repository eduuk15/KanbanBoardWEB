from database.base import Base
from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
import bcrypt
from .group import user_group

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(255), unique=True, index=True)
    password = Column(String)
    confirmation_question = Column(Enum('1', '2', '3', name='confirmation_question_enum')) 
    confirmation_answer = Column(String)
    avatar = Column(Enum('1', '2', '3', '4', '5', '6', '7', '8', name='avatar_enum'))

    created_tasks = relationship("Task", back_populates="creator", foreign_keys="[Task.created_by]")
    assigned_tasks = relationship("Task", back_populates="assigned_user", foreign_keys="[Task.assigned_user_id]")

    groups = relationship("Group", secondary=user_group, back_populates="users")
    created_groups = relationship("Group", back_populates="creator")

    invites = relationship("Invite", back_populates="user")

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
