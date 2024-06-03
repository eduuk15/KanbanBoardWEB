from datetime import datetime
from typing import List

from pydantic import BaseModel as PydanticBaseModel


class BaseModel(PydanticBaseModel):
    class Config:
        arbitrary_types_allowed = True

class User(BaseModel):
    id: str
    name: str
    email: str