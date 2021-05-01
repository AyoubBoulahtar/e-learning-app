const User = require('../models/user');
const { handleErrors } = require('../middleware/authMiddleware');
const { createToken } = require('../middleware/authMiddleware');


const maxAge = 3 * 24 * 60 * 60;

const signup_post = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        const user = await User.create({firstName, lastName, email, password});
        res.status(201).json({message: "User created!", user: user._id});
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email,password)
        const token = createToken(user._id);
        res.status(200).json({message: "User logged In", token: token, expiresIn: maxAge});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

/* const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
} */

module.exports = {
    signup_post,
    login_post
}
