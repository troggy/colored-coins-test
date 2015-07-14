var bitcoin = require('bitcoinjs-lib'),
    bitcore = require('bitcore'),
	api = require('./coloredApi'),
	wallet = require('./../wallet.json');

var key = bitcoin.ECKey.fromWIF(wallet.wif);

var signTx = function (unsignedTx, privateKey) {
	var tx = bitcoin.Transaction.fromHex(unsignedTx);
	var insLength = tx.ins.length;
	for (var i = 0; i < insLength; i++) {
		tx.sign(i, privateKey);
	}
	return tx.toHex();
};

var asset = {
  "from": "mntLztLU6aKV5nErBSvbf7XaQocaDyTwTf",
  "fee": 1000,
  "financeOutput": {
    value: "0.920967",
    n: 2,
    scriptPubKey: {
      asm: "OP_DUP OP_HASH160 50d4916a3bbfff5029d93a7bb6a713432aa18e6c OP_EQUALVERIFY OP_CHECKSIG",
      hex: "76a91450d4916a3bbfff5029d93a7bb6a713432aa18e6c88ac",
      type: "pubkeyhash"
    }
  },
  "financeOutputTxid": "58dc4938c40f0be24967a42e4cfd7e6df8c21e896160b66660726ad3c8722def",
  "to": [{
    "address": "2NBqYzuwPmAyQKEcAMoQM16u8VWR71YMXE1",
    "amount": 1,
    "assetId": 'LLaaW3fjdiLRPuyzyN9LLRigxRKvYhkwRu'
  }]
};

api.postTo('sendasset', asset, function (err, body) {
	if (err) {
		console.log('error: ', err);
		return;
	}

  txHex1 = body.txHex;

	//txHex1 = signTx(txHex1, key);
	//console.log("Signed tx: " + txHex1);


  console.log(JSON.stringify(new bitcore.Transaction(txHex1).toObject(), null, 2));

	/*api.postTo('broadcast', { 'txHex': signedTxHex }, function (err, body) {
		if (err) {
			console.log('error: ', err);
			return;
		}
	});*/
});
