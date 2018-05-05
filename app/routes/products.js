var router       = require('express').Router();
var myReturn     = require('../config/my-return');
var modelProduct = require('../models/model-product');

myReturn.path = "../";

router.get('/list', function (req, res, next) {
	modelProduct.findAll((err, data) => {
		if (err) { return console.log(err) }
		myReturn.data = data;
		res.render('pages/products-list', myReturn);
	});
});

router.get('/form', function (req, res, next) {
	myReturn.data = {name: '', price: '', _id:''};
	res.render('pages/products-form', myReturn);
});

router.get('/form/:id', function (req, res, next) {
	var id = req.params.id;
	modelProduct.findOne(id, (err, data) => {
		if (err) { return console.log(err) }
		myReturn.data = data;
		myReturn.path = "../../";
		res.render('pages/products-form', myReturn);
	});
});

router.post('/save', function (req, res, next) {
	const name  = req.body.name;
	const price = parseFloat(req.body.price);
	const id    = req.body.id;
	if (id) {
		modelProduct.updateOne(id, {
			name,
			price
		}, (err, result) => {
			if (err) { return console.log(err) }
			res.redirect('/products/list');
		})
	} else {
		modelProduct.insert({
			name,
			price
		}, (err, result) => {
			if (err) { return console.log(err) }
			res.redirect('/products/list');
		});
	}
});

router.get('/delete/:id', function (req, res, next) {
	var id = req.params.id;
	modelProduct.deleteOne(id, (err, result) => {
		if (err) { return console.log(err) }
		res.redirect('/products/list');
	});
});

module.exports = router;