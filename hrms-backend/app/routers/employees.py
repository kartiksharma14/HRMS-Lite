from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from ..database import get_db
from ..models import Employee
from ..schemas import EmployeeCreate


def generate_employee_id(db: Session) -> str:
    last_employee = (
        db.query(Employee)
        .order_by(Employee.id.desc())
        .first()
    )

    if not last_employee or not last_employee.employee_id:
        return "EMP-0001"

    try:
        last_number = int(last_employee.employee_id.split("-")[1])
    except (IndexError, ValueError):
        return "EMP-0001"

    return f"EMP-{last_number + 1:04d}"


router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_employee(
    data: EmployeeCreate,
    db: Session = Depends(get_db)
):
    employee = Employee(
        employee_id=generate_employee_id(db),
        full_name=data.full_name.strip(),
        email=data.email.lower(),
        department=data.department.strip(),
    )

    try:
        db.add(employee)
        db.commit()
        db.refresh(employee)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee with this email already exists"
        )

    return employee


@router.get("/", status_code=status.HTTP_200_OK)
def list_employees(db: Session = Depends(get_db)):
    return db.query(Employee).order_by(Employee.id).all()



@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(id: int, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(Employee.id == id).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    db.delete(employee)
    db.commit()


