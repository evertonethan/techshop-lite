import Link from 'next/link';
import { config } from '../utils/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link href="/">
              <span className="logo-text">{config.appName}</span>
            </Link>
            <p className="footer-slogan">
              Loja virtual com produtos de qualidade
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h3>Navegação</h3>
              <ul>
                <li><Link href="/">Início</Link></li>
                <li><Link href="/carrinho">Carrinho</Link></li>
                <li><Link href="/#categorias">Categorias</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Sobre</h3>
              <ul>
                <li><Link href="/sobre">Nossa Empresa</Link></li>
                <li><Link href="/politica-de-privacidade">Política de Privacidade</Link></li>
                <li><Link href="/termos-de-uso">Termos de Uso</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contato</h3>
              <ul>
                <li><a href="mailto:contato@ecommerce.com">contato@ecommerce.com</a></li>
                <li><a href="tel:+551199999999">(11) 9999-9999</a></li>
                <li className="social-links">
                  <a href="#" className="social-link">📱</a>
                  <a href="#" className="social-link">📘</a>
                  <a href="#" className="social-link">📸</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} {config.appName}. Todos os direitos reservados.</p>
          <p className="footer-disclaimer">Este é um projeto demonstrativo para portfólio com pagamentos em modo Sandbox.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 3rem 0 1.5rem;
          margin-top: 3rem;
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-logo {
          flex: 1;
          min-width: 250px;
        }
        
        .logo-text {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .footer-slogan {
          margin-top: 1rem;
          color: #94a3b8;
          font-size: 0.9rem;
        }
        
        .footer-links {
          display: flex;
          flex: 2;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: space-between;
        }
        
        .footer-section {
          min-width: 150px;
        }
        
        .footer-section h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: white;
          position: relative;
        }
        
        .footer-section h3::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 50px;
          height: 2px;
          background-color: var(--primary-color);
        }
        
        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-section li {
          margin-bottom: 0.75rem;
        }
        
        .footer-section a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-section a:hover {
          color: white;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transition: background-color 0.3s;
        }
        
        .social-link:hover {
          background-color: var(--primary-color);
        }
        
        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          color: #94a3b8;
          font-size: 0.85rem;
        }
        
        .footer-disclaimer {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          opacity: 0.7;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 2rem;
          }
          
          .footer-links {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;