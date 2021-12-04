'use strict';
const {apiResponse, apiResponseWithValidationErrors} = require('./common/utility.js');
const RESPONSE_MESSAGES = require('./common/constant.message.js').RESPONSE_MESSAGES;
const mongoDBUtils = require('./common/mongodb.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true});
let userSchema = require('./schema/user.schema.js').schema;


exports.login = async (event, context) => {
		try {
			console.log("Inside login: POST");
			let eventBody = JSON.parse(event.body);
			userSchema["required"] = ["username", "password"]; //for login username, password is required
			const inputValidator = ajv.compile(userSchema);
			const validationResult = inputValidator(eventBody);
			if (!validationResult) {
				return apiResponseWithValidationErrors(1, inputValidator.errors);
			}
			eventBody.password = crypto.createHash('md5').update(eventBody.password.trim()).digest('hex');
			const user = mongoDBUtils.findOne("users", { username : eventBody.username.trim(), password : eventBody.password },
								{ projection: { _id: 1, username: 1, full_name: 1, email: 1, country_code: 1, mobile_no: 1,  email: 1,
								 created_at: 1, last_modified_at: 1 } });
			if(user.length){ //is_otp_verified: 1, status: 'ACTIVE'
				if(user.is_otp_verified === 1 && user.status === 'ACTIVE'){
					const token = jwt.sign(user , process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
					Object.assign(user, {token:token});
					return apiResponse(1, RESPONSE_MESSAGES.LOGIN_SUCCESS, 200, [user]);
				}else if(user.is_otp_verified === 0){
					return apiResponse(1, RESPONSE_MESSAGES.USER_OTP_NOT_VERIFIED, 200, []);
				}else if(user.status !== 'ACTIVE'){
					return apiResponse(1, RESPONSE_MESSAGES.USER_NOT_ACTIVE, 200, []);
				}
			}else{
				return apiResponse(1, RESPONSE_MESSAGES.USER_NOT_FOUND, 200, []);
			}
		} catch (err) {
			console.log("Error: login", err.message	);
			return apiResponse(0, err.message, 401);
		}
}

