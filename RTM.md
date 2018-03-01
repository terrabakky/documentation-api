# Cloud Conformity Real-Time Monitoring API

Below is a list of the available APIs:

- [List All Events](#list-all-events)


## List All Events

This endpoint allows you to collect events that you have access to.

##### Endpoints:

`GET /rtm/events`

##### Parameters
- `accountIds`: A comma-separated list of Cloud Conformity accountIds. 
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


For example, the following is a request for a page of checks filtered by service `EC2`:

```
GET /events?accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[services]=EC2
```

Multiple filter values can be combined in a comma-separated list. For example the following is a request for a page of checks in `us-west-2` or `us-west-1` regions:
```
GET /events?accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-1,us-west-2
```

Furthermore, multiple filters can be applied to a single request. For example, the following is a request to get checks for `us-west-2` region when the status of the check is `SUCCESS`, and it's for `EC2` or `IAM` service in `security` category with `HIGH` risk level
```
GET /events?accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-2&filter[statuses]=SUCCESS&filter[categories]=security&filter[riskLevels]=HIGH&filter[services]=EC2,IAM
```


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
| filter[cc]  | Boolean, true for returning Cloud Conformity activity-events. |
| filter[aws]  | Boolean, true for returning AWS events and the associated check-events. |
<br />


Example Request:

```
curl -H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" https://us-west-2-api.cloudconformity.com/v1/checks?accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-2&filter[ruleIds]=EC2-001,EC2-002&filter[statuses]=SUCCESS&filter[categories]=security&filter[riskLevels]=HIGH&filter[services]=EC2&filter[createdDate]=1502572157914
```
Example Response:
###### Note the size of this response can be quite large and the example below is purposefully truncated

```
{
    "data": [
        {
            "type": "checks",
            "id": "ccc:r2gyR4cqg:IAM-017:IAM:global:groups-test",
            "attributes": {
                "region": "global",
                "status": "FAILURE",
                "risk-level": "LOW",
                "message": "IAM Group test contains no user",
                "last-modified-date": 1500166639466,
                "last-updated-date": 1500166639466,
                "failure-discovery-date": 1498910777689,
                "last-updated-by": "SYSTEM",
                "ccrn": "ccrn:aws:r1gyR4cqg:IAM:global:groups-test",
                "tags": [],
                "cost": 0,
                "waste": 0
            },
            "relationships": {
                "rule": {
                    "data": {
                        "type": "rules",
                        "id": "IAM-017"
                    }
                },
                "account": {
                    "data": {
                        "type": "accounts",
                        "id": "r1gyR4cqg"
                    }
                },
                "event": {
                    "data": null
                }
            }
        }

    ],
    "meta": {
        "total-pages": 714
    }
}
```

