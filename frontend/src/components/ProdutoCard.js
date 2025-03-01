import { useState } from 'react';
import { criarCheckout } from '../utils/api';

const ProdutoCard = ({ produto }) => {
  const [loading, setLoading] = useState(false);
  const [imagemErro, setImagemErro] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isHovered
          ? '0 10px 20px rgba(0, 0, 0, 0.15)'
          : '0 2px 5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}>
        {imagemErro ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '50px', opacity: 0.5 }}>📸</div>
            <div style={{ fontSize: '14px', opacity: 0.7 }}>Imagem não disponível</div>
          </div>
        ) : (
          <img
            src={produto.imagem.startsWith('http') ? produto.imagem : `/img/produtos/${produto.imagem}`}
            alt={produto.nome}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onError={() => setImagemErro(true)}
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            lineHeight: '1.2',
            flex: '1'
          }}>
            {produto.nome}
          </h3>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 'normal',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            backgroundColor: 'var(--accent-color)',
            color: 'white',
            display: 'inline-block',
            marginLeft: '0.5rem'
          }}>
            {produto.categoria}
          </span>
        </div>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--dark-gray)',
          marginBottom: '1rem',
          lineHeight: '1.4',
          minHeight: '40px'
        }}>
          {produto.descricao}
        </p>

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
            style={{
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.2s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              opacity: loading ? 0.8 : 1
            }}
          >
            {loading ? (
              <span>
                <span style={{ display: 'inline-block', marginRight: '8px', animation: 'spin 1s linear infinite' }}>⟳</span>
                Processando...
              </span>
            ) : 'Comprar'}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProdutoCard;