import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const MiniCart = () => {
    const { cartItems, removeFromCart, getCartItemsCount, getCartTotal } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const cartRef = useRef(null);

    // Formatar preço
    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(preco);
    };

    // Fechar o minicart ao clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Limitar a descrição para não ficar muito grande
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="mini-cart-container" ref={cartRef}>
            <button
                className="cart-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="cart-icon">🛒</span>
                {getCartItemsCount() > 0 && (
                    <span className="cart-count">{getCartItemsCount()}</span>
                )}
            </button>

            {isOpen && (
                <div className="mini-cart">
                    <div className="mini-cart-header">
                        <h3>Seu Carrinho</h3>
                        <button
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="mini-cart-empty">
                            <p>Seu carrinho está vazio</p>
                            <Link href="/" className="shop-link" onClick={() => setIsOpen(false)}>
                                Ver produtos
                            </Link>
                        </div>
                    ) : (
                        <>
                            <ul className="mini-cart-items">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="mini-cart-item">
                                        <div className="item-image">
                                            <img
                                                src={item.imagem && item.imagem.startsWith('http')
                                                    ? item.imagem
                                                    : `/img/produtos/${item.imagem}`}
                                                alt={item.nome}
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/50x50?text=Produto";
                                                }}
                                            />
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.nome}</h4>
                                            <p className="item-price">
                                                {item.quantity} x {formatarPreco(item.preco)}
                                            </p>
                                        </div>
                                        <button
                                            className="remove-item"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="mini-cart-footer">
                                <div className="cart-total">
                                    <span>Total:</span>
                                    <span>{formatarPreco(getCartTotal())}</span>
                                </div>
                                <div className="cart-actions">
                                    <Link
                                        href="/carrinho"
                                        className="view-cart"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Ver Carrinho
                                    </Link>
                                    <Link
                                        href="/checkout"
                                        className="checkout"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Finalizar Compra
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            <style jsx>{`
        .mini-cart-container {
          position: relative;
        }
        
        .cart-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        
        .cart-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .cart-icon {
          position: relative;
        }
        
        .cart-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: var(--primary-color, #3b82f6);
          color: white;
          border-radius: 50%;
          min-width: 20px;
          height: 20px;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .mini-cart {
          position: absolute;
          top: 100%;
          right: 0;
          width: 320px;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          overflow: hidden;
          animation: slideDown 0.3s ease;
        }
        
        .mini-cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .mini-cart-header h3 {
          margin: 0;
          font-size: 1.1rem;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
        
        .close-button:hover {
          background-color: #f1f5f9;
          color: #1e293b;
        }
        
        .mini-cart-empty {
          padding: 2rem 1rem;
          text-align: center;
          color: #64748b;
        }
        
        .shop-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: var(--primary-color, #3b82f6);
          text-decoration: underline;
        }
        
        .mini-cart-items {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .mini-cart-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .item-image {
          width: 50px;
          height: 50px;
          border-radius: 0.25rem;
          overflow: hidden;
          margin-right: 1rem;
          background-color: #f1f5f9;
        }
        
        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .item-details {
          flex: 1;
        }
        
        .item-details h4 {
          margin: 0 0 0.25rem;
          font-size: 0.95rem;
        }
        
        .item-price {
          margin: 0;
          font-size: 0.85rem;
          color: #64748b;
        }
        
        .remove-item {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-size: 0.8rem;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .remove-item:hover {
          background-color: #fee2e2;
          color: #ef4444;
        }
        
        .mini-cart-footer {
          padding: 1rem;
          border-top: 1px solid #e2e8f0;
        }
        
        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .cart-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .view-cart,
        .checkout {
          padding: 0.5rem 1rem;
          text-align: center;
          border-radius: 0.25rem;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .view-cart {
          flex: 1;
          background-color: transparent;
          border: 1px solid var(--primary-color, #3b82f6);
          color: var(--primary-color, #3b82f6);
        }
        
        .view-cart:hover {
          background-color: rgba(59, 130, 246, 0.05);
        }
        
        .checkout {
          flex: 2;
          background-color: var(--primary-color, #3b82f6);
          color: white;
          border: none;
        }
        
        .checkout:hover {
          background-color: var(--secondary-color, #1e40af);
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsividade para mobile */
        @media (max-width: 640px) {
          .mini-cart {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 90%;
            max-width: 320px;
            border-radius: 0;
            animation: slideInRight 0.3s ease;
            display: flex;
            flex-direction: column;
          }
          
          .mini-cart-items {
            flex: 1;
            overflow-y: auto;
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        }
      `}</style>
        </div>
    );
};

export default MiniCart;