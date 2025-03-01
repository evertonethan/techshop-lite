import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getProdutos } from '../utils/api';
import ProdutoCard from '../components/ProdutoCard';
import Filtros from '../components/Filtros';
import styles from '../styles/Home.module.css';


export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Head>
        <title>E-commerce Stripe | Produtos</title>
        <meta name="description" content="E-commerce simples com integração Stripe" />
      </Head>

      <div className="container">
        <div className={styles.main}>
          <h1 className={styles.title}>Nossos Produtos</h1>
          
          <Filtros 
            onFiltroChange={handleFiltroChange} 
            categoriaAtual={categoriaFiltro} 
          />
          
          {loading ? (
            <div className="flex justify-center my-8">Carregando produtos...</div>
          ) : produtos.length === 0 ? (
            <div className="flex justify-center my-8">
              Nenhum produto encontrado para esta categoria.
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {produtos.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}