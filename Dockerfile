FROM python:3.9-slim

WORKDIR /app

COPY file_lister.py .

ENTRYPOINT ["python", "file_lister.py"] 