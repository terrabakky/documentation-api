// Bulk account creation

var request = require('request-promise');
var Promise = require("bluebird");
var AWS = require("aws-sdk");

// Substitute value below
// IMPORTANT : Contact us to acquire our AWS Account ID
var cloudConformityAWSAccountId = "12345678901234";
let endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
var APIKey = "YOUR_API_KEY";
var templateURL = "https://s3-us-west-2.amazonaws.com/cloudconformity/CloudConformity.template";

var accounts = [{
	accessKeyId: "AKIAI_MY_ACCESS_KEY",
	secretAccessKey: "YOUR_SECRET",
	name: "My account",
	environment: "My environment"
}, {
	accessKeyId: "AKIAI_MY_ACCESS_KEY_FOR_ANOTHER_ACCOUNT",
	secretAccessKey: "YOUR_SECRET_FOR_ANOTHER_ACCOUNT",
	name: "My other account",
	environment: "My other environment"
}];

Promise.mapSeries(accounts, function(account) {

	var options = {
		method: 'POST',
	    uri: `${endpoint}/v1/external-ids`,
	    headers: {
	    	"Content-Type": "application/vnd.api+json",
	        'Authorization': `ApiKey ${APIKey}`
	    },
	    json: true
	};

	return request(options).then(function(xtl) {

		var externalId = xtl.data.id;

		var params = {
			StackName: "CloudConformity",
			Capabilities: [
				"CAPABILITY_NAMED_IAM"
			],
			TemplateURL: templateURL,
			Parameters: [{
				ParameterKey: 'AccountId',
				ParameterValue: `${cloudConformityAWSAccountId}`
			}, {
				ParameterKey: 'ExternalId',
				ParameterValue: externalId
			}]
		};

		var config = new AWS.Config({
			accessKeyId: account.accessKeyId,
			secretAccessKey: account.secretAccessKey,
			region: process.env.AWS_REGION
		});

		console.log("Got an external id %s, crating CloudConformity stack", externalId);

		var CloudFormation = Promise.promisifyAll(new AWS.CloudFormation(config));

		console.log("Creating stack");

		return CloudFormation.createStackAsync(params).then(function(result) {

			var waitCompletion = function() {

				console.log("Waiting for stack creation...");

				var params = {
					StackName: result.StackId
				};

				return CloudFormation.describeStacksAsync(params).then((data) => data.Stacks).get(0).then(function(stack) {

					if (["CREATE_IN_PROGRESS", "UPDATE_IN_PROGRESS"].includes(stack.StackStatus)) {

						return Promise.delay(5000).then(waitCompletion);

					} else if (["CREATE_COMPLETE", "UPDATE_COMPLETE"].includes(stack.StackStatus)) {

						console.log("Stack creation complete");
						return stack.Outputs.find((output) => output.OutputKey === "CloudConformityRoleArn").OutputValue;

					} else {

						throw "Cloud Formation error";

					}

				});

			};

			return waitCompletion();

		}).then(function(roleArn) {

			console.log("Will create an account with role ARN %s, external Id %s", roleArn, externalId);

			var options = {
				method: 'POST',
			    uri: 'https://us-west-2-api.cloudconformity.com/v1/accounts',
			    body: {
			    	data: {
			    		attributes: {
			    			name: account.name,
			    			environment: account.environment,
			    			access: {
			    				keys: {
			    					externalId: externalId,
			    					roleArn: roleArn
			    				}
			    			}
			    		}
			    	}
			    },
			    headers: {
			    	"Content-Type": "application/vnd.api+json",
			        'Authorization': `ApiKey ${APIKey}`
			    },
			    json: true
			};

			return request(options);

		}).then(function() {

			console.log(...arguments);

		});

	});

});
