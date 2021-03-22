const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandom);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.addNew);
router.put('/products/:id', ProductController.edit);
router.delete('/products/:id', ProductController.delete);

module.exports = router;