from fastapi import APIRouter, Depends
from app.internal.models import JobCategory,JobSubCategory,JobRequest,User
from app.internal.schemas import JobCategoryModel,JobCategoryView,SubJobCategoryModel,SubJobCategoryView
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

@router.post("/api/v1/jobs/sub_category/create/{job_category_id}")
async def add_new_sub_job_category(job_category_id:str,request: SubJobCategoryModel,current_user: Annotated[User, Depends(get_current_admin_user)],db: Session = Depends(get_db)):
    category = db.query(JobCategory).filter(JobCategory.id == job_category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category of job doesn't exists!")
    new_data = JobSubCategory(category=category.id,sub_category=request.sub_category)
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return f"Sub Category of {category.name}  is Added Successfully"

@router.get("/api/v1/jobs/sub_category/data/all",response_model=List[SubJobCategoryView])
async def get_all_category(db: Session = Depends(get_db)):
    sub_category = db.query(JobSubCategory).all()
    return sub_category