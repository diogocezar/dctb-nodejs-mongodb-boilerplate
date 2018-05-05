const config = require('../config/config')

const MongoDB = {
	connection  : null,
	mongoClient : null,
	objectId    : null,
	getConnString: function(config){
		return `mongodb://${config.dataBase.host}:${config.dataBase.port}/${config.dataBase.base}`;
	},
	init: function(){
		MongoDB.objectId    = require("mongodb").ObjectId
		MongoDB.mongoClient = require("mongodb").MongoClient
		MongoDB.mongoClient.connect(MongoDB.getConnString(config))
			.then(conn => MongoDB.connection = conn.db(config.dataBase.base))
			.catch(err => console.log(err))
	}
}

MongoDB.init()

module.exports = MongoDB