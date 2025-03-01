const produtos = require('../data/produtos');

// Retorna todos os produtos
const getProdutos = (req, res) => {
  try {
    // Filtra produtos por categoria se o parâmetro for fornecido
    const { categoria } = req.query;
    
    if (categoria && categoria !== 'todas') {
      const produtosFiltrados = produtos.filter(p => 
        p.categoria.toLowerCase() === categoria.toLowerCase()
      );
      return res.json(produtosFiltrados);
    }
    
    // Retorna todos os produtos
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar produtos' });
  }
};

// Retorna um produto específico pelo ID
const getProdutoPorId = (req, res) => {
  try {
    const { id } = req.params;
    const produto = produtos.find(p => p.id === parseInt(id));
    
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    
    res.json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar produto' });
  }
};

// Retorna todas as categorias disponíveis
const getCategorias = (req, res) => {
  try {
    // Extrai categorias únicas dos produtos
    const categorias = [...new Set(produtos.map(p => p.categoria))];
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar categorias' });
  }
};

module.exports = {
  getProdutos,
  getProdutoPorId,
  getCategorias
};