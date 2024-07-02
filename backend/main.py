from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.base import Base
from database.engine import engine
from api.routes.task import router as task_router
from api.routes.user import router as user_router
from api.routes.login import router as login_router
from api.routes.group import router as group_router
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from api.models.user import User
from database.session import get_db
from core.security import create_access_token
from datetime import timedelta 

app = FastAPI(servers=[
    {"url": "https://kanbanboardweb-production-e73b.up.railway.app", "description": "Prod environment"},
])


@app.get("/")
async def root():
    return {"greeting": "Hello, World!", "message": "Welcome to FastAPI!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "PUT", "DELETE", "POST"],
    allow_headers=["*"],
)

from api.models.task import Task
from api.models.user import User
from api.models.group import Group, user_group
from api.models.invite import Invite


Base.metadata.create_all(bind=engine)

@app.post("/login")
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

app.include_router(task_router, prefix='/tasks', tags=['tasks'])
app.include_router(user_router, prefix='/users', tags=['users'])
# app.include_router(login_router, prefix='/login', tags=['login'])
app.include_router(group_router, prefix='/groups', tags=['groups'])