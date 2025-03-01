import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Cancelado() {
  return (
    <>
      <Head>
        <title>Pagamento Cancelado | TechShop Lite</title>
      </Head>
      <div className="container">
        <div className={styles.cancelPage}>
          <div className={styles.errorIcon}>✕</div>
          <h1 className={styles.title}>Pagamento Cancelado</h1>
          <p className={styles.messageText}>
            Seu pagamento foi cancelado. Nenhum valor foi cobrado.
          </p>
          <Link href="/" className="btn btn-primary mt-4">
            Voltar para a loja
          </Link>
        </div>
      </div>
    </>
  );
}