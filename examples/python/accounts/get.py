#!/usr/bin/env python3
# Get JSON representation of all accounts

import json
import requests

# Please substitute YOUR_CC_ACCOUNT_ID and YOUR_API_KEY
# Change the endpoint to use the correct one for your acconut

# Substitute the endpoint below for the correct one for your account
BASE = 'https://ap-southeast-2-api.cloudconformity.com/v1/{endpoint}'
account_id = 'YOUR_CC_ACCOUNT_ID'

endpoint = 'accounts/{account_id}'.format(account_id=account_id)
url = BASE.format(endpoint=endpoint)


headers = {
	'Content-Type': 'application/vnd.api+json',
	'Authorization': 'ApiKey YOUR_API_KEY'
}

resp = requests.get(url, headers=headers)

print(json.dumps(resp.json(), indent=4, sort_keys=True))
