from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api.models.user import User
from backend.database.session import get_db
from backend.core.security import create_access_token  # Função para criar o token JWT
from datetime import timedelta  # Opcional: para definir a expiração do token

router = APIRouter()

@router.post("/create/")
async def create_user(user_data: dict, db: Session = Depends(get_db)):
    user = User(**user_data)
    db.add(user)
    db.commit()
    db.refresh(user)

    expires_delta = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": user.id}, expires_delta=expires_delta)

    return {"message": "User created successfully", "access_token": access_token}
