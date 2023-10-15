const { success, error, validation } = require('../utils/restResponse');
var jwt = require('jsonwebtoken');
const db = require('../utils/db');
const user = db.user;

function jwtAuth(req, res, next) {
    const secret = process.env.jwtsecret;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, secret, async (err, tokenData) => {
                if (err) {
                    let error1 = [];
                    error1.push('Invalid token');
                    // jwt authentication error
                    return res.status(401).send(error(error1, 401));
                }

                await user.findOne({ where: { token: token, id: tokenData.user_id }, attributes: ['id', 'name'] }).then(async userData => {
                    if (userData == null) {
                        return res.send(error("Invalid token"));
                    }
                }).catch(function (e) {
                    console.log(e)
                    return res.send(error(process.env.SERVER_ERROR));
                })

                req.user_id = tokenData.user_id;
                next();
            })
        } else {
            return res.status(401).send(error('Token must be provided!', 401));
        }
    } else {
        return res.status(401).send(error('You are not authorized!', 401));
    }
}

module.exports = {
    jwtAuth
}