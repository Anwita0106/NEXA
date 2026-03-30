from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import requests

app = FastAPI()

# Fix CORS error
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Store connected worker nodes
nodes = []

# Store jobs
jobs = []

# -----------------------------
# Home Route
# -----------------------------
@app.get("/")
def home():
    return {"message": "NEXA Backend Running"}

# -----------------------------
# Register Worker Node  ← KEY FIX: removes old entry for same IP
# -----------------------------
@app.post("/register_node")
def register_node(node: dict):
    global nodes

    # Remove any old entry with the same IP so no duplicates
    nodes = [n for n in nodes if n.get("ip") != node.get("ip")]

    # Add fresh entry
    nodes.append(node)

    print(f"✅ Node registered: {node.get('ip')}  |  total nodes: {len(nodes)}")
    print("Current node list:", nodes)

    return {
        "message": "Node Registered",
        "nodes": nodes
    }

# -----------------------------
# Get Nodes (Debug)
# -----------------------------
@app.get("/nodes")
def get_nodes():
    return nodes

# -----------------------------
# Clear All Nodes (Debug helper)
# -----------------------------
@app.delete("/nodes")
def clear_nodes():
    global nodes
    nodes = []
    print("All nodes cleared")
    return {"message": "All nodes cleared"}

# -----------------------------
# Create Task (Scheduler)
# -----------------------------
@app.post("/create_task")
def create_task(task: dict):
    print("\n=== TASK RECEIVED FROM FRONTEND ===")
    print("Task data:", task)
    print("All registered nodes:", nodes)

    if not nodes:
        print("ERROR: No worker nodes available")
        return {"error": "No worker nodes available"}

    # Pick the most recently registered node
    selected_node = nodes[-1]
    worker_ip = selected_node.get("ip")

    print(f"Selected worker: {selected_node}")
    print(f"Sending task to worker IP: {worker_ip}")

    try:
        response = requests.post(
            f"http://{worker_ip}:6000/run_task",
            json=task,
            timeout=20
        )
        print("Worker response:", response.text)
        return {
            "message": "Task Executed",
            "worker": worker_ip,
            "result": response.json()
        }

    except requests.exceptions.ConnectionError:
        msg = f"Cannot reach worker at {worker_ip}:6000 — is worker_server.py running?"
        print("ERROR:", msg)
        return {"error": msg}

    except requests.exceptions.Timeout:
        msg = f"Worker at {worker_ip}:6000 timed out"
        print("ERROR:", msg)
        return {"error": msg}

    except Exception as e:
        print("Unexpected error:", str(e))
        return {"error": str(e)}

# -----------------------------
# Upload Python File (Optional)
# -----------------------------
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    return {
        "filename": file.filename,
        "message": "File Uploaded Successfully"
    }