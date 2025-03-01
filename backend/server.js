const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const produtosRoutes = require('./routes/produtos');
const pagamentosRoutes = require('./routes/pagamentos');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

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