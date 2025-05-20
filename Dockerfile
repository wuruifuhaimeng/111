FROM python:3.9-slim

WORKDIR /app

# 复制项目文件
COPY file_lister.py .
COPY README.md .

# 设置环境变量
ENV PYTHONUNBUFFERED=1

# 设置入口点
ENTRYPOINT ["python", "file_lister.py"] 