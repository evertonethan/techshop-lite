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
    return <div className={styles.filterContainer}>Carregando filtros...</div>;
  }

  return (
    <div className={styles.filterContainer}>
      <span className={styles.filterLabel}>Filtrar por categoria:</span>
      <div className="flex flex-wrap gap-2">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`${styles.filterButton} ${
              categoriaAtual === categoria ? styles.activeFilter : ''
            }`}
            onClick={() => onFiltroChange(categoria)}
          >
            {categoria === 'todas' ? 'Todas' : categoria}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filtros;