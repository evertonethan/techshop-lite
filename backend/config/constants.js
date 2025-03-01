// Determina o ambiente de execução (desenvolvimento ou produção)
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Configurações de URLs
const BASE_URL = IS_PRODUCTION
  ? process.env.PRODUCTION_API_URL
  : 'http://localhost:5000';

const FRONTEND_URL = IS_PRODUCTION
  ? process.env.PRODUCTION_FRONTEND_URL
  : process.env.FRONTEND_URL || 'http://localhost:3000';

// Configurações do Stripe
const STRIPE_CONFIG = {
  successUrl: `${FRONTEND_URL}/sucesso`,
  cancelUrl: `${FRONTEND_URL}/cancelado`,
  mode: 'payment'
};

module.exports = {
  IS_PRODUCTION,
  BASE_URL,
  FRONTEND_URL,
  STRIPE_CONFIG
};