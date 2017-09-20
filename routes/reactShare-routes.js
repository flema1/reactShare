const express = require('express');
const reactShareRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const usersController = require('../controllers/users-controller');
const reactShareController = require('../controllers/reactShare-controller');
const shareController = require('../controllers/reactShare-controller');

reactShareRouter.post('/save', reactShareController.save);
reactShareRouter.post('/username', usersController.get_username);

reactShareRouter.get('/show/:username',reactShareController.show);
reactShareRouter.get('/session/:id',reactShareController.single);
reactShareRouter.put('/session/:id',reactShareController.update);
reactShareRouter.delete('/session/:id',reactShareController.destroy);





module.exports = reactShareRouter;

