
const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');


authRouter.post('/register', usersController.create);
authRouter.post('/login', passport.authenticate('local'),usersController.updateToken);
authRouter.delete('/logout',(req, res) => {
    res.status(200).json({
       info:req.body
    });
});




module.exports = authRouter;