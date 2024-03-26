from fastapi import APIRouter, Depends,  UploadFile,  File,  HTTPException
from app.internal.models import Employer, User, Job
from app.crud import get_current_user, get_current_admin_user, get_current_employer, save_uploaded_logo
from app.internal.schemas import EmployerModel,  EmployerViewModel, JobModel
from sqlalchemy.orm import Session
from app.internal.database import get_db
from typing import Annotated,  List


router = APIRouter(tags=["Employers"])


@router.post("/api/v1/employer/add/profile/")
async def add_employer_profile(
    request: EmployerModel,
    current_user: Annotated[User, Depends(get_current_employer)],
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == current_user.id and User.role == "employer").first()
    if user is None:
        raise HTTPException(status_code=404, detail="User Not Found!")
    new_data = Employer(
        type_of_employer=request.type_of_employer,
        user_id=current_user.id,
        name=request.name,
        logo_url="",
        contract_url="",
        province=request.province,
        district=request.district,
        sector=request.sector,
    )
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return "Employer profile created successfully"


# @router.get("/api/v1/employer/data/all", response_model=List[EmployerViewModel])
# async def get_employer(
#     current_user: Annotated[User, Depends(get_current_admin_user)],
#     db: Session = Depends(get_db),
# ):
#     employers = db.query(Employer).all()
#     return employers

# Getting Employer Profile
@router.get("/api/v1/account/get_employer_profile/")
async def get_employer_profile(
    current_user: Annotated[User, Depends(get_current_employer)],
    db: Session = Depends(get_db),
):
    profile = db.query(Employer).filter(Employer.user_id == current_user.id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Employer Profile not found")
    return profile


@router.get("/api/v1/jobs/data/employer")
async def get_employer_jobs(
    current_user: Annotated[User, Depends(get_current_employer)],
    db: Session = Depends(get_db),
):
    jobs = db.query(Job).filter(Job.employer_id == current_user.id).all()
    data = []
    for job in jobs:
        job_data = {
            "id": job.id,
            "job_category": job.job_category.category,
            "sub_category": job.sub_job_category.sub_category,
            "status": job.status,
            "deadline": job.deadline,
            "job_description": job.job_description,
            "vacancy": job.vacancy,
            "job_type": job.job_type,
            "experience": job.experience,
            "responsibility ": job.responsibility,
            "job_location": job.job_location,
            "gender": job.gender,
            "published_date": job.published_date,
        }
        data.append(job_data)
    return data


@router.post("/api/v1/employer/add/logo")
async def add_employer_logo(
    current_user: Annotated[User, Depends(get_current_employer)],
    db: Session = Depends(get_db),
    logo: UploadFile = File(...),
):
    employer = db.query(Employer).filter(Employer.user_id == current_user.id).first()
    if employer is None:
        raise HTTPException(status_code=404, detail="Employer Not Found!")
    image_file_path = save_uploaded_logo(logo)
    employer.logo_url = image_file_path
    db.commit()
    return "Logo Uploaded SuccessFully!"