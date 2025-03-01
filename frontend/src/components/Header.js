import { useState, useEffect } from 'react';
import Link from 'next/link';
import { config } from '../utils/config';
import MiniCart from './MiniCart';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  // Monitora o scroll para mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
    >
      <div className="navbar-container">
        <Link href="/">
          <div className="navbar-logo">
            <span className="logo-text">{config.appName}</span>
          </div>
        </Link>

        {/* Ícone do menu hamburguer para mobile */}
        <div
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navegação - aparece diferente no mobile */}
        <nav className={`navbar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link href="/" className="navbar-link">
                Produtos
              </Link>
            </li>
            <li className="navbar-item">
              <Link href="/#categorias" className="navbar-link">
                Categorias
              </Link>
            </li>
            <li className="navbar-item">
              <Link href="/#sobre" className="navbar-link">
                Sobre
              </Link>
            </li>
            <li className="navbar-item navbar-item-cart">
              <Link href="/carrinho" className="navbar-cart-link">
                <span className="cart-icon">🛒</span>
                <span className="cart-text">Carrinho</span>
                {getCartItemsCount() > 0 && (
                  <span className="cart-badge">{getCartItemsCount()}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* MiniCart apenas visível em telas maiores */}
        <div className="mini-cart-wrapper">
          <MiniCart />
        </div>
      </div>

      {/* Estilos embutidos para o componente */}
      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 1rem 0;
        }
        
        .navbar-scrolled {
          padding: 0.5rem 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .navbar-logo {
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .navbar-logo:hover {
          transform: scale(1.05);
        }
        
        .logo-text {
          color: var(--primary-color);
          font-size: 1.75rem;
          font-weight: bold;
          letter-spacing: -0.5px;
        }
        
        .navbar-nav {
          display: flex;
          align-items: center;
        }
        
        .navbar-menu {
          display: flex;
          list-style: none;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        
        .navbar-item {
          position: relative;
        }
        
        .navbar-link {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
          transition: color 0.3s ease;
        }
        
        .navbar-link:hover {
          color: var(--primary-color);
        }
        
        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }
        
        .navbar-link:hover::after {
          width: 100%;
        }
        
        .navbar-cart-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
        }
        
        .cart-icon {
          font-size: 1.25rem;
        }
        
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: var(--primary-color);
          color: white;
          border-radius: 50%;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
        }
        
        .mini-cart-wrapper {
          display: none;
        }
        
        .mobile-menu-button {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          cursor: pointer;
        }
        
        .mobile-menu-button span {
          display: block;
          width: 100%;
          height: 3px;
          background-color: var(--text-color);
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        
        /* Estilos responsivos */
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: flex;
            z-index: 1001;
          }
          
          .navbar-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background-color: white;
            flex-direction: column;
            justify-content: center;
            transition: right 0.3s ease;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          }
          
          .navbar-nav.mobile-open {
            right: 0;
          }
          
          .navbar-menu {
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 2rem 0;
          }
          
          .navbar-item {
            width: 100%;
            text-align: center;
            margin: 0.5rem 0;
          }
          
          .navbar-link {
            display: block;
            padding: 1rem 0;
          }
          
          /* Esconde o minicart no mobile */
          .navbar-item-cart {
            display: flex;
          }
          
          /* Animação do menu hamburguer para X quando aberto */
          .mobile-open + .mobile-menu-button span:first-child {
            transform: rotate(45deg) translate(5px, 5px);
          }
          
          .mobile-open + .mobile-menu-button span:nth-child(2) {
            opacity: 0;
          }
          
          .mobile-open + .mobile-menu-button span:last-child {
            transform: rotate(-45deg) translate(6px, -6px);
          }
        }
        
        @media (min-width: 769px) {
          .navbar-item-cart {
            display: none;
          }
          
          .mini-cart-wrapper {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;