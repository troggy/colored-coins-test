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
  "from": address,
  "fee": 1000,
  "to": [{
    "address": "2N5HqAKTaXrfizWN8YdL53EsnsVaDAYyjxK",
    "amount": 2,
    "assetId": 'LLaaW3fjdiLRPuyzyN9LLRigxRKvYhkwRu'
  }]
};

api.postTo('sendasset', asset, function (err, body) {
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