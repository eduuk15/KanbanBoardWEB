from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from database.session import get_db
from api.models.user import User

SECRET_KEY = "5(tF902mya(QAznBorLZIjnCN+_4DLdF"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def read_access_token(token: str) -> Optional[int]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("id")
        return user_id
    except JWTError:
        return None
    
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> Optional[User]:
    user_id = read_access_token(token)
    if user_id is None:
        return None
    return db.query(User).filter(User.id == user_id).first()