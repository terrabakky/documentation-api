"use strict";
// Bulk account creation

const request = require("request-promise");
const Promise = require("bluebird");
const AWS = require("aws-sdk");

// Substitute value below
// IMPORTANT : Contact us to acquire our AWS Account ID
const cloudConformityAWSAccountId = "12345678901234";
const endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
const apiKey = "YOUR_API_KEY";
const templateURL = "https://s3-us-west-2.amazonaws.com/cloudconformity/CloudConformity.template";

let accounts = [{
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

let loadExternalId = () => {

	console.log("Loading external ID...");

	return request({
		method: "GET",
		uri: `${endpoint}/v1/organisation/external-id`,
		headers: {
			"Content-Type": "application/vnd.api+json",
			"Authorization": `ApiKey ${apiKey}`
		}
	}).then(response => JSON.parse(response).data.id);

};

loadExternalId().then(function (externalId) {

	console.log("Got external ID", externalId);

	return Promise.mapSeries(accounts, function (account) {

		let params = {
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

		let config = {
			accessKeyId: account.accessKeyId,
			secretAccessKey: account.secretAccessKey,
			region: process.env.AWS_REGION
		};

		console.log("Creating CloudConformity stack...");

		let CloudFormation = Promise.promisifyAll(new AWS.CloudFormation(config), {
			filter: function(name, func, target, passesDefaultFilter) {
				return passesDefaultFilter &&
					name !== "onAsync" &&
					name !== "on";
			}
		});
		return CloudFormation.createStackAsync(params).then(function (result) {

			let waitCompletion = function () {

				console.log("Waiting for stack creation...");

				let params = {
					StackName: result.StackId
				};

				return CloudFormation.describeStacksAsync(params).then((data) => data.Stacks).get(0).then(function (stack) {

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

		}).then(function (roleArn) {

			console.log("Will create an account with role ARN %s, external Id %s", roleArn, externalId);

			let options = {
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
					'Authorization': `ApiKey ${apiKey}`
				},
				json: true
			};

			return request(options);

		}).then(function () {

			console.log(...arguments);

		});

	});

});
