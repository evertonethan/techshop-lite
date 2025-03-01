import { useState } from 'react';
import { criarCheckout } from '../utils/api';

const ProdutoCard = ({ produto }) => {
  const [loading, setLoading] = useState(false);
  const [imagemErro, setImagemErro] = useState(false);

  // Função para formatar o preço em BRL
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
  };

  // Função para iniciar o checkout com Stripe
  const handleCompra = async () => {
    try {
      setLoading(true);
      const { url } = await criarCheckout(produto.id);

      // Redireciona para a página de checkout do Stripe
      window.location.href = url;
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {imagemErro ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '50px', opacity: 0.5 }}>📸</div>
            <div style={{ fontSize: '14px', opacity: 0.7 }}>Imagem não disponível</div>
          </div>
        ) : (
            <img
              src={produto.imagem.startsWith('http') ? produto.imagem : `/img/produtos/${produto.imagem}`}
              alt={produto.nome}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={() => setImagemErro(true)}
            />
        )}
      </div>
      <div className="p-4">
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          {produto.nome}
        </h3>
        <p className="my-2">{produto.descricao}</p>
        <div className="flex justify-between items-center my-4">
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--primary-color)'
          }}>
            {formatarPreco(produto.preco)}
          </span>
          <button
            className="btn btn-primary"
            onClick={handleCompra}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Comprar'}
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Categoria: {produto.categoria}
        </div>
      </div>
    </div>
  );
};

export default ProdutoCard;