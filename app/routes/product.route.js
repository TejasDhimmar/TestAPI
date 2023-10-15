module.exports = app => {
    var router = require("express").Router();

    const product = require('../controllers/product.controller');

    router.get('/products', product.product);

    app.use('/api/', router);
}