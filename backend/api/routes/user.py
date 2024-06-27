from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from backend.api.models.user import User
from backend.database.session import get_db
from backend.core.security import create_access_token, get_current_user
from datetime import timedelta

router = APIRouter()

@router.post("/create_new_user/")
async def create_user(user_data: dict, db: Session = Depends(get_db)):
    try:
        user = User(**user_data)
        if 'password' in user_data:
            user.set_password(user_data['password'])
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")

    expires_delta = timedelta(minutes=30)
    access_token = create_access_token(data={"id": user.id, "email": user.email}, expires_delta=expires_delta)
    return {"message": "Usuário criado com sucesso!", "access_token": access_token}

@router.get("/get_by_id/{user_id}")
async def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/get_by_name/{name}")
async def get_user_by_name(name: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.name == name).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/get_by_email/{email}")
async def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/delete_user_id/{user_id}")
async def delete_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}