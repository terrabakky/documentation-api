# Cloud Conformity Events API

Below is a list of the available APIs:

- [List All Events](#list-all-events)


## List All Events

This endpoint allows you to collect events that you have access to.

##### Endpoints:

`GET /events`

##### Parameters
- `accountIds`: A comma-separated list of Cloud Conformity accountIds. 
- `aws`: true | false; true for returning Cloud Conformity activity-events.
- `cc`: true | false; true for returning AWS events and the associated check-events. 
- `page[size]`: Indicates the number of results that should be returned. Maximum value is 1000 and defaults to 100 if not specified
- `page[number]`: Indicates the page number, defaults to 0
- `filter`: Optional parameter including services, regions, statuses, riskLevels, ruleIds, userIds, identities, parentId, since, until, cc, and aws.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Some guidelines about using this endpoint:
1. If acountIds are not provided, events are returned from all accounts you have access to. If you are ADMIN, organisation-level events are also returned.
2. If you provide an accountId to an account you do not have at least ReadOnly access to, events from that account will not be returned.
3. You can pull 3 types of events from this endpoint. **Events** that we receive from AWS, **activity-events** from cloud conformity users, and **check-events** which are children of the former two types of events. For more information, see examples below.

##### Filtering
The `filter` query parameter is reserved to be used as the basis for filtering.

The table below give more information about filter options:

| Name  | Values |
| ------------- | ------------- |
| filter[regions]  | global \| us-east-2 \| us-east-1 \| us-west-1 \| us-west-2 \| ap-south-1 \| ap-northeast-2 \|<br />ap-southeast-1 \| ap-southeast-2 \| ap-northeast-1 \| ca-central-1 \| eu-central-1 \| eu-west-1 \|<br /> eu-west-2 \| sa-east-1 <br /><br />For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| filter[services]  | AutoScaling \| CloudConformity \|CloudFormation \| CloudFront \| CloudTrail \| CloudWatch \|<br />CloudWatchEvents \| CloudWatchLogs \| Config \| DynamoDB \| EBS \| EC2 \| ElastiCache \| Elasticsearch \| ELB \| IAM \| KMS \| RDS \| Redshift \| ResourceGroup \| Route53 \| S3 \| SES \|<br />SNS \| SQS \| VPC \| WAF \| ACM \| Inspector \| TrustedAdvisor \| Shield \| EMR \| Lambda \|<br />Support \| Organizations \| Kinesis \| EFS<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services)<br /><br /> Additionally, events we recieve from AWS may have different service labels such as "ec2.amazonaws.com" |
| filter[riskLevels]  | LOW\| MEDIUM \| HIGH \| VERY_HIGH \| EXTREME <br /><br /> Only check-events have riskLevels, for more information about risk levels, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| filter[statuses]  | SUCCESS \| FAILURE \| Only check-events have statuses |
| filter[ruleIds]  | EC2-001 \| EC2-002 \| etc... Only activity-events will have ruleIds. (e.g. configuring rule settings)<br /><br />For more information about rules, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| filter[userIds]  | A comma-separated list of Cloud Conformity userIds. Only activity-events will have userIds. |
| filter[identities]| Only incoming AWS events will have identities. |
| filter[parentId] | Only check-events will have a parentId. parentId refers to the parent AWS event. |
| filter[since]  | Refers to the start of the time range you want to query for events.<br /><br />The numeric value of the specified time as the number of milliseconds since January 1, 1970, 00:00:00 UTC |
| filter[until]  |  Refers to the end of the time range you want to query for events.<br /><br />The numeric value of the specified date as the number of milliseconds since January 1, 1970, 00:00:00 UTC |
| filter[parentOnly]  | Boolean, true for not returning check-events. Defaults to false if NOT specified. |
<br />


For example, the following is a request for static-deployer events within a specified time frame on one account:

```
curl -H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" https://us-west-2-api.cloudconformity.com/v1/events?accountIds=ryi9NPivK&filter[aws]=true&filter[identities]=static-deployer&filter[since]=1519919272016&filter[until]=1519932055819
```
Example Response:
###### Each event can be quite large and the example below is purposefully truncated

```
{
    "data": [
        {
            "type": "events",
            "id": "rkTkAsr_GSJlpyCoB_M",
            "attributes": {
                "name": "account.monitoring.activity",
                "time": 1519922649000,
                "service": "cloudfront.amazonaws.com",
                "identity": "static-deployer",
                "region": "us-east-1",
                "description": "cloudfront.amazonaws.com/CreateInvalidation"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "account",
                        "id": "ryi9NPivK"
                    }
                }
            }
        }
    ],
    "meta": {
        "total-pages": 1
    }
}

```
<br />

The previous request returned an AWS event. To see of there are any related check-events (children), the following request can be made.

```
GET /events?accountIds=ryi9NPivK&filter[aws]=true&filter[cc]=true&filter[parentId]=rkTkAsr_GSJlpyCoB_M
```

Example Response:
###### Each event can be quite large and the example is truncated
```
{
    "data": [
        {
            "type": "events",
            "id": "rJmgCjr_fHJeXgAiHOG",
            "attributes": {
                "name": "account.event.check",
                "time": 1519922665504,
                "service": "RTM",
                "region": "us-east-1",
                "status": "FAILURE",
                "description": "An activity in an unauthorised region (us-east-1) has been detected",
                "risk-level": "VERY_HIGH"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "account",
                        "id": "ryi9NPivK"
                    }
                }
                "parent": {
                    "data": {
                        "type": "event",
                        "id": "rkTkAsr_GSJlpyCoB_M"
                    }
                },
                "rule": {
                    "data": {
                        "type": "rule",
                        "id": "RTM-008"
                    }
                },
                "check": {
                    "data": {
                        "type": "check",
                        "id": "ccc:ryi6NPivW:RTM-008:RTM:us-east-1:"
                    }
                }
            }
        }
    ],
    "meta": {
        "total-pages": 1,
    }
}
```
