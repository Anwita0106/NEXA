from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Worker server running"}

@app.post("/run_task")
def run_task(task: dict):
    print("=== TASK RECEIVED ===")
    print("Task data:", task)

    code = task.get("code", "print('Hello from Worker!')")

    with open("task.py", "w", encoding="utf-8") as f:
        f.write(code)

    print("Running task.py...")

    try:
        result = subprocess.run(
            ["python", "task.py"],
            capture_output=True,
            text=True,
            timeout=30
        )
        print("STDOUT:", result.stdout)
        print("STDERR:", result.stderr)
        return {
            "status": "done",
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}