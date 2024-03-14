from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from app.internal.schemas import UserModel, UserView, UserChangePasswordModel
from app.crud import (
    get_password_hash,
    get_current_admin_user,
    create_access_token,
    get_current_active_user,
    verify_password,
    get_current_user,
)
from app.internal.models import User
from app.internal.database import get_db
from typing import List, Annotated
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone

router = APIRouter(tags=["Users"])

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7


# Creating user
@router.post("/api/v1/account", response_model=UserView)
async def create_account(user: UserModel, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    new_user = User(email=user.email, password=hashed_password, role="employee")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# get all users and only user with role of admin is allowed
@router.get("/api/v1/account/users", response_model=List[UserView])
async def get_all_users(
    current_user: UserModel = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
):
    user = db.query(User).all()
    return user


# changing password by only logged in user
@router.put("/api/v1/account/change_password")
async def change_password(
    data: UserChangePasswordModel,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == current_user.email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(data.old_password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
        )
    hashed_password = get_password_hash(data.new_password)
    user.password = hashed_password
    db.commit()
    return {"message": "Password updated successfully"}


# Delete or Deactivate account endpoint
@router.put("/api/v1/account/deactivate")
async def deactivate_account(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == current_user.email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_active = False
    db.commit()
    return {"message": "Your Account is Deactivated from Now!"}


# Login endpoint
@router.post("/token")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, " token_type": "bearer"}
