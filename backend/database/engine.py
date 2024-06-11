from backend.settings.config import settings
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


engine = create_engine(
    f"postgresql+psycopg2://{settings.USER}:{settings.PASSWORD}@{settings.HOST}:5432/{settings.DATABASE}"
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
