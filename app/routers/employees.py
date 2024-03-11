from fastapi import APIRouter


router = APIRouter(tags=["Employees"])


@router.get("/api/v1/employee/data/{id}")
async def get_user_by_id(id: str):
    return id
