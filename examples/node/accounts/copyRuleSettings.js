const request = require('request-promise');
var Promise = require("bluebird");

//Please substitute your own variables
var APIKey = "YOUR_API_KEY";
var fromAccountId = "YOUR_ACCOUNT_ID"; // Id of account you want to copy a rule FROM
var toAccountIdsArray = ["YOUR_SECOND_ACCOUNT_ID", "YOUR_THIRD_ACCOUNT_ID"]; // Id of accounts you want to copy a rule TO
var note = "YOUR_NOTE"; // Note to add when patching a rule setting

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

	var ruleSettings = response.data.attributes.settings.rules;

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
