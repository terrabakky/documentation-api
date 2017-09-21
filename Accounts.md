# Cloud Conformity Accounts API

Below is a list of the available API calls:

- [Add An Account](#add-an-account)
- [List All Accounts](#list-all-accounts)
- [View Account Details](#view-account-details)
- [Scan Account](#scan-account)


## Add an Account
This endpoint is used to register a new AWS account with Cloud Conformity.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;In order to register a new AWS account, you first need to:
1. Obtain an External Id from [Create an External Id](./ExternalId.md#create-an-external-id)
1. Configure your account using CloudFormation automation (**Note:** You need to specify **`ExternalId`** parameter for both options)
   1. Option 1 Launch stack via the console:

      [![API Keys](images/cloudformation-launch-stack.png)](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https:%2F%2Fs3-us-west-2.amazonaws.com%2Fcloudconformity%2FCloudConformity.template&stackName=CloudConformity&param_AccountId=717210094962&param_ExternalId=THE_EXTERNAL_ID)
   2. Option 2 via the AWS CLI:
      ```bash
      aws cloudformation create-stack --stack-name CloudConformity  --region us-east-1  --template-url https://s3-us-west-2.amazonaws.com/cloudconformity/CloudConformity.template --parameters ParameterKey=AccountId,ParameterValue=717210094962 ParameterKey=ExternalId,ParameterValue=THE_EXTERNAL_ID  --capabilities CAPABILITY_NAMED_IAM
      ```

##### Endpoints:

`POST /accounts`

##### Parameters
- `data`: an JSON object containing JSONAPI compliant data object with following properties
  - `type`: The type of the object (account)
  - `attributes`: An attribute object containing
    - `name`: The Name of the account
    - `environment`: The Name of the environment
    - `access`: An object containing
      - `keys`: An object containing
        - `roleArn`: The Role ARN of the role you have already created to grant access to Cloud Conformity
        - `externalId`: The External ID that you have requested on the previous step
    - `costPackage`: true | false - Whether or not enable the cost package for the account
    - `securityPackage`: true | false - Whether or not enable the security package for the account

Example Request:

```
curl -X POST \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
  "data": {
    "type": "account",
    "attributes": {
      "name": "Myaccount",
      "environment": "MyEnv",
      "access": {
        "keys": {
          "roleArn": "YOUR_ROLE_ARN",
          "externalId": "THE_EXTERNAL_ID"
        }
      },
      "costPackage": true,
      "securityPackage": true
    }
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/accounts
```
Example Response:

```

  "data": {
    "type": "accounts",
    "id": "H19NxMi5-",
    "attributes": {
      "name": "Myaccount",
      "environment": "MyEnv",
      "awsaccount-id": "123456789012",
      "status": "ACTIVE",
      "security-package": true,
      "cost-package": true,
      "created-date": 1505595441887,
      "settings": {
        "communication": {
          "channels": [
            {
              "name": "email",
              "users": [
                "H13rFYTvl"
              ],
              "enabled": true,
              "levels": [
                "EXTREME",
                "VERY_HIGH",
                "HIGH"
              ]
            }
          ]
        },
        "rules": {},
        "access": {
          "type": "CROSS_ACCOUNT",
          "stackId": "arn:aws:cloudformation:us-east-1:123456789012:stack/CloudConformity/56db5b90-7ebb-11e7-8a78-500c28902e99"
        }
      }
    },
    "relationships": {
      "organisation": {
        "data": {
          "type": "organisations",
          "id": "B1nHYYpwx"
        }
      }
    }
  }
}
```


## List All Accounts

This endpoint allows you to query all accounts that you have access to.

##### Endpoints:

`GET /accounts`

##### Parameters
This end point takes no parameters.


Example Request:

```
curl -H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" https://us-west-2-api.cloudconformity.com/v1/accounts
```
Example Response:

```
{
  "data": [
    {
      "type": "accounts",
      "id": "AgA12vIwb",
      "attributes": {
        "name": "Test",
        "environment": "Test",
        "awsaccount-id": "123456789013",
        "security-package": true,
        "created-date": 1502472854056,
        "last-notified-date": 1503580590169,
        "last-checked-date": 1503584192576,
        "last-monitoring-event-date": 1502570799000,
        "billing-account-id": "r1gyR4cqg"
      },
      "relationships": {
        "organisation": {
          "data": {
            "type": "organisations",
            "id": "B2UhJY3W1"
          }
        }
      }
    },
    {
      "type": "accounts",
      "id": "55Yfrq_IT",
      "attributes": {
        "name": "Route53",
        "environment": "Route53",
        "awsaccount-id": "123456789012",
        "security-package": true,
        "cost-package": true,
        "created-date": 1489703037251,
        "last-notified-date": 1503503192127,
        "last-checked-date": 1503503191166,
        "last-monitoring-event-date": 1502570252000,
        "billing-account-id": "r1gyR4cqg"
      },
      "relationships": {
        "organisation": {
          "data": {
            "type": "organisations",
            "id": "B2UhJY3W1"
          }
        }
      }
    }
  ]
}
```

## View Account Details

This endpoint allows you to get the details of the specified account.

##### Endpoints:

`GET /accounts/id`

##### Parameters
- `id`: The ID of the account


Example Request:

```
curl -H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" https://us-west-2-api.cloudconformity.com/v1/accounts/BJ0Ox16Hb
```
Example Response:
```
{
    "data": [
        {
            "type": "accounts",
            "id": "ABA95vIw8",
            "attributes": {
                "name": "Test Account",
                "environment": "Test",
                "awsaccount-id": "123456789012",
                "status": "ACTIVE",
                "security-package": true,
                "created-date": 1502472854056,
                "settings": {
                    "communication": {
                        "channels": [
                            {
                                "name": "email",
                                "users": [
                                    "H22rMyTu5"
                                ],
                                "enabled": true,
                                "levels": [
                                    "HIGH",
                                    "LOW",
                                    "MEDIUM",
                                    "VERY_HIGH"
                                ]
                            }
                        ]
                    }
                },
                "last-notified-date": 1503285393239,
                "last-checked-date": 1503285392447,
                "last-monitoring-event-date": 1502570799000,
                "billing-account-id": "r1gyR4cqg",
                "cost": {
                    "billing-account-map": {
                        "payerAccount": {
                            "awsId": "123456789012",
                            "id": "r1gyR4cqg"
                        },
                        "linkedAccounts": [
                            {
                                "awsId": "123456789011",
                                "id": "BJ0Ox16Hb"
                            },
                            {
                                "awsId": "123456789012",
                                "id": "BJA95viwb"
                            },
                            {
                                "awsId": "123456789013",
                                "id": "SyZZUc_il"
                            },
                            {
                                "awsId": "123456789014",
                                "id": "S1SFeq_ig"
                            },
                            {
                                "awsId": "123456789015",
                                "id": "SJQINcOol"
                            },
                            {
                                "awsId": "123456789016",
                                "id": "ryi6NPivW"
                            }
                        ]
                    },
                    "last-updated-date": 1503283806380,
                    "bills": [
                        {
                            "current": true,
                            "accountCost": 319.55255299999976,
                            "id": "2017-08",
                            "status": "succeeded"
                        }
                    ],
                    "version": 1.07
                },
                "bot-status": null
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "A1iUY1pz3"
                    }
                }
            }
        }
    ]
}
```
## Scan Account

This endpoint allows you to run conformity bot for the specified account.

IMPORTANT:
> This operation makes API calls to AWS on your behalf.<br />
> Amazon throttles API requests for each AWS account on a per-region basis to help the performance of the service. <br />
> To avoid API throttling, it's important to  ensure that your application doesn't use this API at a high rate.<br />
> Refer to [AWS Service Limits](http://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) to find out more about AWS throttle rate.


##### Endpoints:

`POST /accounts/id/scan`

##### Parameters
- `id`: The ID of the account

Example Request:

```
curl -X POST -H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" https://us-west-2-api.cloudconformity.com/v1/accounts/BJ0Ox16Hb/scan

```
Example Response:
```
{
    "data": [
        {
            "status": "STARTED"
        }
    ]
}
```
