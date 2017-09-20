
const Share = require('../models/share');
const axios = require ("axios");
const reactShareController = {};


reactShareController.show = (req, res) => {
  console.log("  we are in reactShareController.show" + req.params.username); 
  Share.findByUsername(req.params.username)
    .then(data => {
    console.log(data);
    res.json({
      data: data
    })
    console.log("successful code show"); 
    }).catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
}

reactShareController.single = (req, res) => {
  console.log("  we are in reactShareController.single" + req.params.id); 
  Share.findById(req.params.id)
    .then(data => {
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


reactShareController.save =(req,res ) =>{
   console.log("  we are in reactShareController.save "  +req.body.home_user); 
  Share.create({
    home_user: req.body.home_user,
    peer_user: req.body.peer_user,
    code: req.body.code
  }).then( code => {
    console.log(code);
    res.json({
      data: code
    })

    console.log("successful code save"); 
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

reactShareController.update = (req, res) => {
  console.log("we are in reactShareController.update" + req.body.code); 
  Share.update(
    {
      code: req.body.code,
    },
    req.params.id,
  )
    .then(data => {
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

reactShareController.destroy = (req, res) => {
  console.log("we are in reactShareController.delete" + req.params.id); 
  Share.destroy(req.params.id)
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


module.exports = reactShareController;