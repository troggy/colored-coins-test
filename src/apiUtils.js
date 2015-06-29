module.exports.handleResponse = function (error, response, body, callback) {
	console.log('Status: ', response ? response.statusCode : 'error');
	console.log('Body: ', JSON.stringify(body));

	if (error) {
		return callback(error);
	}
	if (typeof body === 'string') {
		body = JSON.parse(body);
	}
	if (response.statusCode != 200 && response.statusCode != 201) {
		return callback(body.error);
	}
	return callback(null, body);
};
