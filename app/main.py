from fastapi import FastAPI
from app.routers import users, employees, employers,jobs


app = FastAPI(
    docs_url="/", title="KFJ Project API", description="Job Finder API swagger UI"
)


app.include_router(users.router)
app.include_router(employees.router)
app.include_router(jobs.router)
