from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from fastapi import Depends
from typing import Annotated
import os
from dotenv import load_dotenv

load_dotenv()

db_user = os.getenv("POSTGRESQL_USERNAME")
db_pass = os.getenv("POSTGRESQL_PASSWORD")


DATABASE_URL = f"postgresql://{db_user}:{db_pass}@localhost:5432/jobfinder"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
