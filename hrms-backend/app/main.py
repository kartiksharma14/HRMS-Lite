from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError
import time

from .database import Base, engine
from .routers import employees_router, attendance_router

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    retries = 10
    while retries:
        try:
            Base.metadata.create_all(bind=engine)
            print("✅ Database connected & tables created")
            break
        except OperationalError:
            retries -= 1
            print("⏳ Waiting for database...")
            time.sleep(2)

app.include_router(employees_router, prefix="/api/employees")
app.include_router(attendance_router, prefix="/api/attendance")

@app.get("/health")
def health():
    return {"status": "ok"}
