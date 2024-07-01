from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api.models.user import User
from database.session import get_db
from backend.core.security import create_access_token
from datetime import timedelta 

router = APIRouter()

@router.post("/")
async def login_user(login_req: dict, db: Session = Depends(get_db)):
    email = login_req['email']
    password = login_req['password']
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.check_password(password):
        raise HTTPException(status_code=401, detail="Senha e/ou e-mail incorreto(s)")
    
    expires_delta = timedelta(minutes=30)
    access_token = create_access_token(
        data={
            "id": user.id,
            "email": user.email, 
            "name": user.name, 
            "confirmationQuestion": user.confirmation_question, 
            "confirmationAnswer": user.confirmation_answer,
            "avatar": user.avatar
        }, 
        expires_delta=expires_delta
    )
    return {"access_token": access_token}