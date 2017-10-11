const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
var jwt = require('jsonwebtoken');


const usersController = {};

usersController.index = (req, res) => {
  console.log('userController');
  User.findUserEnvi(req.user.id)
    .then(envi => {
      console.log (envi); 
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
    firstname: req.body.user.name,
    token: token
    //lastname: req.body.lastname,
  }).then(user => {
    req.login(user, (err) => {
      console.log("sucessful register!");
      console.log (user);
    res.json({
        token: user.token,
        username: user.username,
        email: user.email,
        firstname: user.firstname
        });
    });
 }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}


usersController.updateToken = (req, res) => {
    console.log (" usersController.updateToken  ---->");
    console.log(req.body + " req body");
      for(var propt in req.body){
    console.log(propt + ': ' + req.body);
    }


  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  const token = jwt.sign({data: req.body.username}, process.env.SECRET_KEY, {
                            expiresIn: 604800 // 1 WEEK
                        });
  User.updateToken({
    username: req.body.username,
    token: token
    //lastname: req.body.lastname,
  }).then(user => {
    req.login(user, (err) => {
      console.log("sucessful register!");
      console.log (user);
    res.json({
        token: user.token,
        username: user.username,
        email: user.email,
        firstname: user.firstname
        });
    });
 }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}


usersController.get_username = (req, res) => {
  console.log (" usersController. get username  ---->" + req.body.token);
  User.findByToken(req.body.token)  
    .then(data => {
         console.log("see below");
         console.log(data); 
      res.json({
        message: 'ok',
        data: data,
      });
    }).catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });
}


usersController.deleteToken=(req,res)=>{
  console.log("we are in usersController.deleteToken" + req.body); 
  User.updateToken(req.body.body)
    .then(data=> {
      res.json({
        message: 'ok',
        data: data,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });

};

module.exports = usersController;