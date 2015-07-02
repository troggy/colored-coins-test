var request = require('request'),
	apiUtils = require('./apiUtils');


module.exports.postTo = function (api_endpoint, json_data, callback) {
	console.log(api_endpoint + ': ', JSON.stringify(json_data));
	request.post({
			url: 'http://testnet.api.coloredcoins.org:80/v2/' + api_endpoint,
			headers: {'Content-Type': 'application/json'},
			form: json_data
		}, function (error, response, body) {
			apiUtils.handleResponse(error, response, body, callback);
		}
	);
};

module.exports.getFrom = function (api_endpoint, param, callback) {
	console.log('Get from:' + api_endpoint + '/' + param);
	request.get('http://testnet.api.coloredcoins.org:80/v2/' + api_endpoint + '/' + param, function (error, response, body) {
		apiUtils.handleResponse(error, response, body, callback);
	});
};
