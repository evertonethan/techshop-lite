import { config } from '../utils/config';

const Footer = () => {
  return (
    <footer className="py-4 bg-white shadow-sm mt-auto">
      <div className="container">
        <div className="flex justify-center items-center">
          <p>{config.footerText}</p>
        </div>
        <div className="flex justify-center items-center mt-2 text-sm text-gray-500">
          <p>Este é um projeto de demonstração com Stripe em modo sandbox</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;