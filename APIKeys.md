# Cloud Conformity API Keys API

Below is a list of the available APIs: 

- [List All API Keys](#list-all-api-keys)


## List All API Keys

This endpoint allows you to query your API Keys.

##### Endpoints: 

`GET /api-keys`

##### Parameters
This end point takes no parameters.

Example Request: 

```
curl -H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" https://us-west-2-api.cloudconformity.com/v1/api-keys
```
Example Response: 

```
{
    "data": [
        {
            "type": "api-keys",
            "id": "S1YnrbQuWagQ",
            "attributes": {
                "created-date": 1502971314320,
                "status": "ENABLED",
                "last-used-date": null
            },
            "relationships": {}
        }
    ]
}
```

