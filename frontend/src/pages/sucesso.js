import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Sucesso() {
  return (
    <>
      <Head>
        <title>Pagamento Confirmado | E-commerce Stripe</title>
      </Head>
      <div className="container">
        <div className={styles.successPage}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.title}>Pagamento Confirmado!</h1>
          <p className={styles.messageText}>
            Seu pedido foi processado com sucesso. Obrigado por comprar conosco!
          </p>
          <p>
            Caso fosse um e-commerce real, você receberia um e-mail com os detalhes do pedido.
          </p>
          <Link href="/" className="btn btn-primary mt-4">
            Voltar para a loja
          </Link>
        </div>
      </div>
    </>
  );
}