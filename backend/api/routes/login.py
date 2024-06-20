from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api.models.user import User
from backend.database.session import get_db
from backend.core.security import create_access_token  # Função para criar o token JWT
from datetime import timedelta  # Opcional: para definir a expiração do token

router = APIRouter()

@router.post("/")
async def login_user(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.check_password(password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    expires_delta = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": user.id}, expires_delta=expires_delta)

    return {"access_token": access_token}