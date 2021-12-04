exports.apiResponse = (code, message, statusCode = 200, data = [], additionalHeaders = {}) => {
		const body = JSON.stringify({ code:code, message:message, data: data });

		let headers = {
			'Content-Type': 'application/json',
			/*'Access-Control-Allow-Origin': 'http://localhost, http://domain2.example'*/
			'Access-Control-Allow-Origin': '*'
		};

		headers = {...headers, ...additionalHeaders};

		return {
				statusCode: statusCode,
				body: body,
				headers: headers
			};
};

exports.apiResponseWithValidationErrors = (code, errors, statusCode = 200, additionalHeaders = {}) => {
    const error = errors.map((o) => {
        switch (o['keyword']) {
            case 'type':
                return o['dataPath'].slice(1) + ' ' + o['message'];
                break;
            case 'format':
                return o['dataPath'].slice(1) + ' ' + o['message'];
                break;
            case 'required':
                return o['params']['missingProperty'] + ' is required'
                break;
            case 'enum':
                return o['dataPath'].slice(1) + ' ' + o['message'] + ' ' + o['params']["allowedValues"].join(", ");
                break;
            default:
                return o['dataPath'].slice(1) + ' ' + o['message'];
                break;
        }
    });

	let headers = {
		'Content-Type': 'application/json',
		/*'Access-Control-Allow-Origin': 'http://localhost, http://domain2.example'*/
		'Access-Control-Allow-Origin': '*'
	};
	headers = {...headers, ...additionalHeaders};

	let message = (error instanceof Error) ? error.message + error.stack : error;
	let body = JSON.stringify({ code, message, data:[] });

	return {
			statusCode: statusCode,
			headers: headers,
			body: body,
			"isBase64Encoded": false
		};

}


/*function verifyAuthorization(event, context, callback) {
		try {
			console.log('Inside authorizer', event.authorizationToken);
			if(event.authorizationToken){
				const token = event.authorizationToken;
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				console.log('decoded', decoded);

				const policy =	{
					  "principalId": decoded.user.id,
					  "policyDocument": {
					    "Version": "2012-10-17",
					    "Statement": [
					      {
					        "Action": "execute-api:Invoke",
					        "Effect": "Allow",
					        "Resource": event.methodArn
					      }
					    ]
					  }
					};

				console.log('policy', policy, policy.policyDocument.Statement[0]);
				callback(null, policy);
			}else{
				callback('Unauthorized');
				//return apiResponse(0,"Unauthorized call.",401);
			}
		} catch (err) {
			console.log("Error: authorizer verifyAuthorization", err.message);
			callback('Unauthorized');
			//return apiResponse(0,err.message,401);
		}
}*/