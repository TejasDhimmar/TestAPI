module.exports = app => {
    var router = require("express").Router();
    const { jwtAuth } = require('../middleware/jwt');

    const joke = require('../controllers/joke.controller');

    router.use(jwtAuth);
    
    router.get('/randome-joke', joke.jokes);

    app.use('/api/', router);
}