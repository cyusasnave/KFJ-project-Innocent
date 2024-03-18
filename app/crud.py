from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status, UploadFile
from typing import Annotated
from app.internal.models import User
from app.internal.database import get_db
from sqlalchemy.orm import Session
from app.internal.schemas import TokenData
import os


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, email):
    return db.query(User).filter(User.email == email).first()


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.is_active == False:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def get_current_admin_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if not current_user.role == "admin":
        raise HTTPException(status_code=400, detail="Only Admin User")
    return current_user


async def get_current_employer(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if not current_user.role == "employer":
        raise HTTPException(status_code=400, detail="Only Employer User")
    return current_user


async def get_current_employee(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if not current_user.role == "employee":
        raise HTTPException(status_code=400, detail="Only Employee User")
    return current_user


def save_uploaded_cv(cv_file: UploadFile):
    upload_folder = "employee_files\employee_cv"
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    file_path = os.path.join(upload_folder, cv_file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(cv_file.file.read())
    return file_path


def save_uploaded_picture(image_file: UploadFile):
    upload_folder = "employee_files\employee_profile_picture"
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    file_path = os.path.join(upload_folder, image_file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(image_file.file.read())
    return file_path
