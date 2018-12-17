'use strict';

const middy = require('middy');
const { ssm } = require('middy/middlewares');
const uuidv1 = require('uuid/v1');

const originalHandler = (event, context, callback) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			uuid: uuidv1(),
			secretValue: context.value1,
			message: 'change this thing'
		})
	};

	callback(null, response);
};

module.exports.hello = middy(originalHandler).use(
	ssm({
		cache: true,
		cacheExpiryInMillis: 1 * 60 * 1000, // 1 mins
		setToContext: true,
		names: {
			value1: '/middy-test/value1'
		}
	})
);
