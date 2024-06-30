from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from api.models.group import Group, user_group
from database.session import get_db
from core.security import get_current_user
from api.models.user import User
from api.models.invite import Invite

router = APIRouter()

@router.post("/invites/{invite_id}/accept")
async def accept_invite(
    invite_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    invite = db.query(Invite).filter(Invite.id == invite_id).first()
    if not invite:
        raise HTTPException(status_code=404, detail="Convite não encontrado.")
    
    group = db.query(Group).filter(Group.id == invite.group_id).first()
    user = db.query(User).filter(User.id == invite.user_id).first()
    
    if not group:
        raise HTTPException(status_code=404, detail="Grupo não encontrado.")
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    try:
        group.users.append(user)
        db.delete(invite)
        db.commit()
        return {"message": "Convite aceito e usuário adicionado ao grupo."}
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Erro ao processar o convite.")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erro interno no servidor.")

@router.post("/invites/{invite_id}/decline")
async def decline_invite(
    invite_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    invite = db.query(Invite).filter(Invite.id == invite_id).first()
    if not invite:
        raise HTTPException(status_code=404, detail="Convite não encontrado.")
    
    try:
        db.delete(invite)
        db.commit()
        return {"message": "Convite recusado e excluído."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erro interno no servidor.")

@router.post("/invites/{group_id}")
async def create_invite(
    group_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    group = db.query(Group).filter(Group.id == group_id).first()
    user = db.query(User).filter(User.id == current_user.id).first()

    if not group:
        raise HTTPException(status_code=404, detail="Grupo não encontrado.")
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    existing_invite = db.query(Invite).filter(Invite.group_id == group_id, Invite.user_id == current_user.id).first()
    if existing_invite:
        raise HTTPException(status_code=400, detail="Você já enviou um convite para este grupo.")
    
    try:
        invite = Invite(group_id=group_id, user_id=current_user.id)
        db.add(invite)
        db.commit()
        db.refresh(invite)
        return invite
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Erro ao criar o convite.")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erro interno no servidor.")
    
@router.get("/invites/{group_id}")
async def get_group_invites(group_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Grupo não encontrado.")
    
    invites = db.query(Invite).filter(Invite.group_id == group_id).all()
    return invites

@router.get("/my-groups")
async def get_my_groups(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    groups = db.query(Group).join(user_group).filter(user_group.c.user_id == current_user.id).all()
    return groups

@router.get("/other-groups")
async def get_other_groups(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    subquery = db.query(user_group.c.group_id).filter(user_group.c.user_id == current_user.id).subquery()
    groups = db.query(Group).filter(Group.id.notin_(subquery)).all()
    return groups

# @router.post("/")
# async def create_group(group_data: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     try:
#         group = Group(**group_data, created_by=current_user.id)
#         db.add(group)
#         db.commit()
#         db.refresh(group)
#         return group
#     except IntegrityError:
#         db.rollback()
#         raise HTTPException(status_code=400, detail="Já existe um grupo com esse nome.")
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(status_code=500, detail="Internal server error")

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

# @router.delete("/{group_id}")
# async def delete_group(group_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     group = db.query(Group).filter(Group.id == group_id).first()
#     if not group:
#         raise HTTPException(status_code=404, detail=f"Grupo com {group_id} não encontrado.")

#     db.delete(group)
#     db.commit()
#     return {"message": f"Grupo com {group_id} removido."}

# @router.post("/{group_id}/users/{user_id}")
# async def add_user_to_group(group_id: int, user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     group = db.query(Group).filter(Group.id == group_id).first()
#     user = db.query(User).filter(User.id == user_id).first()
    
#     if not group:
#         raise HTTPException(status_code=404, detail=f"Grupo com id {group_id} não encontrado.")
#     if not user:
#         raise HTTPException(status_code=404, detail=f"Usuário com id {user_id} não encontrado.")
    
#     if user in group.users:
#         raise HTTPException(status_code=400, detail="Usuário já está no grupo.")
    
#     group.users.append(user)
#     db.commit()
#     return {"message": f"Usuário {user_id} adicionado ao grupo {group_id}."}

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
