import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { criarCheckout } from '../utils/api';

export default function Carrinho() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const [loading, setLoading] = useState(false);

    // Função para formatar o preço em BRL
    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(preco);
    };

    // Finalizar a compra
    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        try {
            setLoading(true);

            // Aqui você pode integrar com a API do Stripe
            // Para fins de demonstração, vamos apenas criar um alerta de sucesso
            alert('Redirecionando para o checkout...');

            // Lógica de redirecionamento para checkout seria implementada aqui
            // Por exemplo, criar uma sessão do Stripe com todos os itens do carrinho

            // Limpar o carrinho após checkout
            clearCart();
        } catch (error) {
            console.error('Erro ao processar checkout:', error);
            alert('Erro ao processar o checkout. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Carrinho de Compras | E-commerce</title>
                <meta name="description" content="Seu carrinho de compras" />
            </Head>

            <div className="container">
                <div className="cart-page">
                    <h1 className="cart-title">Carrinho de Compras</h1>

                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <div className="cart-empty-icon">🛒</div>
                            <h2>Seu carrinho está vazio</h2>
                            <p>Adicione produtos ao seu carrinho para continuar comprando.</p>
                            <Link href="/" className="btn btn-primary mt-4">
                                Continuar Comprando
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="cart-table-container">
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>Preço</th>
                                            <th>Quantidade</th>
                                            <th>Subtotal</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id} className="cart-item">
                                                <td className="cart-product-info">
                                                    <div className="cart-product-image">
                                                        <img
                                                            src={item.imagem && item.imagem.startsWith('http')
                                                                ? item.imagem
                                                                : `/img/produtos/${item.imagem}`}
                                                            alt={item.nome}
                                                            onError={(e) => {
                                                                e.target.src = "https://via.placeholder.com/80x80?text=Imagem";
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="cart-product-details">
                                                        <h3>{item.nome}</h3>
                                                        <p className="cart-product-category">{item.categoria}</p>
                                                    </div>
                                                </td>
                                                <td className="cart-product-price">
                                                    {formatarPreco(item.preco)}
                                                </td>
                                                <td className="cart-product-quantity">
                                                    <div className="quantity-control">
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                            className="quantity-input"
                                                        />
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="cart-product-subtotal">
                                                    {formatarPreco(item.preco * item.quantity)}
                                                </td>
                                                <td className="cart-product-actions">
                                                    <button
                                                        className="remove-btn"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        Remover
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="cart-summary">
                                <div className="cart-total">
                                    <span>Total:</span>
                                    <span className="total-value">{formatarPreco(getCartTotal())}</span>
                                </div>

                                <div className="cart-actions">
                                    <button
                                        className="btn-outline"
                                        onClick={clearCart}
                                    >
                                        Limpar Carrinho
                                    </button>
                                    <button
                                        className="btn-primary checkout-btn"
                                        onClick={handleCheckout}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Processando...
                                            </>
                                        ) : 'Finalizar Compra'}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
        .cart-page {
          padding: 2rem 0;
          min-height: calc(100vh - 200px);
        }
        
        .cart-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .cart-empty {
          text-align: center;
          padding: 3rem 1rem;
          background-color: #f8fafc;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .cart-empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .cart-empty h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .cart-empty p {
          color: #64748b;
          margin-bottom: 1.5rem;
        }
        
        .cart-table-container {
          width: 100%;
          overflow-x: auto;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border-radius: 0.5rem;
        }
        
        .cart-table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
        }
        
        .cart-table th,
        .cart-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .cart-table th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #1e293b;
        }
        
        .cart-product-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .cart-product-image {
          width: 80px;
          height: 80px;
          border-radius: 0.25rem;
          overflow: hidden;
          background-color: #f1f5f9;
        }
        
        .cart-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .cart-product-details h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .cart-product-category {
          font-size: 0.875rem;
          color: #64748b;
        }
        
        .cart-product-price {
          font-weight: 500;
        }
        
        .quantity-control {
          display: flex;
          align-items: center;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          width: fit-content;
        }
        
        .quantity-btn {
          background: none;
          border: none;
          width: 2rem;
          height: 2rem;
          font-size: 1rem;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s;
        }
        
        .quantity-btn:hover {
          background-color: #f1f5f9;
          color: #3b82f6;
        }
        
        .quantity-input {
          width: 2.5rem;
          height: 2rem;
          text-align: center;
          border: none;
          border-left: 1px solid #e2e8f0;
          border-right: 1px solid #e2e8f0;
          appearance: textfield;
        }
        
        .quantity-input::-webkit-inner-spin-button,
        .quantity-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .cart-product-subtotal {
          font-weight: 600;
          color: #3b82f6;
        }
        
        .remove-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        
        .remove-btn:hover {
          background-color: #fee2e2;
          border-radius: 0.25rem;
        }
        
        .cart-summary {
          background-color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.25rem;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .total-value {
          font-weight: 700;
          color: #3b82f6;
          font-size: 1.5rem;
        }
        
        .cart-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }
        
        .btn-outline {
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 500;
          background-color: transparent;
          color: #3b82f6;
          border: 1px solid #3b82f6;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .btn-outline:hover {
          background-color: rgba(59, 130, 246, 0.1);
        }
        
        .btn-primary {
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 500;
          background-color: #3b82f6;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .btn-primary:hover {
          background-color: #1e40af;
          transform: translateY(-2px);
        }
        
        .checkout-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
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
        
        /* Responsividade */
        @media (max-width: 768px) {
          .cart-table th:nth-child(2),
          .cart-table td:nth-child(2) {
            display: none;
          }
          
          .cart-actions {
            flex-direction: column;
          }
          
          .btn-outline,
          .checkout-btn {
            width: 100%;
          }
        }
        
        @media (max-width: 640px) {
          .cart-product-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .cart-product-image {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
        </>
    );
}