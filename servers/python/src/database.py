from sqlalchemy import create_engine, Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from db_config import get_database_url

DATABASE_URL = get_database_url()

# SQLite 需要特殊的连接参数
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Client(Base):
    __tablename__ = "clients"

    id = Column(String, primary_key=True)
    secret = Column(String, nullable=False)
    redirect_uris = Column(String, nullable=False)
    grants = Column(String, nullable=False)

class Token(Base):
    __tablename__ = "tokens"

    access_token = Column(String, primary_key=True)
    access_token_expires_at = Column(DateTime, nullable=False)
    client_id = Column(String, nullable=False)
    user_id = Column(String)
    scope = Column(String)

Base.metadata.create_all(bind=engine)
