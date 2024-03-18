from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.internal.models import Employer, User
from app.crud import get_current_user, get_current_admin_user
from app.internal.schemas import EmployerModel, EmployerViewModel
from sqlalchemy.orm import Session
from app.internal.database import get_db
from typing import Annotated, List


router = APIRouter(tags=["Employers"])


@router.post("/api/v1/employer/add/profile/{user_id}")
async def add_employer_profile(
    user_id: str,
    request: EmployerModel,
    current_user: Annotated[User, Depends(get_current_admin_user)],
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id and User.role == "employer").first()
    if user is None:
        raise HTTPException(status_code=404, detail="User Not Found!")
    new_data = Employer(
        type_of_employer=request.type_of_employer,
        user_id=user_id,  #
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


@router.get("/api/v1/employer/data/all", response_model=List[EmployerViewModel])
async def get_employer(
    current_user: Annotated[User, Depends(get_current_admin_user)],
    db: Session = Depends(get_db),
):
    employers = db.query(Employer).all()
    return employers
