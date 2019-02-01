require("dotenv").config();
const Promise = require("bluebird");

const utils = require("./utils");

// Name of the cross-account role for Cloud Conformity
const CloudConformityRoleName = "CloudConformity";

const accounts = [
	{
		AWSAccountId: "961944027523",
		environment: "Production",
		name: "First account"
	},
	{
		AWSAccountId: "961944027523",
		environment: "Development",
		name: "Second Account"
	},
	{
		AWSAccountId: "961944027523",
		environment: "Test",
		name: "Third account"
	}
];

(async () => {

	const externalId = await utils.getExternalId();

	return Promise.mapSeries(
		accounts,
		(account) => {

			account.roleARN = `arn:aws:iam::${account.AWSAccountId}:role/${CloudConformityRoleName}`;

			return utils.createAccount(account, externalId);

		}

	);

})();
