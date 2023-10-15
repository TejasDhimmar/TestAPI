module.exports = app => {
    var router = require("express").Router();
    const { jwtAuth } = require('../middleware/jwt');

    const userValidator = require('../validators/user.validator');
    const user = require('../controllers/user.controller');

    router.post('/create', userValidator.create, user.createUser);
    router.post('/login', userValidator.login, user.loginUser);

    router.use(jwtAuth);

    router.get('/me', user.userProfile);
    router.post('/logout', user.logoutUser);

    app.use('/api/user', router);
}