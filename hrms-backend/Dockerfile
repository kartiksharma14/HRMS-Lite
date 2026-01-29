FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app

# Railway injects the PORT variable. We should use it dynamically.
ENV PORT=8000
EXPOSE ${PORT}

# FIX: Add --proxy-headers and --forwarded-allow-ips "*"
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT --proxy-headers --forwarded-allow-ips '*'"]
