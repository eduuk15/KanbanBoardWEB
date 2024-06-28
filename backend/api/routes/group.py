from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from backend.api.models.group import Group, user_group
from backend.database.session import get_db
from backend.core.security import get_current_user
from backend.api.models.user import User

router = APIRouter()

@router.get("/my-groups")
async def get_my_groups(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    groups = db.query(Group).join(user_group).filter(user_group.c.user_id == current_user.id).all()
    return groups

@router.get("/other-groups")
async def get_other_groups(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    subquery = db.query(user_group.c.group_id).filter(user_group.c.user_id == current_user.id).subquery()
    groups = db.query(Group).filter(Group.id.notin_(subquery)).all()
    return groups

@router.post("/")
async def create_group(group_data: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        group = Group(**group_data, created_by=current_user.id)
        db.add(group)
        db.commit()
        db.refresh(group)
        return group
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Já existe um grupo com esse nome.")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{group_id}")
async def edit_group(group_id: int, group_data: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail=f"Grupo com {group_id} não encontrado.")
    
    try:
        group.name = group_data.get('name', group.name)
        group.description = group_data.get('description', group.description)
        
        db.commit()
        db.refresh(group)
        return {"message": "Grupo atualizado com sucesso!"}
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Já existe um grupo com esse nome.")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")
    

@router.get("/{group_id}")
async def get_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail=f"Grupo com {group_id} não encontrado.")
    return group

@router.get("/")
async def get_all_groups(db: Session = Depends(get_db)):
    groups = db.query(Group).all()
    return groups

@router.delete("/{group_id}")
async def delete_group(group_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail=f"Grupo com {group_id} não encontrado.")

    db.delete(group)
    db.commit()
    return {"message": f"Grupo com {group_id} removido."}

@router.post("/{group_id}/users/{user_id}")
async def add_user_to_group(group_id: int, user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    group = db.query(Group).filter(Group.id == group_id).first()
    user = db.query(User).filter(User.id == user_id).first()
    
    if not group:
        raise HTTPException(status_code=404, detail=f"Grupo com id {group_id} não encontrado.")
    if not user:
        raise HTTPException(status_code=404, detail=f"Usuário com id {user_id} não encontrado.")
    
    if user in group.users:
        raise HTTPException(status_code=400, detail="Usuário já está no grupo.")
    
    group.users.append(user)
    db.commit()
    return {"message": f"Usuário {user_id} adicionado ao grupo {group_id}."}

@router.delete("/{group_id}/users/{user_id}")
async def remove_user_from_group(group_id: int, user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    group = db.query(Group).filter(Group.id == group_id).first()
    user = db.query(User).filter(User.id == user_id).first()
    
    if not group:
        raise HTTPException(status_code=404, detail=f"Grupo com id {group_id} não encontrado.")
    if not user:
        raise HTTPException(status_code=404, detail=f"Usuário com id {user_id} não encontrado.")
    
    if user not in group.users:
        raise HTTPException(status_code=400, detail="Usuário não está no grupo.")
    
    group.users.remove(user)
    db.commit()
    return {"message": f"Usuário {user_id} removido do grupo {group_id}."}
