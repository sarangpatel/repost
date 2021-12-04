exports.schema = {
	"$schema": "http://json-schema.org/draft-07/schema",
	"$comment": "JSON Schema for users",
	"$id": "users",
    "title": "users",
    "type": "object",
    "required": [
        "username",
        "password",
        "full_name",
        "coutry_code",
        "mobile_no"
    ],
    "properties": {
        "_id": {
            "type": "string"
         },
        "username": {
            "type": "string",
            "minLength": 5,

        },
        "password": {
            "type": "string",
            "minLength": 5,
        },
        "full_name":{
            "type": "string",
            "minLength": 5,

        },
        "country_code":{
            "type": "string",
            "minLength": 2,
        },
        "mobile_no":{
            "type": "string",
            "minLength": 10,
        },
        "email":{
            "type": "string",
            "format": "email"
        },
        "timezone":{
            "type": "string"
        },
        "is_otp_verified":{
            "type": "integer",
            "enum": [0,1]
        },
        "token": {
            "type": "string"
        },
        "status": {
            "type": "string",
            "enum": ["ACTIVE", "INACTIVE"]
        },
        "created_at":{
            "type": "string"
        },
        "last_modified_at":{
            "type": "string"
        },
        "modified_count":{
            "type": "integer"
        }
    }
}