from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.api.models.task import Task
from backend.api.models.user import User
from backend.database.session import get_db
from backend.core.security import get_current_user
from backend.api import schemas

router = APIRouter()


@router.post("/create/")
async def create_task(
    task_data: schemas.CreateTask = Body(), db: Session = Depends(get_db)
):

    task = Task(**task_data.model_dump())

    db.add(task)
    db.commit()
    return {"message": "Task created successfully"}


@router.get("/")
async def get_all_tasks(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    users = db.query(Task).all()
    return users


@router.get("/{task_id}")
async def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task is None:
        raise HTTPException(
            status_code=404, detail=f"Task com id {task_id} não foi encontrada"
        )
    return task

@router.delete("/{task_id}")
async def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        raise HTTPException(
            status_code=404, detail=f"Task com id {task_id} não foi encontrada"
        )
    
    db.execute(text(f"""UPDATE tasks SET deleted = True WHERE id = {task_id}"""))
    db.commit()

    return {"message": "Task deleted successfully"}