from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.internal.models import Employee, User, Specialization
from app.crud import (
    get_current_user,
    get_current_employee,
    save_uploaded_cv,
    save_uploaded_picture,
)
from app.internal.schemas import EmployeeModel, SpecializationModel, SpecializationView
from sqlalchemy.orm import Session
from app.internal.database import get_db
from typing import Annotated, List


router = APIRouter(tags=["Employees"])


@router.post("/api/v1/employee/add/profile_info/{specialization_id}")
async def add_employee_profile(
    request: EmployeeModel,
    specialization_id: str,
    current_user: Annotated[User, Depends(get_current_employee)],
    db: Session = Depends(get_db),
):
    user = Employee(
        user_id=current_user.id,
        user_specialization=specialization_id,
        first_name=request.first_name,
        last_name=request.last_name,
        phone=request.phone,
        cv_url="null",
        profile_url="null",
        province=request.province,
        district=request.district,
        sector=request.sector,
        cell=request.cell,
        village=request.village,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return "Personal Information accepted!"


# Getting Employer Profile
@router.get("/api/v1/account/get_employee_profile")
async def get_employee_profile(
    current_user: Annotated[User, Depends(get_current_employee)],
    db: Session = Depends(get_db),
):
    profile = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    print(profile)
    if profile is None:
        raise HTTPException(status_code=404, detail="Employee Profile not found")
    return profile

@router.post("/api/v1/employee/add/cv_profile")
async def add_employee_cv_picture(
    current_user: Annotated[User, Depends(get_current_employee)],
    db: Session = Depends(get_db),
    cv_file: UploadFile = File(...),
    image_file: UploadFile = File(...),
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee Not Found!")
    cv_file_path = save_uploaded_cv(cv_file)
    image_file_path = save_uploaded_picture(image_file)
    employee.cv_url = cv_file_path
    employee.profile_url = image_file_path
    db.commit()
    return "Your Files uploaded SuccessFully!"


@router.post("/api/v1/specialization/data/")
async def add_specialization(
    request: SpecializationModel, db: Session = Depends(get_db)
):
    new_data = Specialization(name=request.name)
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return f"{new_data.name} is created Successfully!"


@router.get("/api/v1/specialization/data/all", response_model=List[SpecializationView])
async def get_all_specialization(db: Session = Depends(get_db)):
    specialization = db.query(Specialization).all()
    return specialization


@router.get("/api/v1/available_jobs/data/all", response_model=List[SpecializationView])
async def get_all_specialization(db: Session = Depends(get_db)):
    specialization = db.query(Specialization).all()
    return specialization
