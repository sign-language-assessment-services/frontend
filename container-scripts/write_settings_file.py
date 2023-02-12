import os
import json

prefix = "SLAS_"

envs = {}

# Iterate over all environment variables
for key in os.environ:
    if key.startswith(prefix):
        envs[key.removeprefix(prefix)] = os.environ[key]

# Print the envs dictionary as a JSON object
with open("/usr/share/nginx/html/settings.json", "w") as env_file:
    json.dump(envs, env_file)
"""
html_path = "/usr/share/nginx/html/index.html"
with open(html_path, "r") as html_file:
    html = html_file.read().replace('"{{REPLACE_ME}}"', json.dumps(envs))

with open(html_path, "w") as html_file:
    html_file.write(html)
"""