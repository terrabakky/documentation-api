// Create an account

const request = require('request-promise');

// Substitute values below
// For more information, refer to https://github.com/cloudconformity/documentation-api/blob/master/Accounts.md#create-an-account
let endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
let APIKey = "YOUR_API_KEY";
let account = {
	name: "YOUR_ACCOUNT_NAME",
	environment: "YOUR_ENVIRONMENT_NAME"
};
let externalId = "YOUR_EXTERNAL_ID";
let roleArn = "YOUR_ROLE_ARN";

let options = {
	method: 'POST',
	uri: `${endpoint}/v1/accounts`,
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
