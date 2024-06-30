from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.models.task import Task
from database.session import get_db

router = APIRouter()

@router.post("/create/")
async def create_task(task_data: dict, db: Session = Depends(get_db)):
    task = Task(**task_data)
    db.add(task)
    db.commit()
    return {"message": "Task created successfully"}
