from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api.models.task import Task
from backend.database.session import get_db

router = APIRouter()

@router.post("/create/")
async def create_task(task_data: dict, db: Session = Depends(get_db)):
    task = Task(**task_data)
    db.add(task)
    db.commit()
    return {"message": "Task created successfully"}

@router.get("/get_task_by_id/{task_id}")
async def get_task_by_id(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.get("/get_task_by_title/{title}")
async def get_task_by_title(title: str, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.title == title).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/delete_task_id/{task_id}")
async def delete_task_by_id(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}

@router.put("/update_task/{task_id}")
async def update_task(task_id: int, task_data: dict, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task_data.items():
        setattr(task, key, value)
    db.commit()
    return {"message": "Task updated successfully"}

@router.get("/get_all_tasks/")
async def get_all_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

@router.get("/get_task_by_status/{status}")
async def get_task_by_status(status: str, db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.status == status).all()
    return tasks

@router.get("/get_task_by_group/{group_id}")
async def get_task_by_group(group_id: int, db: Session = Depends(get_db)):
    tasks = db.query(Task).join(Task.groups).filter(group_id == group_id).all()
    return tasks

@router.put("/add_group_to_task/{task_id}/{group_id}")
async def add_group_to_task(task_id: int, group_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.groups.append(group_id)
    db.commit()
    return {"message": "Group added to task successfully"}
