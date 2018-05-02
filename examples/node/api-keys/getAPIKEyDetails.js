const request = require('request-promise');

// Substitute values below
let endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
let APIKey = "YOUR_API_KEY";
let APIKeyId = "YOU_KEY_ID";

let options = {
	method: 'GET',
	uri: `${endpoint}/api-keys/${APIKeyId}`,
	headers: {
		"Content-Type": "application/vnd.api+json",
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

request(options).then(function(response) {

	console.log(JSON.stringify(response, null, 2));

});
