from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api.models.group import Group
from backend.database.session import get_db


router = APIRouter()


@router.post("/create_group/")
async def create_group(group_data: dict, db: Session = Depends(get_db)):
    group = Group(**group_data)
    db.add(group)
    db.commit()
    return {"message": "Group created successfully"}

@router.get("/get_group_by_id/{group_id}")
async def get_group_by_id(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.get("/get_group_by_name/{name}")
async def get_group_by_name(name: str, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.name == name).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.delete("/delete_group_id/{group_id}")
async def delete_group_by_id(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    db.delete(group)
    db.commit()
    return {"message": "Group deleted successfully"}

@router.put("/update_group/{group_id}")
async def update_group(group_id: int, group_data: dict, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    for key, value in group_data.items():
        setattr(group, key, value)
    db.commit()
    return {"message": "Group updated successfully"}

@router.get("/get_all_groups/")
async def get_all_groups(db: Session = Depends(get_db)):
    groups = db.query(Group).all()
    return groups

@router.get("/get_group_by_user/{user_id}")
async def get_group_by_user(user_id: int, db: Session = Depends(get_db)):
    groups = db.query(Group).join(Group.users).filter(user_id == user_id).all()
    return groups

@router.get("/get_group_by_task/{task_id}")
async def get_group_by_task(task_id: int, db: Session = Depends(get_db)):
    groups = db.query(Group).join(Group.tasks).filter(task_id == task_id).all()
    return groups

@router.put("/add_user_to_group/{user_id}/{group_id}")
async def add_user_to_group(user_id: int, group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    group.users.append(user_id)
    db.commit()
    return {"message": "User added to group successfully"}