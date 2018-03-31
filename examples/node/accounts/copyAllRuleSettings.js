// Copy all rule settings to another accounts

const request = require('request-promise');
const Promise = require("bluebird");

// Substitute value below
let endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
let APIKey = "YOUR_API_KEY";
let sourceAccountId = "YOUR_ACCOUNT_ID"; // Id of account you want to copy a rule FROM
let destinationAccountIds = ["YOUR_SECOND_ACCOUNT_ID", "YOUR_THIRD_ACCOUNT_ID"]; // Id of accounts you want to copy a rule TO
let note = "YOUR_NOTE"; // Note to add when patching a rule setting

let options = {
	method: 'GET',
	uri: `${endpoint}/v1/accounts/${sourceAccountId}/settings/rules`,
	headers: {
		"Content-Type": "application/vnd.api+json",
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

request(options).then(function(response) {

	let ruleSettings = response.data.attributes.settings.rules;

	console.log("Will copy rules settings from %s", sourceAccountId);

	return Promise.mapSeries(destinationAccountIds, function(accountId) {

		let patchOptions = {
			method: 'PATCH',
			uri: `${endpoint}/v1/accounts/${accountId}/settings/rules`,
			headers: {
				"Content-Type": "application/vnd.api+json",
				'Authorization': `ApiKey ${APIKey}`
			},
			body: {
				data: {
					attributes: {
						"ruleSettings": ruleSettings,
						"note": note
					}
				}
			},
			json: true
		};

		return request(patchOptions);
	});


}).then(function() {

		console.log(...arguments);

});
