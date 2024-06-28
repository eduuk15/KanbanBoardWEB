from pydantic import BaseModel
from typing import Literal
from datetime import datetime


class CreateTask(BaseModel):
    title: str
    description: str
    status: str
    priority: Literal["1", "2", "3"]
    assigned_user_id: int
    created_by: int
    created_at: datetime