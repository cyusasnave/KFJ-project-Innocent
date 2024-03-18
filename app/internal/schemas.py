from pydantic import BaseModel, model_validator, EmailStr
from uuid import UUID
from fastapi import HTTPException, status
from datetime import datetime


class UserModel(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str

    @model_validator(mode="after")
    def length_of_password(self):
        if len(self.password) < 8:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters",
            )
        return self

    @model_validator(mode="after")
    def password_similality(self):
        if self.password != self.confirm_password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Password and Confirm password doesn't match",
            )
        return self


class UserView(BaseModel):
    id: UUID
    email: str
    role: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class UserChangePasswordModel(BaseModel):
    old_password: str
    new_password: str
    confirm_password: str

    @model_validator(mode="after")
    def length_of_password(self):
        if len(self.new_password) < 8:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Password must be at least 8 characters",
            )
        return self

    @model_validator(mode="after")
    def password_similality(self):
        if self.new_password != self.confirm_password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Password and Confirm password doesn't match",
            )
        return self


class EmployeeModel(BaseModel):
    first_name: str
    last_name: str
    phone: str
    province: str
    district: str
    sector: str
    cell: str
    village: str


class SpecializationModel(BaseModel):
    name: str


class SpecializationView(BaseModel):
    id: UUID
    name: str


class JobCategoryModel(BaseModel):
    category: str


class JobCategoryView(BaseModel):
    id: UUID
    category: str


class SubJobCategoryModel(BaseModel):
    sub_category: str


class SubJobCategoryView(BaseModel):
    id: UUID
    sub_category: str


class JobModel(BaseModel):
    status: str
    deadline: datetime
    job_description: str
    vacancy: int
    job_type: str
    experience: str
    responsibility: str
    job_location: str
    gender: str

class JobViewModel(BaseModel):
    employer_id: UUID
    status: str
    deadline: datetime
    job_description: str
    vacancy: int
    job_type: str
    experience: str
    responsibility: str
    job_location: str
    gender: str

    @model_validator(mode="after")
    def start_date_validate(self):
        if self.start_date < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Date must be from now onwards!",
            )
        return self


class EmployerModel(BaseModel):
    type_of_employer: str
    name: str
    province: str
    district: str
    sector: str


class EmployerViewModel(BaseModel):
    id: UUID
    type_of_employer: str
    name: str
    province: str
    district: str
    sector: str
