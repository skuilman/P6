// Requires
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesController = require('../controllers/sauce');

  router.post('/', auth, multer, saucesController.createSauce);  
  router.get('/', auth, saucesController.getAllSauces);
  router.put('/:id', auth, multer, saucesController.modifySauce);
  router.get('/:id', auth, saucesController.getOneSauce);
  router.delete('/:id', auth, saucesController.deleteOneSauce);
  router.post('/:id/like', auth, saucesController.likeSauce);

module.exports = router;
