from fastapi import FastAPI, UploadFile, File
import os

app = FastAPI()

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Store connected nodes
nodes = []

# Store jobs
jobs = []


@app.get("/")
def home():
    return {"message": "NEXA Backend Running"}


# Register worker node
@app.post("/register-node")
def register_node(node: dict):

    nodes.append(node)

    print("Node Registered:", node)

    return {"message": "Node registered successfully"}


# Get all nodes
@app.get("/nodes")
def get_nodes():

    return nodes


# Submit job
@app.post("/submit-job")
def submit_job(job: dict):

    job["status"] = "queued"

    jobs.append(job)

    print("Job received:", job)

    return {"message": "Job submitted"}


# Get all jobs
@app.get("/jobs")
def get_jobs():

    return jobs


# Upload file
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {"message": "File uploaded"}