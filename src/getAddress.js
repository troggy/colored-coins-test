var bitcoin = require('bitcoinjs-lib'),
	wallet = require('./../wallet.json');

key = bitcoin.ECKey.fromWIF(wallet.wif);

address = key.pub.getAddress(bitcoin.networks.testnet).toString();

console.log('New TESTNET address: ' + address);
