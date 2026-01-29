from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError
import time

from .database import Base, engine
from .routers import employees_router, attendance_router

app = FastAPI(title="HRMS Lite API")

# --- HTTPS FIX MIDDLEWARE ---
@app.middleware("http")
async def force_https_scheme(request: Request, call_next):
    # Railway's load balancer sends this header
    if request.headers.get("x-forwarded-proto") == "https":
        request.scope["scheme"] = "https"
    return await call_next(request)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, consider replacing "*" with your frontend URL
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

# Router includes
app.include_router(employees_router, prefix="/api/employees")
app.include_router(attendance_router, prefix="/api/attendance")

@app.get("/health")
def health():
    return {"status": "ok"}
