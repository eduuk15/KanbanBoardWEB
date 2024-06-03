from datetime import datetime
from typing import Any

from sqlalchemy import ARRAY, DATE, JSON, TIMESTAMP, String
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(AsyncAttrs, DeclarativeBase):
    type_annotation_map = {
        datetime: TIMESTAMP(timezone=True),
        dict[str, Any]: JSON,
        list[str]: ARRAY(String),
    }


# Modelo de dados para tarefas do Kanban Board
class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(index=True)
    description: Mapped[str] = mapped_column(String)
    status: Mapped[str]
    type: Mapped[str]
    id_user_responsible: Mapped[str] = mapped_column(index=True)
    created_at: Mapped[datetime]
    updated_at: Mapped[datetime | None]
    deleted: Mapped[bool] = mapped_column(index=True)


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str]
    password: Mapped[str]
