const { success, error } = require('../utils/restResponse');
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = db.user;

const createUser = async (req, res) => {
    try {
        let param = req.body;

        await user.findOne({ where: { email: param.email }, attributes: ['id', 'password', 'email', 'name', 'mobileno'] }).then(async userData => {
            if (userData != null) {
                return res.send(error("Email already exist"));
            }

            let insertData = {
                name: param.name,
                mobileno: param.mobileno,
                email: param.email,
                password: param.password
            }
    
            await user.create(insertData).then(async userData => {
                return res.send(success(insertData, "User created successfull"))
            }).catch(function (e) {
                console.log(e);
                return res.send(error(process.env.SERVER_ERROR));
            })

        }).catch(function (e) {
            console.log(e);
            return res.send(error(process.env.SERVER_ERROR));
        })

        
    } catch (e) {
        console.log(e);
        return res.send(error(process.env.SERVER_ERROR));
    }
}

const loginUser = async (req, res) => {
    try {
        let param = req.body;

        await user.findOne({ where: { email: param.username }, attributes: ['id', 'password', 'email', 'name', 'mobileno'] }).then(async userData => {
            if (userData == null) {
                return res.send(error("Invald Username"));
            }

            let userDetail = userData.get({ plain: true });

            let validUser = bcrypt.compareSync(param.password, userDetail.password);
            if (!validUser) {
                return res.send(error('Invalid Password!'));
            }

            var token = jwt.sign({ user_id: userDetail.id, email: userDetail.email }, process.env.jwtsecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            let updateData = {
                token: token,
                updatedAt: Date.now()
            }
            await user.update(updateData, {
                where: { id: userDetail.id }
            }).then(async ([affectedCount, affectedRows]) => {
                userDetail.token = token;
                delete userDetail.password;

                return res.send(success(userDetail, "User login successfull"))
            }).catch(function (e) {
                console.log(e);
                return res.send(error(process.env.SERVER_ERROR));
            })

        }).catch(function (e) {
            console.log(e);
            return res.send(error(process.env.SERVER_ERROR));
        })
    } catch (e) {
        console.log(e);
        return res.send(error(process.env.SERVER_ERROR));
    }
}

const userProfile = async (req, res) => {
    try {
        await user.findOne({ where: { id: req.user_id }, attributes: ['id', 'name', 'email', 'mobileno'] }).then(async userData => {
            if (userData == null) {
                return res.send(error("Data not exist"));
            }

            let user = userData.get({ plain: true });

            return res.send(success(user, "User Profile"))
        }).catch(function (e) {
            console.log(e);
            return res.send(error(process.env.SERVER_ERROR));
        })
    } catch (e) {
        console.log(e);
        return res.send(error(process.env.SERVER_ERROR));
    }
}

const logoutUser = async (req, res) => {
    let updateData = {
        token: null
    }
    user.update(updateData, {
        where: { id: req.user_id }
    }).then(async ([affectedCount, affectedRows]) => {
        return res.send(success({}, "User logout successfull"))
    }).catch(function (e) {
        console.log(e);
        return res.send(error(process.env.SERVER_ERROR));
    })
}

module.exports = {
    createUser,
    loginUser,
    userProfile,
    logoutUser
}