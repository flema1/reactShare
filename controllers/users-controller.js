const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
var jwt = require('jsonwebtoken');


const usersController = {};

usersController.index = (req, res) => {
  console.log('userController');
  User.findUserEnvi(req.user.id)
    .then(envi => {
      console.log (envi); 
       res.redirect('/envi/all');
        /*res.json({
        //user: req.user,
        data: 'user profile route',
        //envi: envi,
      });*/
    }).catch(err => {
      console.log(err);
      res.status(500).json({err: err});
    });
}

usersController.create = (req, res) => {
    console.log (" usersController.create  ---->");
    console.log(req.body.user.username + " req body");
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.user.password, salt);
  const token = jwt.sign({data: req.body.user.username}, process.env.SECRET_KEY, {
                            expiresIn: 604800 // 1 WEEK
                        });
  User.create({

        
    username: req.body.user.username,
    email: req.body.user.email,
    password_digest: hash,
    firstname: req.body.user.firstname,//,
    token: token
    //lastname: req.body.lastname,
  }).then(user => {
    req.login(user, (err) => {
      //console.log('no error')
      //if (err) return next(errm,'is this an error');
      
      console.log("sucessful register!");
      console.log (user);
    res.json({
        token: user.token,
        username: user.username,
        email: user.email,
        firstname: user.firstname
        });
     //res.redirect('/user');
      // res.redirect('/envi/all'); 
    });


  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = usersController;