import requests
import json


# Please substitute YOUR_ENDPOINT, YOUR_API_KEY, YOUR_ACCOUNT_NAME, YOUR_ENVIRONMENT_NAME, YOUR_EXTERNAL_ID, and YOUR_ROLE_ARN
# For more information, refer to https://github.com/cloudconformity/documentation-api/blob/master/Accounts.md#create-an-account
endpoint = 'YOUR_ENDPOINT'
headers = {
	'Content-Type': 'application/vnd.api+json',
	'Authorization': 'ApiKey YOUR_API_KEY'
}
account_name = 'YOUR_ACCOUNT_NAME'
account_environment = 'YOUR_ENVIRONMENT_NAME'
cost_package = True
security_package = True
external_id = 'YOUR_EXTERNAL_ID'
role_arn = 'YOUR_ROLE_ARN'

payload =  {
	'data': {
		'attributes': {
			'name': account_name,
			'environment': account_environment,
			'costPackage': cost_package,
			'securityPackage': security_package,
			'access': {
				'keys': {
					'externalId': external_id,
					'roleArn': role_arn
				}
			}
		}
	}
}

resp = requests.post(endpoint, headers=headers, data=json.dumps(payload))

print json.dumps(resp.json(), indent=4, sort_keys=True)
