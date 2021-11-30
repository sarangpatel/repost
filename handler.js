'use strict';
const {apiResponse} = require('./common/utility.js');
const dbutils = require('./common/db.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


// POST - https://z8vdmqeq0i.execute-api.ap-south-1.amazonaws.com/dev/api/v1/login
async function login(event, context, callback) {
		try {
			//context.callbackWaitsForEmptyEventLoop = false;
			console.log("Inside login: POST");
			let {username,password} = JSON.parse(event.body);
			password = crypto.createHash('md5').update(password).digest('hex');
			const recordExists  = await dbutils.getData('users', ' id,username,full_name ', ['username','password','is_active'], 
										[username.trim(), password.trim(),1]);
			if(recordExists.length){
				const secret = process.env.JWT_SECRET;
				const user = recordExists[0];
				const token = jwt.sign({user} , process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
				Object.assign(recordExists[0], {token:token}); //recordExists overwrite ( target )
				return apiResponse(1,"success",200,[recordExists[0]]);
			}else{
				return apiResponse(0,"User does not exist or Password incorrect.",401);
			}
		} catch (err) {
			console.log("error: login", err.message	);
			return apiResponse(1,err.message,401);
		}
}


async function refreshToken(event, context, callback) {
		try {
			//context.callbackWaitsForEmptyEventLoop = false;
			console.log("Inside refreshToken: POST");
			const {user_id} = JSON.parse(event.body);
			const recordExists  = await dbutils.getData('users', ' id,username,full_name ', ['id'], 
										[user_id]);
			if(recordExists.length){
				const secret = process.env.JWT_SECRET;
				const user = recordExists[0];
				const token = jwt.sign({user} , process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
				Object.assign(recordExists[0], {token:token}); //recordExists overwrite ( target )
				return apiResponse(1,"success",200,[recordExists[0]]);
			}else{
				return apiResponse(0,"Can't refresh token.",404);
			}

		} catch (err) {
			console.log("Error: updateTemplates", err.message);
			return apiResponse(0,err.message,200);
		}
}



module.exports = {
	login, 
	refreshToken
};