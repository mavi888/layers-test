'use strict';

const middy = require('middy');
const { ssm } = require('middy/middlewares');

const originalHandler = (event, context, callback) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			secretValue: context.value1
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
