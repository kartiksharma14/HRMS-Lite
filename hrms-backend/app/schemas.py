from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Literal

class EmployeeCreate(BaseModel):
    full_name: str = Field(..., min_length=2)
    email: EmailStr
    department: str = Field(..., min_length=2)


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

    model_config = {
        "from_attributes": True
    }

class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    status: Literal["Present", "Absent"]
