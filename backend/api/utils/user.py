from backend.api.schemas.user import User
from sqlalchemy.orm import Session
from fastapi import status, HTTPException


def user_data_by_id(db: Session, user_id: str) -> User:
    user_data = db.query(User).filter(User.id == user_id).first()

    if user_data:
        return User(id=user_data.id, name=user_data.name, email=user_data.email)
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )

def user_data_by_name(db: Session, user_name: str) -> User:
    user_data = db.query(User).filter(User.name == user_name).first()

    if user_data:
        return User(id=user_data.id, name=user_data.name, email=user_data.email)
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )
