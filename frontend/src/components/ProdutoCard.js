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
      className="produto-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="produto-imagem-container">
        {imagemErro ? (
          <div className="produto-imagem-fallback">
            <div className="produto-imagem-icon">📸</div>
            <div className="produto-imagem-texto">Imagem não disponível</div>
          </div>
        ) : (
          <img
            src={produto.imagem.startsWith('http') ? produto.imagem : `/img/produtos/${produto.imagem}`}
            alt={produto.nome}
            className="produto-imagem"
            onError={() => setImagemErro(true)}
          />
        )}

        <div className="produto-categoria-tag">
          {produto.categoria}
        </div>

        {isHovered && (
          <button
            className="produto-quickview-btn"
            onClick={(e) => {
              e.stopPropagation();
              // Aqui você poderia implementar uma visualização rápida do produto
              alert(`Visualização rápida de ${produto.nome}`);
            }}
          >
            Visualizar
          </button>
        )}
      </div>

      <div className="produto-info">
        <h3 className="produto-nome">{produto.nome}</h3>
        <p className="produto-descricao">{produto.descricao}</p>

        <div className="produto-footer">
          <div className="produto-preco">
            {formatarPreco(produto.preco)}
          </div>
          <button
            className={`produto-comprar-btn ${loading ? 'loading' : ''}`}
            onClick={handleCompra}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processando...
              </>
            ) : 'Comprar'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .produto-card {
          background-color: var(--surface-color);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        
        .produto-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .produto-imagem-container {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background-color: #f0f0f0;
        }
        
        .produto-imagem {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .produto-card:hover .produto-imagem {
          transform: scale(${isHovered ? '1.05' : '1'});
        }
        
        .produto-imagem-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
          padding: 1rem;
          text-align: center;
        }
        
        .produto-imagem-icon {
          font-size: 3rem;
          opacity: 0.5;
          margin-bottom: 0.5rem;
        }
        
        .produto-imagem-texto {
          font-size: 0.875rem;
          color: var(--text-light);
        }
        
        .produto-categoria-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: var(--primary-color);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }
        
        .produto-quickview-btn {
          position: absolute;
          left: 50%;
          bottom: 1rem;
          transform: translateX(-50%);
          background-color: rgba(255, 255, 255, 0.9);
          color: var(--primary-color);
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }
        
        .produto-quickview-btn:hover {
          background-color: white;
          transform: translateX(-50%) translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .produto-info {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .produto-nome {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-color);
          line-height: 1.3;
          transition: color 0.2s ease;
        }
        
        .produto-card:hover .produto-nome {
          color: var(--primary-color);
        }
        
        .produto-descricao {
          font-size: 0.875rem;
          color: var(--text-light);
          margin-bottom: 1.25rem;
          line-height: 1.5;
          flex: 1;
        }
        
        .produto-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-top: 1px solid var(--light-gray);
          padding-top: 1rem;
        }
        
        .produto-preco {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .produto-comprar-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: var(--border-radius-sm);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .produto-comprar-btn:hover {
          background-color: var(--secondary-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .produto-comprar-btn:active {
          transform: translateY(0);
        }
        
        .produto-comprar-btn.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }
        
        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProdutoCard;