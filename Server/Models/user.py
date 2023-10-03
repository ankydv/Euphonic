from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str
    full_name: str
    email: EmailStr

class User(UserCreate):
    id: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None