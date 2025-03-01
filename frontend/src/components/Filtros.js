import { useState, useEffect } from 'react';
import { getCategorias } from '../utils/api';
import styles from '../styles/Home.module.css';

const Filtros = ({ onFiltroChange, categoriaAtual }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(['todas', ...data]);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarCategorias();
  }, []);

  if (loading) {
    return <div className={styles.filterContainer}>
      <div style={{ width: '20px', height: '20px', border: '2px solid #ddd', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <span style={{ marginLeft: '10px' }}>Carregando...</span>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>;
  }

  return (
    <div className={styles.filterContainer}>
      <span className={styles.filterLabel} style={{ fontWeight: '600', fontSize: '0.9rem' }}>
        Filtrar por:
      </span>
      <div className="flex flex-wrap gap-2">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`${styles.filterButton} ${categoriaAtual === categoria ? styles.activeFilter : ''
              }`}
            onClick={() => onFiltroChange(categoria)}
            style={{
              transition: 'all 0.2s ease',
              transform: categoriaAtual === categoria ? 'scale(1.05)' : 'scale(1)',
              boxShadow: categoriaAtual === categoria ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {categoria === 'todas' ? 'Todas as categorias' : categoria}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filtros;