from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://u9p526d54v3hh:pa5c824af4aa32881c260931c822db1278f5830558411582e8beef1582d1c3340@c6m2hub4lh1mqp.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d5dr0lhn6tgj7d"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
