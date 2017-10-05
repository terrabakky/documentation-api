const request = require('request-promise');


// Please substitute YOUR_ENDPOINT, YOUR_API_KEY, YOUR_ACCOUNT_NAME, YOUR_ENVIRONMENT_NAME, YOUR_EXTERNAL_ID, and YOUR_ROLE_ARN
// For more information, refer to https://github.com/cloudconformity/documentation-api/blob/master/Accounts.md#create-an-account
let Endpoint = "YOUR_ENDPOINT";
let APIKey = "YOUR_API_KEY";
let account = {
	name: "YOUR_ACCOUNT_NAME",
	environment: "YOUR_ENVIRONMENT_NAME"
};
let externalId = "YOUR_EXTERNAL_ID";
let roleArn = "YOUR_ROLE_ARN";

let options = {
	method: 'POST',
	uri: `${Endpoint}`,
	headers: {
		"Content-Type": "application/vnd.api+json",
		'Authorization': `ApiKey ${APIKey}`
	},
	body: {
		data: {
			attributes: {
				name: account.name,
				environment: account.environment,
				access: {
					keys: {
						externalId: externalId,
						roleArn: roleArn
					}
				}
			}
		}
	},
	json: true
};

request(options).then(function(response) {

	console.log(JSON.stringify(response, null, 2));

});
