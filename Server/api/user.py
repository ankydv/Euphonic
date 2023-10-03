from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from Configs import db
from Security.tokenisation import verify_password, create_access_token, hash_password
from Models.user import Token, UserCreate, User, UserBase
from MiddleWares.userAuth import get_current_user
from datetime import timedelta

router = APIRouter()
users_collection = db.users_collection

# for adding new user
@router.post("/register")
async def register_user(user: UserCreate):
    # Hash the plain password
    hashed_password = hash_password(user.password)
    
    # Store the user information in the database
    user_data = {
        "username": user.username,
        "hashed_password": hashed_password,
        "full_name": user.full_name,
        "email": user.email,
    }
    users_collection.insert_one(user_data)
    
    return {"message": "User registered successfully"}


# for login
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"username": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": form_data.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me/", response_model=UserBase)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user