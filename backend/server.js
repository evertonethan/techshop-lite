const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração para o webhook do Stripe
// Precisa estar antes de outros middleware que analisam o corpo da requisição
app.post('/api/pagamentos/webhook', express.raw({ type: 'application/json' }));

// Middleware padrão para as outras rotas
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Servir arquivos estáticos para imagens de produtos
app.use('/data', express.static('data'));

// Importar rotas
const produtosRoutes = require('./routes/produtos');
const pagamentosRoutes = require('./routes/pagamentos');

// Rotas
app.use('/api/produtos', produtosRoutes);
app.use('/api/pagamentos', pagamentosRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do E-commerce com Stripe está funcionando!');
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});