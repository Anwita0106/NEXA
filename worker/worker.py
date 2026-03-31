import requests
import time
import socket
SERVER = "http://172.16.105.171:8000"

# Get laptop name
node_name = socket.gethostname()

node_data = {
    "name": node_name,
    "cpu": "8C",
    "gpu": "None",
    "status": "free"
}

print("Registering node...")

try:
    r = requests.post(
        f"{SERVER}/register_node",
        
        
        
        json=node_data
    )

    print("Registration response:", r.json())

except:
    print("Registration failed")

print("Worker running...")

while True:

    try:
        r = requests.get(SERVER)

        if r.status_code == 200:
            print("Connected to server")

    except:
        print("Server not reachable")

    time.sleep(5)