const db = require('../database/database');

const ProductModel = {

	collection: 'products',

	findOne: function(id, callBack) {
		db.connection.collection(ProductModel.collection).findOne({
			_id: new db.objectId(id)
		}, callBack)
	},

	findAll: function(callBack){
		db.connection.collection(ProductModel.collection).find({}).toArray(callBack)
	},

	insert: function(item, callBack){
		db.connection.collection(ProductModel.collection).insert(item, callBack)
	},

	deleteOne: function(id, callBack){
		db.connection.collection(ProductModel.collection).deleteOne({
			_id: new db.objectId(id)
		}, callBack)
	},

	updateOne: function(id, item, callBack){
		db.connection.collection(ProductModel.collection).updateOne({
				_id: new db.objectId(id)
			}, {
				$set: {
					name: item.name,
					price: item.price
				}
			},
			callBack
		)
	}
}

module.exports = ProductModel