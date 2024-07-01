from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text
from backend.api.models.task import Task
from backend.api.models.user import User
from backend.api.models.group import user_group
from backend.database.session import get_db
from backend.core.security import get_current_user

router = APIRouter()

@router.post("/")
async def create_task(task_data: dict = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        task_data["created_by"] = current_user.id  # Adiciona o created_by com o ID do usuário atual
        task = Task(**task_data)
        db.add(task)
        db.commit()
        db.refresh(task)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Task already exists")
    except Exception as e:
        print(e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")
    
    return {"message": "Task created successfully", "task": task}

@router.put("/{task_id}")
async def update_task(task_id: int, task_data: dict = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail=f"Task with id {task_id} not found")
    
    try:
        for key, value in task_data.items():
            setattr(task, key, value)
        db.commit()
        db.refresh(task)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Task update failed")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")
    
    return {"message": "Task updated successfully", "task": task}

@router.get("/{task_id}")
async def get_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = db.query(Task).join(User, Task.created_by == User.id).join(
        user_group, User.id == user_group.c.user_id).filter(
                or_(
                    Task.created_by == current_user.id,  # Tarefas criadas pelo próprio usuário
                    user_group.c.group_id.in_([group.id for group in current_user.groups])  # Tarefas de usuários nos grupos do usuário atual
                )
            ).first()      
    if not task:
        raise HTTPException(status_code=404, detail=f"Task with id {task_id} not found or you don't have access")
    return task

@router.get("/")
async def get_all_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    print(current_user.id)
    tasks = db.query(Task).join(User, Task.created_by == User.id).join(
        user_group, User.id == user_group.c.user_id).filter(
                or_(
                    Task.created_by == current_user.id,  # Tarefas criadas pelo próprio usuário
                    user_group.c.group_id.in_([group.id for group in current_user.groups])  # Tarefas de usuários nos grupos do usuário atual
                )
            ).all()
    return tasks

@router.delete("/{task_id}")
async def delete_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail=f"Task with id {task_id} not found")
    
    try:
        db.execute(text(f"""UPDATE tasks SET deleted = True WHERE id = {task_id}"""))
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")
    
    return {"message": "Task deleted successfully"}
