const request = require('request-promise');

//Please substitute YOUR_ENDPOINT and YOUR_API_KEY
let Endpoint = "YOUR_ENDPOINT";
let APIKey = "YOUR_API_KEY";

let options = {
	method: 'POST',
	uri: `${Endpoint}`,
	headers: {
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

request(options).then(function(response) {

	console.log(JSON.stringify(response, null, 2));

});

