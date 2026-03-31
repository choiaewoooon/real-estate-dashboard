#!/usr/bin/env python3
"""
Real Estate API 서버 실행 스크립트
"""
import subprocess
import sys
import os

def main():
    # requirements 설치
    print("Installing dependencies...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                   check=True)
    
    # 서버 실행
    print("Starting FastAPI server on http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    subprocess.run([sys.executable, "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"])

if __name__ == "__main__":
    main()