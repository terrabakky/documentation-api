import requests
import json

#Please substitute YOUR_ENDPOINT and YOUR_API_KEY
endpoint = 'YOUR_ENDPOINT'
headers = {'Authorization': 'ApiKey YOUR_API_KEY'}

resp = requests.post(endpoint, headers=headers)

print json.dumps(resp.json(), indent=4, sort_keys=True)
