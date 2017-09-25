
const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');
var jwt = require('jsonwebtoken');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  // console.log (" auth            auth ");
     res.render('auth/login', {
     currentPage: 'login', 
  });
});

// authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
//   res.render('auth/register', {
//     currentPage: 'register', 
//   });
// });

authRouter.post('/register', usersController.create,
function(req, res){
    const token = jwt.sign({data: req.user.username}, process.env.SECRET_KEY, {
                            expiresIn: 604800 // 1 WEEK
                        });
console.log ("we are in the register  test");
    res.status(200).json({
        token: token,
        username: req.user.username,
        email: req.user.email,
        firstname: req.user.firstname
        });
} );



authRouter.post('/login', passport.authenticate('local'), function(req, res){
    const token = jwt.sign({data: req.user.username}, process.env.SECRET_KEY, {
                            expiresIn: 604800 // 1 WEEK
                        });
    res.status(200).json({
        token: token,
        username: req.user.username,
        email: req.user.email,
        firstname: req.user.firstname
        });
});


authRouter.delete('/logout', (req, res) => {
 res.status(200).json({
       info:req.body
        });
});




authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;