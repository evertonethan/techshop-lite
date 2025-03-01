// Verifica se o ambiente é de produção
export const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

// Retorna a URL base da API baseada no ambiente
export const getApiUrl = () => {
  return isProduction 
    ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL 
    : process.env.NEXT_PUBLIC_API_URL;
};

// Obter a chave pública do Stripe
export const getStripePublicKey = () => {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
};

// Configurações da aplicação
export const config = {
  appName: 'TechShop Lite',
  footerText: '© 2025 TechShop Lite. Todos os direitos reservados.',
};