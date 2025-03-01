import Head from 'next/head';
import Link from 'next/link';
import { config } from '../utils/config';

export default function Sobre() {
    return (
        <>
            <Head>
                <title>Sobre | {config.appName}</title>
                <meta name="description" content="Conheça mais sobre a nossa loja" />
            </Head>

            <div className="container">
                <div className="about-page">
                    <div className="about-header">
                        <h1>Sobre a {config.appName}</h1>
                        <div className="subtitle">Projeto demonstrativo de e-commerce com integração Stripe em modo sandbox</div>
                    </div>

                    <div className="about-content">
                        <section className="about-section">
                            <h2>Nossa Missão</h2>
                            <p>
                                Este projeto foi criado como uma demonstração técnica de um e-commerce
                                funcional com sistema de pagamentos integrado. Desenvolvido utilizando
                                as melhores práticas e tecnologias modernas para showcasing de habilidades
                                em desenvolvimento web.
                            </p>
                            <p>
                                Nosso objetivo é demonstrar uma implementação simples mas completa de
                                um sistema de loja virtual, destacando principalmente a integração com
                                a API de pagamentos Stripe em modo sandbox.
                            </p>
                        </section>

                        <section className="about-section">
                            <h2>Tecnologias Utilizadas</h2>
                            <div className="tech-grid">
                                <div className="tech-card">
                                    <div className="tech-icon">⚛️</div>
                                    <h3>Frontend</h3>
                                    <ul>
                                        <li>React.js com Next.js</li>
                                        <li>Server-Side Rendering</li>
                                        <li>CSS Moderno (Flexbox/Grid)</li>
                                        <li>Design Responsivo</li>
                                    </ul>
                                </div>

                                <div className="tech-card">
                                    <div className="tech-icon">🔌</div>
                                    <h3>Backend</h3>
                                    <ul>
                                        <li>Node.js com Express.js</li>
                                        <li>API RESTful</li>
                                        <li>Arquitetura MVC</li>
                                        <li>Hospedagem Serverless</li>
                                    </ul>
                                </div>

                                <div className="tech-card">
                                    <div className="tech-icon">💳</div>
                                    <h3>Pagamentos</h3>
                                    <ul>
                                        <li>Stripe API (Modo Sandbox)</li>
                                        <li>Checkout Seguro</li>
                                        <li>Sistema de Carrinho</li>
                                        <li>Gestão de Pedidos</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="about-section">
                            <h2>Funcionalidades</h2>
                            <div className="features">
                                <div className="feature">
                                    <div className="feature-icon">🛍️</div>
                                    <div>
                                        <h3>Catálogo de Produtos</h3>
                                        <p>Produtos organizados por categorias com detalhes e imagens.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">🛒</div>
                                    <div>
                                        <h3>Carrinho de Compras</h3>
                                        <p>Adicione produtos, ajuste quantidades e visualize totais.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">🔍</div>
                                    <div>
                                        <h3>Busca e Filtros</h3>
                                        <p>Encontre rapidamente produtos com filtros por categoria.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">💰</div>
                                    <div>
                                        <h3>Checkout Simplificado</h3>
                                        <p>Processo de finalização de compra intuitivo com Stripe.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">📱</div>
                                    <div>
                                        <h3>Design Responsivo</h3>
                                        <p>Interface adaptável a qualquer dispositivo, do desktop ao mobile.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">🔒</div>
                                    <div>
                                        <h3>Segurança</h3>
                                        <p>Integração segura com sistema de pagamentos.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="about-section project-info">
                            <h2>Informações do Projeto</h2>
                            <p>
                                Este é um projeto de demonstração criado para portfólio. O código-fonte
                                está disponível no GitHub e pode ser usado como referência para
                                implementações similares.
                            </p>
                            <p>
                                <strong>Importante:</strong> Este site opera em modo sandbox, o que significa
                                que nenhum pagamento real é processado e nenhum produto é realmente enviado.
                            </p>

                            <div className="cta">
                                <Link href="/" className="btn primary">
                                    Ver Produtos
                                </Link>
                                <a href="#" className="btn secondary">
                                    Ver Código no GitHub
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .about-page {
          padding: 40px 0 60px;
        }
        
        .about-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .about-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--primary-color);
        }
        
        .subtitle {
          font-size: 1.2rem;
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .about-content {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .about-section {
          margin-bottom: 60px;
          background-color: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .about-section h2 {
          font-size: 1.75rem;
          margin-bottom: 20px;
          color: var(--text-color);
          position: relative;
          padding-bottom: 10px;
        }
        
        .about-section h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: var(--primary-color);
        }
        
        .about-section p {
          margin-bottom: 16px;
          line-height: 1.6;
          color: var(--text-light);
        }
        
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        
        .tech-card {
          border: 1px solid var(--light-gray);
          border-radius: 8px;
          padding: 25px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .tech-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .tech-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }
        
        .tech-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: var(--primary-color);
        }
        
        .tech-card ul {
          padding-left: 20px;
          margin: 0;
        }
        
        .tech-card li {
          margin-bottom: 8px;
          color: var(--text-light);
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }
        
        .feature {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }
        
        .feature-icon {
          font-size: 2rem;
          min-width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(59, 130, 246, 0.1);
          color: var(--primary-color);
          border-radius: 8px;
        }
        
        .feature h3 {
          font-size: 1.1rem;
          margin-bottom: 8px;
          color: var(--text-color);
        }
        
        .feature p {
          font-size: 0.95rem;
          margin: 0;
          color: var(--text-light);
        }
        
        .project-info {
          text-align: center;
          padding: 40px;
        }
        
        .project-info h2 {
          position: relative;
          display: inline-block;
          margin-bottom: 30px;
        }
        
        .project-info h2:after {
          left: 50%;
          transform: translateX(-50%);
        }
        
        .cta {
          margin-top: 30px;
          display: flex;
          gap: 15px;
          justify-content: center;
        }
        
        .btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .btn.primary {
          background-color: var(--primary-color);
          color: white;
        }
        
        .btn.primary:hover {
          background-color: var(--secondary-color);
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .btn.secondary {
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          background-color: white;
        }
        
        .btn.secondary:hover {
          background-color: rgba(59, 130, 246, 0.05);
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 768px) {
          .about-header h1 {
            font-size: 2rem;
          }
          
          .about-section {
            padding: 20px;
          }
          
          .tech-grid {
            grid-template-columns: 1fr;
          }
          
          .features {
            grid-template-columns: 1fr;
          }
          
          .cta {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
        </>
    );
}