var bitcoin = require('bitcoinjs-lib'),
	api = require('./coloredApi'),
	wallet = require('./../wallet.json');

var address = wallet.fundedAddress,
	key = bitcoin.ECKey.fromWIF(wallet.wif);

var signTx = function (unsignedTx, privateKey) {
	var tx = bitcoin.Transaction.fromHex(unsignedTx);
	var insLength = tx.ins.length;
	for (var i = 0; i < insLength; i++) {
		tx.sign(i, privateKey);
	}
	return tx.toHex();
};

var asset = {
	"issueAddress": address,
	"amount": 1,
	"divisibility": 0,
	"fee": 1000,
	"transfer": [{
		"address": address,
		"amount": 1
	}],
	"metadata": {
		"userData": {
			"ID": "ID",
			"Name": "AssetName",
			"Description": "AssetDescription",
			"Type": "AssetType"
		}
	}
};

api.postTo('issue', asset, function (err, body) {
	if (err) {
		console.log('error: ', err);
		return;
	}

	var signedTxHex = signTx(body.txHex, key);
	console.log("Signed tx: " + signedTxHex);

	api.postTo('broadcast', { 'txHex': signedTxHex }, function (err, body) {
		if (err) {
			console.log('error: ', err);
			return;
		}
	});
});