from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    Enum as EnumSQL,
    DateTime,
)
from app.internal.database import Base, engine
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from enum import Enum
from datetime import datetime
import uuid


class UserRole(str, Enum):
    admin = "admin"
    employer = "employer"
    employee = "employee"


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True)
    is_active = Column(Boolean, default=True)
    role = Column(EnumSQL(UserRole), default="employee")
    created_at = Column(DateTime, default=datetime.now)
    password = Column(String)
    employee = relationship("Employee", back_populates="user", cascade="all, delete")
    employer = relationship("Employer", back_populates="user", cascade="all, delete")
    job_request = relationship("JobRequest", back_populates="user")


class Specialization(Base):
    __tablename__ = "specializations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    employee = relationship("Employee", back_populates="specialization")


class Employee(Base):
    __tablename__ = "employees"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    user_specialization = Column(UUID(as_uuid=True), ForeignKey("specializations.id"))
    first_name = Column(String)
    last_name = Column(String)
    phone = Column(String)
    cv_url = Column(String)
    profile_url = Column(String)
    province = Column(String)
    district = Column(String)
    sector = Column(String)
    cell = Column(String)
    village = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    user = relationship("User", back_populates="employee")
    specialization = relationship("Specialization", back_populates="employee")


class JobCategory(Base):
    __tablename__ = "job_categories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    job_sub_category = relationship("JobSubCategory", back_populates="job_category")


class JobSubCategory(Base):
    __tablename__ = "job_sub_categories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = Column(
        UUID(as_uuid=True), ForeignKey("job_categories.id", ondelete="CASCADE")
    )
    sub_category = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    job_category = relationship("JobCategory", back_populates="job_sub_category")


class Type_of_employer(str, Enum):
    campany = "campany"
    individual = "individual"


class Employer(Base):
    __tablename__ = "employers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    type_of_employer = Column(EnumSQL(Type_of_employer))
    name = Column(String)
    logo_url = Column(String)
    contract_url = Column(String)
    province = Column(String)
    district = Column(String)
    sector = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    user = relationship("User", back_populates="employer")


class Job(Base):
    __tablename__ = "jobs"
    id = Column((UUID(as_uuid=True)), primary_key=True, default=uuid.uuid4)
    employer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    job_category_id = Column(UUID(as_uuid=True), ForeignKey("job_categories.id"))
    job_sub_category_id = Column(
        UUID(as_uuid=True), ForeignKey("job_sub_categories.id")
    )
    start_date = Column(DateTime)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.now)


class JobRequest(Base):
    __tablename__ = "job_requests"
    id = Column((UUID(as_uuid=True)), primary_key=True, default=uuid.uuid4)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    job_id = Column(UUID(as_uuid=True), ForeignKey("jobs.id"))
    application_letter_url = Column(String)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    user = relationship("User", back_populates="job_request")


Base.metadata.create_all(bind=engine)
