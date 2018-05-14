"use strict";

const request = require("request-promise");

const endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
const apiKey = "YOUR_API_KEY";
const account = {
	name: "YOUR_ACCOUNT_NAME",
	environment: "YOUR_ENVIRONMENT_NAME"
};
const roleArn = "YOUR_ROLE_ARN";

let loadExternalId = () => {

	console.log("Loading external ID...");

	return request({
		method: "GET",
		uri: `${endpoint}/v1/organisation/external-id`,
		headers: {
			"Content-Type": "application/vnd.api+json",
			"Authorization": `ApiKey ${apiKey}`
		}
	}).then(response => JSON.parse(response).data.id);

};

loadExternalId().then((externalId) => {

	console.log("Got external ID", externalId);
	console.log("Creating a new account...");

	let options = {
		method: "POST",
		uri: `${endpoint}/v1/accounts`,
		headers: {
			"Content-Type": "application/vnd.api+json",
			"Authorization": `ApiKey ${apiKey}`
		},
		body: {
			data: {
				attributes: {
					name: account.name,
					environment: account.environment,
					costPackage: true,
					securityPackage: true,
					access: {
						keys: {
							externalId,
							roleArn
						}
					}
				}
			}
		},
		json: true
	};

	request(options).then(response => {

		console.log("Account created. Response:", JSON.stringify(response, null, 2));

	});


});
