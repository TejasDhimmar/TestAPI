const { success, error, validation} = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');

// Create user validator
const createValidators = () => [
    check('name', 'Please enter name').not().isEmpty().isLength({ min: 2, max: 50 }).withMessage('Enter valid name'),
    check('email', 'Please enter email').not().isEmpty().isEmail().normalizeEmail().withMessage('Enter valid email'),
    check('mobileno', 'Please enter mobile no.').not().isEmpty().isNumeric().withMessage('Mobile no. must be numeric').isLength({ min: 10, max: 10 }).withMessage('Please enter valid mobile no.'),
    check('password', 'Please enter password').not().isEmpty().isLength({ min: 4, max: 8 }).withMessage('Enter password with minimum 4 and maximum 8 characters'),
]

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }
    next();
}

// Login validator
const loginValidators = () => [
    check('username', 'Please enter username').not().isEmpty().isEmail().normalizeEmail().withMessage('Enter valid email'),
    check('password', 'Please Enter password').not().isEmpty().isLength({ min: 4, max: 8 }).withMessage('Enter password with minimum 4 and maximum 8 characters'),
]

const loginreporter = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    } 
    next();
}

module.exports = {
    create: [
        createValidators(),
        reporter
    ],
    login: [
        loginValidators(),
        loginreporter
    ]
}