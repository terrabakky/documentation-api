# Cloud Conformity Settings API

Below is a list of the available API calls:

- [Create Communication Settings](#create-communication-settings)
- [Get Communication Settings](#get-communication-settings)

## Create Communication Settings
This endpoint is used to create a new one-way communication channel setting.
This feature can be used in conjunction with a GET request to copy communication settings from one account to others. An example of this function is provided in the examples folder.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Some guidelines about using this endpoint:
1. Settings are created as long as your inputs are valid. The onus is on you to ensure you don't create settings that are duplicate or too similar in nature.
2. You can create either **account-level**-only OR **organisation-level**-only settings in each call.
    1. If creating account-level settings you must provide ONLY the accountId and NOT the organisationId.
    2. If creating organisation-level settings you must provide ONLY the organisationId and NOT the accountId.
    3. Only ADMIN users can create organisation-level settings.
    4. With organisation-level user-based (email & sms) settings, the onus is on you to ensure these users have at least read-only access to all accounts.

##### Endpoints:

`POST /settings/communication`

##### Parameters
- `data`: an JSON object containing JSONAPI compliant data object with following properties
  - `attributes`: An attribute object containing
    - `accountId`: String, required if creating an account-level setting
    - `organisationId`: String, required if creating an organisation-level setting
    - `communicationSettings`: An array of objects, each object contains
      - `channel`: String, must be one of the following: email, sms, slack, pager-duty, sns
      - `enabled`: Boolean, true for turning on, false for turning off this channel.
      - `manual`: Boolean, *(only used for SNS channels)* true for allowing users to manually send individual checks, false for disabling this option.
      - `filter`: Optional object (defines which checks you want to be included) including services, regions, categories, statuses, ruleIds, riskLevel, suppressed, and tags.
      - `configuration`: Object containing parameters that are different for each channel. For more details consult the [configurations-table](#configuration)


##### Filtering
The table below give more information about filter options:

| Name  | Values |
| ------------- | ------------- |
| `filter.regions`  | An array of valid AWS region strings. (e.g. ["us-west-1", "us-west-2"])<br /> For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| `filter.services`  | An array of AWS service strings from the following: <br /> AutoScaling \| CloudFormation \| CloudFront \| CloudTrail \| CloudWatch \| CloudWatchEvents \|<br />CloudWatchLogs \| Config \| DynamoDB \| EBS \| EC2 \| ElastiCache \| Elasticsearch \| ELB \| IAM \|<br />KMS \| RDS \| Redshift \| ResourceGroup \| Route53 \| S3 \| SES \| SNS \| SQS \| VPC \| WAF \|<br />ACM \| Inspector \| TrustedAdvisor \| Shield \| EMR \| Lambda \| Support \| Organizations \|<br />Kinesis \| EFS<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.categories`  | An array of category (AWS well-architected framework category) strings from the following:<br /> security \| cost-optimisation \| reliability \| performance-efficiency  \| operational-excellence <br />|
| `filter.riskLevels`  | An array of risk-level strings from the following: <br /> LOW\| MEDIUM \| HIGH \| VERY_HIGH \| EXTREME |
| `filter.statuses`  | An array of statuses strings from the following: SUCCESS \| FAILURE |
| `filter.tags`  | An array of any assigned metadata tags to your AWS resources |



##### Configuration
The table below give more information about configuration options:

| Channel  | Configuration |
| ------------- | ------------- |
| email  | `configuration.key` is "users", `configuration.value` is an array of verified users that have at lease readOnly access to the account|
| sms  | `configuration.key` is "users", `configuration.value` is an array of users with verified mobile numbers that have at lease readOnly access to the account|
| slack  | `{ "url" : "https://hooks.slack.com/services/your-slack-webhook", "channel": "#your-channel" }`  |
| pager-duty  |   `{ "serviceName" : "yourServiceName", "serviceKey": "yourServiceKey" }` |
| sns  |  `{ "arn" : "arn:aws:sns:REGION:ACCOUNT_ID:TOPIC_NAME"}`  |

Example Request:

```
curl -X POST \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
  "data": {
    "attributes": {
      "accountId": "H19NxM15-",
      "communicationSettings": [
        {
          "enabled": true,
           "filter": {
                "riskLevels": ["EXTREME"],
                "statuses": ["FAILURE"]
           },
            "configuration": {
                "serviceName": "SomeName",
                "serviceKey": "apagerdutyservicekey"
            },
            "channel": "pager-duty"
        }
      ]
     }
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/settings/communication
```
Example Response:

```
  [
    {
        "data": {
            "type": "settings",
            "id": "H19NxM15-:communication:pager-duty-S1xvk1zGwM",
            "attributes": {
                "type": "communication",
                "manual": "",
                "enabled": true,
                "filter": {
                    "riskLevels": [
                        "EXTREME"
                    ],
                    "statuses": [
                        "FAILURE"
                    ]
                },
                "configuration": {
                    "serviceName": "SomeName",
                    "serviceKey": "apagerdutyservicekey"
                },
                "channel": "pager-duty"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": {
                        "type": "accounts",
                        "id": "H19NxM15-"
                    }
                }
            }
        }
    }
]
```





## Get Communication Settings

A GET request to this endpoint allows you to get communication settings of the specified account.
This feature can be used in conjunction with a POST request to copy communication settings from one account to others. An example of this function is provided in the examples folder.


##### Endpoints:

`GET /settings/communication/accountId`

##### Parameters
- `accountId`: The ID of the account
- `channel`: Optional parameter if you want to only get settings for one specific channel: email, sms, slack, pager-duty, or sns.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Users with different roles can get different results from this endpoint. The table below describes the relationship between user role and type of data you get get.

| User ROLE  | Organisation-Level Settings | Account-Level Settings |
| ------------- | ------------- | ------------- |
| ADMIN  | Full settings with configurations | Full settings with configurations |
| user with FULL access to the account  | Settings without configurations | Full settings with configurations |
| user with READONLY access to the account  |  No settings | Settings without configurations | 
| user with NO access to the account  |  No settings  | No settings |




Example Request:

```

curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/accounts/H19NxMi5-/settings/rules
```
Example Response:
