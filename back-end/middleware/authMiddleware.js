const jwt = require('jsonwebtoken');
const User = require('../models/user');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { firstName:'', lastName: '', email: '', password: '' };

    // Incorrect email
    if (err.message === 'Incorrect email') {
        errors.email = 'This email is not registered';
    }

    // Incorrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'The password is incorrect';
    }

    // Duplicate error code
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// Create a token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign(
        { id },
        'token secret',
        {expiresIn: maxAge});
}

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    // Check if json web token exists and valid
    if (token) {
        jwt.verify(token, 'token secret', (err,decodedToken) => {
            if (err) {
              console.log(err.message);
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'token secret', async (err,decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}


module.exports = {
    handleErrors,
    createToken,
    requireAuth,
    checkUser
}

