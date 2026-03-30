import time

def run_scheduler(jobs, nodes):

    while True:

        for job in jobs:

            if job["status"] == "queued":

                # Find free node
                for node in nodes:

                    if node["status"] == "free":

                        job["status"] = "running"

                        node["status"] = "busy"

                        print(
                            "Job assigned to",
                            node["name"]
                        )

                        break

        time.sleep(5)
        time.sleep(5)