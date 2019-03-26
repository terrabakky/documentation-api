#!/usr/bin/env python3

import json
import requests


# Please substitute YOUR_ENDPOINT and YOUR_API_KEY
ENDPOINT = 'YOUR_ENDPOINT'
API_KEY = 'YOUR_API_KEY'
headers = {
	'Content-Type': 'application/vnd.api+json',
	'Authorization': 'ApiKey {API_KEY}'.format(API_KEY=API_KEY)
}

resp = requests.get(ENDPOINT, headers=headers)

print(json.dumps(resp.json(), indent=4, sort_keys=True))
