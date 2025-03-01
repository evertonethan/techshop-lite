const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rotas
router.get('/', produtoController.getProdutos);
router.get('/categorias', produtoController.getCategorias);
router.get('/:id', produtoController.getProdutoPorId);

module.exports = router;