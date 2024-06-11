# backend/api/routes/user.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api.models.user import User
from backend.database.session import get_db
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, constr
from typing import Optional

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    name: constr(min_length=3, max_length=50) # type: ignore
    email: EmailStr
    password: constr(min_length=8, max_length=50) # type: ignore
    security_question: enumerate
    security_answer: str

@router.post("/user/create")
async def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    
    #verifica se o usuário ou o email já existe
    if db.query(User).filter(User.name == user_data.name).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    #Cria Novo Usuário
    new_user = User(
        name = user_data.name,
        email = user_data.email,
        password = pwd_context.hash(user_data.password),
        security_question = user_data.security_question,
        security_answer = user_data.security_answer
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user_id": new_user.id}

@router.get("/user/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")	

@router.get("/user/")
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@router.put("/user_update/{user_id}")
async def update_user(user_id: int, user_data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.update(user_data)
        db.commit()
        return {"message": "User updated successfully"}
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/user/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
        return {"message": "User deleted successfully"}
    raise HTTPException(status_code=404, detail="User not found")