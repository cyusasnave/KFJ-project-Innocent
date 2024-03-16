from fastapi import APIRouter, Depends
from app.internal.models import JobCategory,JobSubCategory,JobRequest,User
from app.internal.schemas import JobCategoryModel,JobCategoryView
from app.crud import get_current_admin_user,get_current_active_user
from app.internal.database import get_db
from sqlalchemy.orm import Session
from typing import Annotated,List



router = APIRouter(tags=["Jobs"])

@router.post("/api/v1/jobs/category/create")
async def add_new_job_category(request: JobCategoryModel,current_user: Annotated[User, Depends(get_current_admin_user)],db: Session = Depends(get_db)):
    new_data = JobCategory(category=request.category)
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return "New Job is Added Successfully"

@router.get("/api/v1/jobs/category/data/all",response_model=List[JobCategoryView])
async def get_all_category(db: Session = Depends(get_db)):
    category = db.query(JobCategory).all()
    return category