from sqlalchemy import Column, Integer, String, Boolean
from database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String)
    password = Column(String)
    is_active = Column(Boolean, default=False)
    

# class Employee(Base):
#     __tablename__ = "employees"

# class Job(Base):
#     __tablename__ = "jobs"

# class Employer(Base):
#     __tablename__ = "employer"
    