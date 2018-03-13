# Cloud Conformity External Ids API

Below is a list of the available APIs: 

- [Create an External Id](#create-an-external-id)


## Create an External Id

This endpoint allows you to create a new external id.

##### Endpoints: 

`POST /external-ids`

##### Parameters
This end point takes no parameters.

Example Request: 

```
curl -X POST \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/external-ids
```
Example Response: 

```
{
    "data": {
        "type": "external-ids",
        "id": "77923950-9ab1-11e7-9ebb-4794edfe32bf",
        "attributes": {
            "valid-util": 1505550866404
        },
        "relationships": {}
    }
}
```
You need data.id (`77923950-9ab1-11e7-9ebb-4794edfe32bf`) for registering a new account.

IMPORTANT:  
> For security reasons, External Ids are only valid for one hour. If you do not use it to create an account within the hour, you must generate a new external id and start over.


