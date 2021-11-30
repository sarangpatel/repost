const jwt = require('jsonwebtoken');

function apiResponse(code, message, statusCode = 200, data = [], additionalHeaders = {}){
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

function verifyAuthorization(event, context, callback) {
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
}



module.exports = {
	apiResponse,
	verifyAuthorization
};