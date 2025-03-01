import Link from 'next/link';
import { config } from '../utils/config';

const Header = () => {
  return (
    <header className="py-4 bg-white shadow-sm">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary-color)' }}>{config.appName}</span>
          </div>
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="hover:text-primary">
                Produtos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;