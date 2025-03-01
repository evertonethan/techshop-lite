import Link from 'next/link';
import { config } from '../utils/config';
import { useState } from 'react';

const Header = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <header className="py-4 bg-white shadow-sm sticky top-0 z-10" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div className="container flex justify-between items-center">
        <Link href="/">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'transform 0.3s ease',
              transform: isLogoHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <span style={{
              color: 'var(--primary-color)',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              letterSpacing: '-0.5px'
            }}>
              {config.appName}
            </span>
          </div>
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <NavLink href="/">
                Produtos
              </NavLink>
            </li>
            <li>
              <NavLink href="/#categorias">
                Categorias
              </NavLink>
            </li>
            <li>
              <NavLink href="/#sobre">
                Sobre
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Componente interno para links de navegação com efeito hover
const NavLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <span
        style={{
          position: 'relative',
          padding: '0.5rem 0',
          cursor: 'pointer',
          fontWeight: '500',
          color: isHovered ? 'var(--primary-color)' : 'var(--text-color)',
          transition: 'color 0.3s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: isHovered ? '100%' : '0%',
            height: '2px',
            backgroundColor: 'var(--primary-color)',
            transition: 'width 0.3s ease'
          }}
        />
      </span>
    </Link>
  );
};

export default Header;