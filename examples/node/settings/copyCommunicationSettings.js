// Copy communication settings from one account to another

const request = require('request-promise');
const Promise = require("bluebird");

// Substitue values below
let endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
let APIKey = "YOUR_API_KEY";
let sourceAccountId = "YOUR_ACCOUNT_ID"; // Id of account you want to copy a setting FROM
let destinationAccountIds = ["YOUR_SECOND_ACCOUNT_ID", "YOUR_THIRD_ACCOUNT_ID"]; // Id of accounts you want to copy settings TO

let options = {
	method: 'GET',
	uri: `${endpoint}/v1/settings/communication?accountId=${sourceAccountId}`,
	headers: {
		"Content-Type": "application/vnd.api+json",
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

request(options).then(function(response) {

	let communicationSettings = response.data.reduce(function(prev, setting) {

		// ignore org level settings
		if (setting.id.startsWith('communication')) {
			return prev;
		}

		return prev.concat({
			"channel": setting.attributes.channel,
			"enabled": setting.attributes.enabled,
			"manual": setting.attributes.manual || null,
			"filter": setting.attributes.filter,
			"configuration": setting.attributes.configuration,
		});

	}, []);

	console.log("Will copy communication settings from %s", sourceAccountId);

	return Promise.mapSeries(destinationAccountIds, function(accountId) {

		let postOptions = {
			method: 'POST',
			uri: `${endpoint}/v1/settings/communication`,
			headers: {
				"Content-Type": "application/vnd.api+json",
				'Authorization': `ApiKey ${APIKey}`
			},
			body: {
				data: {
					attributes: {
						"accountId": accountId,
						"communicationSettings": communicationSettings
					}
				}
			},
			json: true
		};

		return request(postOptions);
	});

}).then(function() {

	console.log(...arguments);

});
