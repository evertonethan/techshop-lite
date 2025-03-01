import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getProdutos } from '../utils/api';
import ProdutoCard from '../components/ProdutoCard';
import Filtros from '../components/Filtros';
import Loading from '../components/Loading';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        const data = await getProdutos(categoriaFiltro);
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [categoriaFiltro]);

  const handleFiltroChange = (categoria) => {
    setCategoriaFiltro(categoria);
  };

  // Filtragem por busca
  const produtosFiltrados = searchTerm
    ? produtos.filter(produto =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : produtos;

  return (
    <>
      <Head>
        <title>E-commerce Stripe | Produtos</title>
        <meta name="description" content="E-commerce simples com integração Stripe" />
      </Head>

      <div className="container">
        <div className={styles.main}>
          <div className={styles.heroSection}>
            <h1 className={styles.title}>Loja Virtual</h1>
            <p className={styles.subtitle}>Produtos de qualidade com entrega rápida</p>

            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--light-gray)',
                  fontSize: '1rem',
                  marginBottom: '1.5rem',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
          </div>

          <Filtros
            onFiltroChange={handleFiltroChange}
            categoriaAtual={categoriaFiltro}
          />

          {loading ? (
            <Loading />
          ) : produtosFiltrados.length === 0 ? (
            <div className="flex flex-col justify-center items-center my-8 p-8 bg-gray-50 rounded-lg">
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Nenhum produto encontrado</h3>
              <p style={{ color: 'var(--dark-gray)' }}>
                {searchTerm
                  ? `Não encontramos produtos para "${searchTerm}". Tente outra busca.`
                  : 'Não há produtos disponíveis nesta categoria.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-outline mt-4"
                >
                  Limpar busca
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center my-4">
                <p className={styles.resultsCount}>
                  {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className={styles.productsGrid}>
                {produtosFiltrados.map((produto) => (
                  <ProdutoCard key={produto.id} produto={produto} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}