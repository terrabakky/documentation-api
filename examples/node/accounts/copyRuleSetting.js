const request = require('request-promise');

//Please substitute YOUR_ENDPOINT and YOUR_API_KEY
let APIKey = "YOUR_API_KEY";
let fromAccountId = "YOUR_ACCOUNT_ID"; // Id of account you want to copy a rule FROM
let toAccountId = "YOUR_SECOND_ACCOUNT_ID";
let ruleId = "YOUR_RULE_ID"; // Id of rule which has configured settings on the origin account
let note = "YOUR_NOTE"; // Note to add when patching a rule setting

let options = {
	method: 'GET',
	uri: `https://us-west-2-api.cloudconformity.com/v1/accounts/${fromAccountId}/settings/rules/${ruleId}?notes=true`,
	headers: {
		"Content-Type": "application/vnd.api+json",
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

return request(options).then(function(response) {

	var ruleSetting = response.data.attributes.settings.rules[0];

	console.log("Will copy %s rule from %s to %s ", ruleId, fromAccountId, toAccountId);

	let patchOptions = {
		method: 'PATCH',

		uri: `https://us-west-2-api.cloudconformity.com/v1/accounts/${toAccountId}/settings/rules/${ruleId}`,
		headers: {
			"Content-Type": "application/vnd.api+json",
			'Authorization': `ApiKey ${APIKey}`
		},
		body: {
			data: {
				attributes: {
					"ruleId": ruleId,
					"ruleSetting":ruleSetting,
					"note": note
				}
			}
		},
		json: true
	};

	return request(patchOptions);


}).then(function() {

		console.log(...arguments);

});

