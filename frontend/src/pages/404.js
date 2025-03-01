import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>Página não encontrada | E-commerce Stripe</title>
                <meta name="description" content="Página não encontrada" />
            </Head>

            <div className="error-page">
                <div className="error-container">
                    <div className="error-icon">404</div>
                    <h1>Página não encontrada</h1>
                    <p>Desculpe, a página que você está procurando não existe ou foi movida.</p>

                    <div className="error-actions">
                        <Link href="/" className="action-button primary">
                            Voltar para a Página Inicial
                        </Link>
                        <Link href="/carrinho" className="action-button secondary">
                            Ver Carrinho
                        </Link>
                    </div>

                    <div className="suggestion-section">
                        <h2>Talvez você esteja procurando por:</h2>
                        <ul className="suggestion-links">
                            <li>
                                <Link href="/">
                                    <span className="suggestion-icon">🏠</span>
                                    <span>Página Inicial</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/carrinho">
                                    <span className="suggestion-icon">🛒</span>
                                    <span>Carrinho de Compras</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre">
                                    <span className="suggestion-icon">ℹ️</span>
                                    <span>Sobre Nós</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .error-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .error-container {
          max-width: 600px;
          width: 100%;
          text-align: center;
          background-color: white;
          border-radius: 1rem;
          padding: 3rem 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        
        .error-icon {
          font-size: 8rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--text-color);
        }
        
        p {
          color: var(--text-light);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        
        .error-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .action-button {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .action-button.primary {
          background-color: var(--primary-color);
          color: white;
        }
        
        .action-button.primary:hover {
          background-color: var(--secondary-color);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .action-button.secondary {
          background-color: white;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
        }
        
        .action-button.secondary:hover {
          background-color: rgba(59, 130, 246, 0.05);
          transform: translateY(-3px);
        }
        
        .suggestion-section {
          border-top: 1px solid var(--light-gray);
          padding-top: 2rem;
          max-width: 400px;
          margin: 0 auto;
        }
        
        h2 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--text-color);
        }
        
        .suggestion-links {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .suggestion-links a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          color: var(--text-color);
          transition: all 0.2s ease;
        }
        
        .suggestion-links a:hover {
          background-color: rgba(59, 130, 246, 0.05);
          transform: translateX(5px);
        }
        
        .suggestion-icon {
          font-size: 1.5rem;
        }
        
        @media (max-width: 640px) {
          .error-actions {
            flex-direction: column;
          }
          
          .error-icon {
            font-size: 6rem;
          }
          
          h1 {
            font-size: 1.75rem;
          }
        }
      `}</style>
        </>
    );
}