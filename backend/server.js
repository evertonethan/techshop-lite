const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

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

// Adicione após as configurações de middleware
app.use('/images', express.static('data'));

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do E-commerce com Stripe está funcionando!');
});

// Definir primeiros os controladores
const produtoController = {
  getProdutos: (req, res) => {
    // Implementação básica para teste
    const produtos = require('./data/produtos');
    res.json(produtos);
  },
  getProdutoPorId: (req, res) => {
    const produtos = require('./data/produtos');
    const { id } = req.params;
    const produto = produtos.find(p => p.id === parseInt(id));
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.json(produto);
  },
  getCategorias: (req, res) => {
    const produtos = require('./data/produtos');
    const categorias = [...new Set(produtos.map(p => p.categoria))];
    res.json(categorias);
  }
};

const pagamentoController = {
  criarCheckout: (req, res) => {
    // Implementação básica para teste
    res.json({ mensagem: 'Checkout criado com sucesso', sessionId: 'test-session-123' });
  }
};

// Configurar rotas diretamente no server.js
const produtosRouter = express.Router();
produtosRouter.get('/', produtoController.getProdutos);
produtosRouter.get('/categorias', produtoController.getCategorias);
produtosRouter.get('/:id', produtoController.getProdutoPorId);

const pagamentosRouter = express.Router();
pagamentosRouter.post('/checkout', pagamentoController.criarCheckout);

// Usar as rotas
app.use('/api/produtos', produtosRouter);
app.use('/api/pagamentos', pagamentosRouter);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});