from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from backend.api.models.task import Task
from backend.api.models.user import User
from backend.api.models.group import user_group
from database.session import get_db
from backend.core.security import get_current_user

router = APIRouter()

def user_can_access_task(task_id: int, db: Session, current_user: User):
    own_task = db.query(Task).filter(Task.id == task_id, Task.created_by == current_user.id).first()
    
    if own_task:
        return True
    
    if not current_user.groups:
        return False

    group_task = db.query(Task).join(User, Task.created_by == User.id).join(
        user_group, User.id == user_group.c.user_id).filter(
            Task.id == task_id,
            user_group.c.group_id.in_([group.id for group in current_user.groups])
        ).first()
    
    return bool(group_task)

@router.post("/")
async def create_task(task_data: dict = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        task_data["created_by"] = current_user.id 
        task = Task(**task_data)
        db.add(task)
        db.commit()
        db.refresh(task)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Tarefa já existe")
    except Exception as e:
        print(e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Erro interno no servidor")
    
    return {"message": "Tarefa criada com sucesso", "task": task}

@router.put("/{task_id}")
async def update_task(task_id: int, task_data: dict = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not user_can_access_task(task_id, db, current_user):
        raise HTTPException(status_code=403, detail="Você não tem permissão para atualizar esta tarefa")
    
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail=f"Tarefa com id {task_id} não encontrada")
    
    try:
        for key, value in task_data.items():
            setattr(task, key, value)
        db.commit()
        db.refresh(task)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Falha ao atualizar a tarefa")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erro interno no servidor")
    
    return {"message": "Tarefa atualizada com sucesso", "task": task}

@router.get("/{task_id}")
async def get_task_by_id(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not user_can_access_task(task_id, db, current_user):
        raise HTTPException(status_code=403, detail="Você não tem permissão para visualizar esta tarefa")
    
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    return task

@router.get("/")
async def get_all_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    own_tasks = db.query(Task).filter(Task.created_by == current_user.id).all()
    
    if not current_user.groups:
        return own_tasks
    
    group_tasks = db.query(Task).join(User, Task.created_by == User.id).join(
        user_group, User.id == user_group.c.user_id).filter(
            user_group.c.group_id.in_([group.id for group in current_user.groups])
        ).all()
    
    all_tasks = list({task.id: task for task in own_tasks + group_tasks}.values())
    
    return all_tasks

@router.delete("/{task_id}")
async def delete_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not user_can_access_task(task_id, db, current_user):
        raise HTTPException(status_code=403, detail="Você não tem permissão para excluir esta tarefa")
    
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail=f"Tarefa com id {task_id} não encontrada")
    
    try:
        db.delete(task)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Falha ao excluir a tarefa")
    
    return {"message": "Tarefa excluída com sucesso"}

