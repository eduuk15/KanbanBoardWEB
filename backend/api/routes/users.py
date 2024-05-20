from fastapi import APIRouter, Depends
from backend.database.session import get_db
from sqlalchemy.orm import Session
from backend.api.models.users import User

router = APIRouter()

@router.post("/")
async def create_user(user_data: dict, db: Session = Depends(get_db)):
    user = User(**user_data)
    db.add(user)
    db.commit()
    return {"message": "User created successfully"}

@router.get("/{id}")
async def get_user(id: str, db: Session = Depends(get_db)):
    user = db.get(id)
    
    return user