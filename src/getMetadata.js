var api = require('./coloredApi');

var assetId = 'LevXAoqMqEk1vwaA4pRwLXVXYycdA79fgr/8ddaf1f77a38d7dc0a9ceb787f217f5d153a9a8eced2dd836ed04944dfcaf076:0';

api.getFrom('assetmetadata', assetId, function(err, body){
	if (err) {
		console.log('error: ', err);
	}
});