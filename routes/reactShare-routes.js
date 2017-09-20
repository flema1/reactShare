const express = require('express');
const reactShareRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const reactShareController = require('../controllers/reactShare-controller');
const shareController = require('../controllers/reactShare-controller');

reactShareRouter.post('/save', reactShareController.save);
reactShareRouter.get('/show/:username',reactShareController.show);
reactShareRouter.get('/session/:id',reactShareController.single);
reactShareRouter.put('/session/:id',reactShareController.update);
reactShareRouter.delete('/session/:id',reactShareController.destroy);


module.exports = reactShareRouter;

