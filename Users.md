# Cloud Conformity API Keys API


Below is a list of the available APIs: 

- [Get The Current User](#get-the-current-user)


## Get The Current User

This endpoint get the current user.

##### Endpoints: 

`GET /whoami`

##### Parameters
This end point takes no parameters.

Example Request: 

```
curl -H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" https://us-west-2-api.cloudconformity.com/v1/whoami
```
Example Response: 

```
{
    "data": {
        "type": "users",
        "id": "517uNyIvG",
        "attributes": {
            "first-name": "Scott",
            "last-name": "Tiger",
            "role": "ADMIN",
            "email": "******@cloudconformity.com",
            "status": "ACTIVE",
            "mfa": false,
            "last-login-date": 1503586843842,
            "created-date": 1485834564224
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "A9NDYY12z"
                }
            }
        }
    }
}
```

