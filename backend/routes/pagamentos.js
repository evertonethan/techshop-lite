const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

// Checkout de produto único
router.post('/checkout', pagamentoController.criarCheckout);

// Checkout do carrinho completo
router.post('/create-checkout-session', pagamentoController.criarCheckoutSession);

// Verificar status da sessão de checkout
router.get('/session/:sessionId', pagamentoController.verificarCheckoutSession);

// Webhook do Stripe (precisa de raw body, usar um middleware específico)
router.post('/webhook', express.raw({ type: 'application/json' }), pagamentoController.stripeWebhook);

module.exports = router;