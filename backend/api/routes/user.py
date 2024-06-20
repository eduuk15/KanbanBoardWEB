from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from backend.api.models.user import User
from backend.database.session import get_db
from backend.core.security import create_access_token, get_current_user
from datetime import timedelta

router = APIRouter()

@router.post("/")
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

@router.get("/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail=f"Usuário com id {user_id} não foi encontrado")
    return user

@router.get("/")
async def get_all_users(current_user: int = Depends(get_current_user), db: Session = Depends(get_db)):
    print(current_user)
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    users = db.query(User).all()
    return users