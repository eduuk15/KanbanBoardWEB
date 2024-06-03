from fastapi import APIRouter, Depends, HTTPException, status
from backend.database.session import get_db
from sqlalchemy.orm import Session
from backend.api.schemas.user import User
from backend.api.utils.user import user_data_by_id, user_data_by_name

router = APIRouter()


@router.post("/")
async def create_user(user_data: dict, db: Session = Depends(get_db)):
    user = User(**user_data)
    db.add(user)
    db.commit()
    return {"message": "User created successfully"}


@router.get("user_data/{id}", response_model=User)
async def get_user_data_by_id(id: str, db: Session = Depends(get_db)) -> User:
    user = user_data_by_id(db, user_id=id)

    return user


@router.get("user_data/{name}")
async def get_user_data_by_id(name: str, db: Session = Depends(get_db)) -> User:
    user = user_data_by_name(db, user_name=name)

    return user
