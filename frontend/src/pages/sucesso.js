import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import styles from '../styles/Home.module.css';

export default function Sucesso() {
  const router = useRouter();
  const { sessionId } = router.query;
  const { clearCart } = useCart();

  // Limpar o carrinho quando o usuário chegar nesta página
  useEffect(() => {
    if (sessionId) {
      // Se tiver um session_id, poderíamos verificar com o servidor
      // para confirmar que o pagamento foi bem-sucedido antes de limpar
      // o carrinho, mas para simplificar, vamos limpar de qualquer forma
      clearCart();
    } else {
      // Mesmo sem session_id, vamos limpar o carrinho 
      // já que o usuário chegou na página de sucesso
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <>
      <Head>
        <title>Pagamento Confirmado | E-commerce Stripe</title>
        <meta name="description" content="Seu pagamento foi confirmado com sucesso" />
      </Head>

      <div className="container">
        <div className="success-page">
          <div className="success-icon">✓</div>
          <h1>Pagamento Confirmado!</h1>

          <div className="order-details">
            <p className="message-text">
              Seu pedido foi processado com sucesso. Obrigado por comprar conosco!
            </p>

            <div className="confirmation-details">
              {sessionId && (
                <p className="session-info">
                  Código da transação: <span className="session-id">{sessionId}</span>
                </p>
              )}
              <p>
                Um e-mail de confirmação foi enviado com os detalhes do seu pedido.
              </p>
            </div>
          </div>

          <div className="next-steps">
            <h2>O que acontece agora?</h2>
            <ol className="steps-list">
              <li>
                <span className="step-number">1</span>
                <div className="step-content">
                  <h3>Preparação</h3>
                  <p>Seu pedido está sendo processado por nossa equipe</p>
                </div>
              </li>
              <li>
                <span className="step-number">2</span>
                <div className="step-content">
                  <h3>Envio</h3>
                  <p>Seus produtos serão enviados em breve</p>
                </div>
              </li>
              <li>
                <span className="step-number">3</span>
                <div className="step-content">
                  <h3>Entrega</h3>
                  <p>Receba seu pedido no endereço fornecido</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="action-buttons">
            <Link href="/" className="btn-primary">
              Continuar Comprando
            </Link>
          </div>

          <div className="demo-notice">
            <p>
              <strong>Nota:</strong> Esta é uma loja demonstrativa.
              Nenhum valor foi realmente cobrado e nenhum produto será enviado.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .success-page {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 1rem;
        }
        
        .success-icon {
          background-color: var(--success-color, #10b981);
          color: white;
          width: 80px;
          height: 80px;
          font-size: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.2);
        }
        
        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: var(--text-color);
        }
        
        .order-details {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .message-text {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--text-color);
        }
        
        .confirmation-details {
          padding: 1rem;
          background-color: #f8fafc;
          border-radius: 6px;
          font-size: 0.95rem;
          color: var(--text-light);
        }
        
        .session-info {
          margin-bottom: 0.5rem;
        }
        
        .session-id {
          font-family: monospace;
          background-color: #e2e8f0;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .next-steps {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          text-align: left;
        }
        
        .next-steps h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          color: var(--text-color);
        }
        
        .steps-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .steps-list li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }
        
        .step-number {
          background-color: var(--primary-color);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        
        .step-content {
          flex: 1;
        }
        
        .step-content h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
        }
        
        .step-content p {
          margin: 0;
          color: var(--text-light);
        }
        
        .action-buttons {
          margin-bottom: 2rem;
        }
        
        .btn-primary {
          display: inline-block;
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          background-color: var(--secondary-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .demo-notice {
          background-color: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: 6px;
          padding: 1rem;
          font-size: 0.9rem;
          color: #92400e;
        }
        
        @media (max-width: 640px) {
          h1 {
            font-size: 1.8rem;
          }
          
          .success-icon {
            width: 60px;
            height: 60px;
            font-size: 30px;
          }
          
          .next-steps, .order-details {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}