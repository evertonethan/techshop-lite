import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const router = useRouter();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
    });

    // Redirecionar para a página de carrinho se estiver vazio
    useEffect(() => {
        if (cartItems.length === 0) {
            router.push('/carrinho');
        }
    }, [cartItems, router]);

    // Formatação de preço em Real
    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(preco);
    };

    // Atualizar dados do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submeter formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        try {
            setLoading(true);

            // Aqui em um ambiente real, enviaríamos os dados para o servidor
            // para criar uma sessão de checkout do Stripe com todos os itens

            // Simulação de checkout
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Limpar o carrinho
            clearCart();

            // Redirecionar para a página de sucesso
            router.push('/sucesso');

        } catch (error) {
            console.error('Erro ao processar checkout:', error);
            alert('Ocorreu um erro ao processar o seu pagamento. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return <div className="loading">Redirecionando...</div>;
    }

    return (
        <>
            <Head>
                <title>Checkout | E-commerce Stripe</title>
                <meta name="description" content="Finalize sua compra" />
            </Head>

            <div className="container">
                <div className="checkout-page">
                    <h1>Finalizar Compra</h1>

                    <div className="checkout-container">
                        <div className="checkout-form-container">
                            <form onSubmit={handleSubmit} className="checkout-form">
                                <h2>Informações de Contato</h2>

                                <div className="form-group">
                                    <label htmlFor="nome">Nome Completo</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="telefone">Telefone</label>
                                        <input
                                            type="tel"
                                            id="telefone"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <h2>Endereço de Entrega</h2>

                                <div className="form-group">
                                    <label htmlFor="endereco">Endereço</label>
                                    <input
                                        type="text"
                                        id="endereco"
                                        name="endereco"
                                        value={formData.endereco}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="cidade">Cidade</label>
                                        <input
                                            type="text"
                                            id="cidade"
                                            name="cidade"
                                            value={formData.cidade}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="estado">Estado</label>
                                        <select
                                            id="estado"
                                            name="estado"
                                            value={formData.estado}
                                            onChange={handleInputChange}
                                            required
                                            className="form-select"
                                        >
                                            <option value="">Selecione</option>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cep">CEP</label>
                                        <input
                                            type="text"
                                            id="cep"
                                            name="cep"
                                            value={formData.cep}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="checkout-note">
                                    <p>
                                        <span role="img" aria-label="info">ℹ️</span> Este é um checkout de demonstração. Nenhum cartão será cobrado.
                                    </p>
                                </div>

                                <div className="checkout-actions">
                                    <Link href="/carrinho" className="back-button">
                                        Voltar para o Carrinho
                                    </Link>

                                    <button
                                        type="submit"
                                        className="checkout-button"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Processando...
                                            </>
                                        ) : 'Finalizar Pedido'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="checkout-summary">
                            <div className="summary-header">
                                <h2>Resumo do Pedido</h2>
                                <span>{cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}</span>
                            </div>

                            <ul className="summary-items">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="summary-item">
                                        <div className="item-info">
                                            <span className="item-quantity">{item.quantity}x</span>
                                            <span className="item-name">{item.nome}</span>
                                        </div>
                                        <span className="item-price">
                                            {formatarPreco(item.preco * item.quantity)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="summary-totals">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>{formatarPreco(getCartTotal())}</span>
                                </div>
                                <div className="total-row">
                                    <span>Frete</span>
                                    <span>Grátis</span>
                                </div>
                                <div className="total-row grand-total">
                                    <span>Total</span>
                                    <span>{formatarPreco(getCartTotal())}</span>
                                </div>
                            </div>

                            <div className="payment-methods">
                                <h3>Métodos de Pagamento</h3>
                                <div className="payment-icons">
                                    <span className="payment-icon">💳</span>
                                    <span className="payment-icon">💵</span>
                                    <span className="payment-icon">🏦</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .checkout-page {
          padding: 2rem 0;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .checkout-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }
        
        .checkout-form-container {
          flex: 3;
          min-width: 300px;
        }
        
        .checkout-form {
          background-color: white;
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        h2 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .form-row .form-group {
          flex: 1;
          min-width: 250px;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .form-input,
        .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: all 0.3s;
        }
        
        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        .checkout-note {
          background-color: #f8fafc;
          border-radius: 0.375rem;
          padding: 1rem;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          color: #64748b;
        }
        
        .checkout-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .back-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          background-color: white;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
          border-radius: 0.375rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s;
        }
        
        .back-button:hover {
          background-color: #f1f5f9;
        }
        
        .checkout-button {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .checkout-button:hover {
          background-color: var(--secondary-color);
        }
        
        .checkout-button:disabled {
          opacity: 0.7;
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
        
        .checkout-summary {
          flex: 2;
          min-width: 300px;
          background-color: white;
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          align-self: flex-start;
        }
        
        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .summary-header h2 {
          margin: 0;
          padding: 0;
          border: none;
        }
        
        .summary-items {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .item-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .item-quantity {
          color: #64748b;
          font-weight: 500;
        }
        
        .item-price {
          font-weight: 500;
        }
        
        .summary-totals {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        
        .grand-total {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        .payment-methods {
          margin-top: 2rem;
        }
        
        .payment-methods h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        
        .payment-icons {
          display: flex;
          gap: 1rem;
        }
        
        .payment-icon {
          font-size: 1.5rem;
        }
        
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          font-size: 1.2rem;
          color: #64748b;
        }
        
        @media (max-width: 768px) {
          .checkout-container {
            flex-direction: column-reverse;
          }
          
          .checkout-actions {
            flex-direction: column;
          }
          
          .back-button,
          .checkout-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
        </>
    );
};

export default Checkout;