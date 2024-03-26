from fastapi import FastAPI
from app.routers import users, employees, employers, jobs
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    docs_url="/", title="K&FJ Project API", description="Job Finder API swagger UI"
)


app.include_router(users.router)
app.include_router(employees.router)
app.include_router(jobs.router)
app.include_router(employers.router)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
