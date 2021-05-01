const { Router } = require('express');
const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/signup', authController.signup_post);

authRouter.post('/login', authController.login_post);

/* authRouter.get('/logout', authController.logout_get);
 */
module.exports = authRouter;
