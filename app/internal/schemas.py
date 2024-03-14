from pydantic import BaseModel, model_validator
from uuid import UUID
from fastapi import HTTPException, status


class UserModel(BaseModel):
    username: str
    password: str

    @model_validator(mode="after")
    def length_of_password(self):
        if len(self.password) < 8:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters",
            )
        return self


class UserView(BaseModel):
    id: UUID
    username: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserChangePasswordModel(BaseModel):
    old_password: str
    new_password: str

    @model_validator(mode="after")
    def length_of_password(self):
        if len(self.new_password) < 8:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Password must be at least 8 characters",
            )
        return self
