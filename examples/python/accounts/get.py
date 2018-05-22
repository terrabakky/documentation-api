import requests
import json

#Please substitute YOUR_CC_ACCOUNT_ID, YOUR_ENDPOINT and YOUR_API_KEY
endpoint = 'YOUR_ENDPOINT'
accountId = 'YOUR_CC_ACCOUNT_ID'
url = endpoint + '/v1/accounts/' + accountId

headers = {
	'Content-Type': 'application/vnd.api+json',
	'Authorization': 'ApiKey YOUR_API_KEY'
}

resp = requests.get(url, headers=headers)

print json.dumps(resp.json(), indent=4, sort_keys=True)
