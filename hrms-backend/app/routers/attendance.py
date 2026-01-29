from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from typing import Optional
from ..schemas import AttendanceCreate

from ..database import get_db
from ..models import Attendance, Employee

attendance_router = APIRouter()


@attendance_router.post("/", status_code=201)
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(Employee.id == data.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    record = Attendance(
        employee_id=data.employee_id,
        date=data.date,
        status=data.status
    )

    try:
        db.add(record)
        db.commit()
        db.refresh(record)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Attendance already marked for this date"
        )

    return record


@attendance_router.get("/{employee_id}", status_code=status.HTTP_200_OK)
def get_attendance(
    employee_id: int,
    db: Session = Depends(get_db),
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    query = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    )

    # 🔹 Date filtering
    if start_date:
        query = query.filter(Attendance.date >= start_date)
    if end_date:
        query = query.filter(Attendance.date <= end_date)

    total_records = query.count()

    # 🔹 Pagination
    records = (
        query
        .order_by(Attendance.date.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    # 🔹 Total present days
    present_days = (
        db.query(func.count())
        .select_from(Attendance)
        .filter(
            Attendance.employee_id == employee_id,
            Attendance.status == "Present",
        )
        .scalar()
    )

    return {
        "records": records,
        "total_records": total_records,
        "present_days": present_days,
        "page": page,
        "page_size": page_size,
    }
