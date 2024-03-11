from fastapi import FastAPI
from app.routers import users, employees,employers


app = FastAPI(
    description="Job Finder API"
)
    
    
app.include_router(users.router)


