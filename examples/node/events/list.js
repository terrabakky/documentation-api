const request = require('request-promise');
const Promise = require("bluebird");

//Please substitute your own variables
let APIKey = "YOUR_API_KEY";
let AccountIdsArray = ["YOUR_SECOND_ACCOUNT_ID", "YOUR_THIRD_ACCOUNT_ID"]; // Id of accounts you want to get events for/

let options = {
	method: 'GET',
	uri: `https://us-west-2-api.cloudconformity.com/v1/events?accountId=${fromAccountId}`,
	headers: {
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

request(options).then(function(response) {

	// Iterate over array of parent events to
	// 1. write to csv
	// 2. then query for the children events
	// 3. if there are children events
	// 4. write children events to csv


}).then(function() {

		console.log(...arguments);

});
