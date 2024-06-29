from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backend.database.base import Base

class Invite(Base):
    __tablename__ = "invites"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    group_id = Column(Integer, ForeignKey("groups.id"), primary_key=True)

    user = relationship("User", back_populates="invites")
    group = relationship("Group", back_populates="invites")
