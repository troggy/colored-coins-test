var api = require('./coloredApi'),
	wallet = require('../wallet.json');


var extractAssets = function(body) {
	var assets = [];
	if (body.utxos.length == 0) return assets;

	body.utxos.forEach(function(utxo) {
		if (utxo.assets.length > 0) {
			utxo.assets.forEach(function(asset) {
				assets.push({ assetId: asset.assetId, amount: asset.amount, utxo: utxo.txid + ':' + utxo.index });
			});
		}
	});

	return assets;
};

var getMetadata = function(assetId, utxo, cb) {
	api.getFrom('assetmetadata', assetId + "/" + utxo, function(err, body){
		if (err) {
			console.log('error: ', err);
			return;
		}
		return cb(body.metadataOfIssuence);
	});
};

api.getFrom('addressinfo', wallet.fundedAddress, function(err, body) {
	if (err) {
		console.log('error: ', err);
		return;
	}

	var assets = extractAssets(body);
	console.log(assets);

	assets.forEach(function(asset) {
		getMetadata(asset.assetId, asset.utxo, function(metadata) {
			metadata.amount = asset.amount;
			console.log(metadata);
		});

	});

});
