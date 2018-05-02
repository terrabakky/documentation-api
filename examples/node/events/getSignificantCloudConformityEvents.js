var request = require('request-promise');
var Promise = require("bluebird");
var fs = require("fs");

// Please substitute YOUR_ENDPOINT and YOUR_API_KEY
let endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
let APIKey = "YOUR_API_KEY";
var accountId = "YOUR_ACCOUNT_ID";

var events = [
	"account.rule.update.*",
	"account.bot.update.*",
	"account.check.update.*"
];

// Get events for the last 24 hours
let since = Date.now() - (1000 * 60 * 60 * 24);

Promise.mapSeries(events, function(event) {

	let queryString = `accountIds=${accountId}&filter[name]=${event}&filter[since]=${since}`;

	var options = {
		method: 'GET',
		uri: `${endpoint}/v1/events?${queryString}`,
		headers: {
			"Content-Type": "application/vnd.api+json",
			'Authorization': `ApiKey ${APIKey}`
		},
		json: true
	};

	return request(options).then((response) => response.data);

}).reduce((a, b) => a.concat(b)).then(function(events) {

	fs.writeFileSync("./significanEvents.json", JSON.stringify(events, null, 2), "utf-8");

});
