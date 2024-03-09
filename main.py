from fastapi import FastAPI,Depends, HTTPException,status,Response
from fastapi.security import OAuth2PasswordRequestForm
from schemas import UserModel, UserView
from crud import get_password_hash,create_access_token,get_user,get_current_active_user,verify_password, get_current_user
from models import User
from database import get_db
from typing import List,Annotated
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone

app = FastAPI(
    description="Job Finder API"
)
    
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  

@app.get("/")
async def get_home():
    return {"Api" : "v0.1.1"}

@app.post("/api/v1/account", response_model=UserView)
async def create_account(user: UserModel, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/api/v1/account/users", response_model=List[UserView])
async def get_all_users( current_user: Annotated[User, Depends(get_current_user)],db: Session = Depends(get_db)):
    user = db.query(User).all()
    return user


@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],db: Session = Depends(get_db)):
    user = get_user(db, form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
      
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token," token_type": "bearer"}