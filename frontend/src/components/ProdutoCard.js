import Image from 'next/image';
import { criarCheckout } from '../utils/api';
import { useState } from 'react';

const ProdutoCard = ({ produto }) => {
  const [loading, setLoading] = useState(false);

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
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <Image 
          src={`/img/produtos/${produto.imagem}`}
          alt={produto.nome}
          layout="fill"
          objectFit="cover"
        />
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