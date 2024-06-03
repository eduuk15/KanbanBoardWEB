# backend/api/routes/task.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.session import get_db
from sqlalchemy import select

router = APIRouter()

@router.post("/create/")
async def create_task(task_data: dict, db: Session = Depends(get_db)):
    task = Task(**task_data)
    db.add(task)
    db.commit()
    return {"message": "Task created successfully"}

@router.get("/{id}")
async def get_task(id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id)
    
    return task.count()