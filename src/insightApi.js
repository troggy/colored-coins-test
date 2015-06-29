var request = require('request'),
	bitcore = require('bitcore'),
	apiUtils = require('./apiUtils');

module.exports.getTx = function(txid, cb) {
	request.get('https://test-insight.bitpay.com/api/rawtx/' + txid, function (error, response, body) {
		return apiUtils.handleResponse(error, response, body, function(err, body) {
			return cb(body);
		});
	});
};
