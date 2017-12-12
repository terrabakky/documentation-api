const request = require('request-promise');
const Promise = require("bluebird");

//Please substitute your own variables
let APIKey = "YOUR_API_KEY";
let fromAccountId = "YOUR_ACCOUNT_ID"; // Id of account you want to copy a rule FROM
let toAccountIdsArray = ["YOUR_SECOND_ACCOUNT_ID", "YOUR_THIRD_ACCOUNT_ID"]; // Id of accounts you want to copy a rule TO
let note = "YOUR_NOTE"; // Note to add when patching a rule setting

let options = {
	method: 'GET',
	uri: `https://us-west-2-api.cloudconformity.com/v1/accounts/${fromAccountId}/settings/rules`,
	headers: {
		"Content-Type": "application/vnd.api+json",
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

request(options).then(function(response) {

	let ruleSettings = response.data.attributes.settings.rules;

	console.log("Will copy rules settings from %s", fromAccountId);

	return Promise.mapSeries(toAccountIdsArray, function(accountId) {

		let patchOptions = {
			method: 'PATCH',

			uri: `https://us-west-2-api.cloudconformity.com/v1/accounts/${accountId}/settings/rules`,
			headers: {
				"Content-Type": "application/vnd.api+json",
				'Authorization': `ApiKey ${APIKey}`
			},
			body: {
				data: {
					attributes: {
						"ruleSettings":ruleSettings,
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
