var bitcore = require('bitcore'),
	insight = require('./insightApi'),
	wallet = require('./../wallet.json');


var hasOpReturn = function(tx) {
	for (var i = 0; i < tx.outputs.length; i++) {
		if (tx.outputs[i].script.isDataOut()) {
			return true;
		}
	}
	return false;
};

var txid = "349f166f699424fa21d79ede695130aa59d09ce7a26484185cc370be060971ba";

insight.getTx(txid, function(data) {
	var tx = new bitcore.Transaction(data.rawtx);
	console.log("Has OP_RETURN: " + hasOpReturn(tx));
});




