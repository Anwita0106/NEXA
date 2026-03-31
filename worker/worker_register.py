import requests
import socket

SERVER_IP = "172.16.105.171"
WORKER_IP = "172.16.104.216"

data = {
    "name": socket.gethostname(),
    "ip": WORKER_IP,
    "cpu": "8C",
    "gpu": "None",
    "status": "free"
}

res = requests.post(
    f"http://{SERVER_IP}:8000/register_node",
    json=data,
    timeout=10
)
print("Registration:", res.text)