from fastapi import APIRouter, Depends,  HTTPException
from app.internal.models import (
    JobCategory,
    
    JobSubCategory,
    
    JobRequest,
    
    User,
    
    Job,
    
    Employer,
)
from app.internal.schemas import (
    JobModel,
    
    JobViewModel,
    
    JobCategoryModel,
    
    JobCategoryView,
    
    SubJobCategoryModel,
    
    SubJobCategoryView,
)
from app.crud import get_current_admin_user,  get_current_employer
from app.internal.database import get_db
from sqlalchemy.orm import Session
from typing import Annotated, List


router = APIRouter(tags=["Jobs"])


@router.post("/api/v1/jobs/category/create")
async def add_new_job_category(
    request: JobCategoryModel,
    current_user: Annotated[User, Depends(get_current_admin_user)],
    db: Session = Depends(get_db),
):
    new_data = JobCategory(category=request.category)
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return "New Job is Added Successfully"


@router.get("/api/v1/jobs/category/data/all", response_model=List[JobCategoryView])
async def get_all_category(db: Session = Depends(get_db)):
    category = db.query(JobCategory).all()
    return category


@router.post("/api/v1/jobs/sub_category/create/{job_category_id}")
async def add_new_sub_job_category(
    job_category_id: str,
    request: SubJobCategoryModel,
    current_user: Annotated[User, Depends(get_current_admin_user)],
    db: Session = Depends(get_db),
):
    category = db.query(JobCategory).filter(JobCategory.id == job_category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category of job doesn't exists!")
    new_data = JobSubCategory(category=category.id, sub_category=request.sub_category)
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return f"Sub Category of {new_data.sub_category}  is Added Successfully"


@router.get(
    "/api/v1/jobs/sub_category/data/all", response_model=List[SubJobCategoryView]
)
async def get_all_category(db: Session = Depends(get_db)):
    sub_category = db.query(JobSubCategory).all()
    return sub_category


@router.post("/api/v1/jobs/create/{job_category_id}/{job_sub_category_id}")
async def add_new_job(
    job_category_id: str,
    job_sub_category_id: str,
    request: JobModel,
    current_user: Annotated[User, Depends(get_current_employer)],
    db: Session = Depends(get_db),
):
    category = db.query(JobCategory).filter(JobCategory.id == job_category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category of job doesn't exists!")

    sub_category = (
        db.query(JobSubCategory)
        .filter(JobSubCategory.id == job_sub_category_id)
        .first()
    )
    if category is None:
        raise HTTPException(status_code=404, detail="Category of job doesn't exists!")

    employer = db.query(Employer).filter(Employer.user_id == current_user.id).first()
    if employer is None:
        raise HTTPException(status_code=404, detail="Employer Profile is missing!")

    new_data = Job(
        employer_id=current_user.id,
        job_category_id=category.id,
        job_sub_category_id=sub_category.id,
        deadline = request.deadline,
        job_description = request.job_description,
        vacancy = request.vacancy,
        job_type = request.job_type,
        experience = request.experience,
        responsibility = request.responsibility,
        job_location = request.job_location,
        gender = request.gender,
        status=request.status
        )
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return f"New Job is Added Successfully"


@router.get("/api/v1/jobs/data/all")
async def get_all_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()
    data = []
    for job in jobs:
        employer = db.query(Employer).filter(Employer.user_id == job.user.id).first()
        job_data = {
            "id": job.id,
            "employer_name": employer.name,
            "job_category": job.job_category.category,
            "sub_category": job.sub_job_category.sub_category,
            "status": job.status,
            "deadline": job.deadline,
            "job_description": job.job_description,
            "vacancy": job.vacancy,
            "job_type": job.job_type,
            "experience": job.experience,
            "responsibility ": job.responsibility,
            "experince": job.experince,
            "job_location": job.job_location,
            "gender": job.gender,
            "published_date": job.published_date,
        }

        data.append(job_data)

    return data
