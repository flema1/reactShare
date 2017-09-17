const express = require('express');
const reactShareRouter = express.Router();

const reactShareController = require('../controllers/reactShare-controller');
//reactShareRouter.get('/', reactShareController.index);
//reactShareRouter.get('/songs',reactShareController.songs);
//reactShareRouter.get('/', reactShareController.index);
/*reactShareRouter.post('/', reactShareController.create);

reactShareRouter.get('/:id', reactShareController.show);
reactShareRouter.put('/:id', reactShareController.update);
reactShareRouter.delete('/:id', reactShareController.destroy);*/

module.exports = reactShareRouter;

