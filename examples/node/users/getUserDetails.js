const request = require('request-promise');

// Substitue values below
let endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
let APIKey = "YOUR_API_KEY";
let userId = "TARGET_USER_ID";

let options = {
	method: 'GET',
	uri: `${endpoint}/v1/users/${userId}`,
	headers: {
		"Content-Type": "application/vnd.api+json",
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

request(options).then(function(response) {

	console.log(JSON.stringify(response, null, 2));

});
