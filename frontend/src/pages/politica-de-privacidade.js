import Head from 'next/head';
import { config } from '../utils/config';

export default function PoliticaPrivacidade() {
    return (
        <>
            <Head>
                <title>Política de Privacidade | {config.appName}</title>
                <meta name="description" content="Política de privacidade e termos de uso" />
            </Head>

            <div className="container">
                <div className="policy-page">
                    <h1>Política de Privacidade</h1>

                    <div className="policy-content">
                        <div className="policy-section">
                            <h2>1. Introdução</h2>
                            <p>
                                Bem-vindo à política de privacidade da {config.appName}. Esta é uma loja virtual demonstrativa
                                e as informações abaixo são apenas para fins ilustrativos de um projeto de portfólio.
                            </p>
                            <p>
                                Esta política descreve como seriam coletadas, usadas e compartilhadas suas informações
                                pessoais caso este fosse um site real em operação.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>2. Informações que Coletamos</h2>
                            <p>Em um e-commerce real, poderíamos coletar os seguintes tipos de informações:</p>

                            <h3>2.1. Informações Pessoais</h3>
                            <ul>
                                <li>Nome completo</li>
                                <li>Endereço de e-mail</li>
                                <li>Número de telefone</li>
                                <li>Endereço para entrega</li>
                                <li>Informações de pagamento (processadas de forma segura pelo Stripe)</li>
                            </ul>

                            <h3>2.2. Informações de Uso</h3>
                            <ul>
                                <li>Páginas visitadas</li>
                                <li>Produtos visualizados</li>
                                <li>Tempo gasto no site</li>
                                <li>Interações com o site</li>
                            </ul>

                            <h3>2.3. Informações Técnicas</h3>
                            <ul>
                                <li>Endereço IP</li>
                                <li>Tipo de navegador</li>
                                <li>Sistema operacional</li>
                                <li>Informações do dispositivo</li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>3. Como Usamos Suas Informações</h2>
                            <p>As informações coletadas seriam utilizadas para:</p>
                            <ul>
                                <li>Processar pedidos e transações</li>
                                <li>Melhorar nossos produtos e serviços</li>
                                <li>Personalizar sua experiência de compra</li>
                                <li>Enviar comunicações sobre pedidos e atualizações</li>
                                <li>Prevenção de fraudes e segurança</li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>4. Compartilhamento de Informações</h2>
                            <p>
                                Em um e-commerce real, as informações poderiam ser compartilhadas com terceiros
                                nas seguintes circunstâncias:
                            </p>
                            <ul>
                                <li>Processadores de pagamento (como o Stripe)</li>
                                <li>Serviços de entrega para envio de produtos</li>
                                <li>Serviços de análise para melhorar o desempenho do site</li>
                                <li>Quando exigido por lei ou para proteger nossos direitos</li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>5. Segurança de Dados</h2>
                            <p>
                                A segurança das suas informações é importante para nós. Implementaríamos medidas
                                técnicas e organizacionais adequadas para proteger suas informações pessoais contra
                                perda, uso indevido ou alteração.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>6. Seus Direitos</h2>
                            <p>Dependendo da sua localização, você poderia ter direitos como:</p>
                            <ul>
                                <li>Acesso às suas informações pessoais</li>
                                <li>Correção de informações imprecisas</li>
                                <li>Exclusão de suas informações</li>
                                <li>Objeção ao processamento de suas informações</li>
                                <li>Portabilidade de dados</li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>7. Cookies e Tecnologias Semelhantes</h2>
                            <p>
                                Utilizaríamos cookies e tecnologias semelhantes para melhorar sua experiência,
                                lembrar suas preferências e entender como os visitantes usam nosso site.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>8. Alterações a Esta Política</h2>
                            <p>
                                Poderíamos atualizar esta política periodicamente para refletir mudanças em nossas
                                práticas ou por outros motivos operacionais, legais ou regulatórios.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>9. Contato</h2>
                            <p>
                                Para quaisquer dúvidas ou preocupações sobre esta política de privacidade,
                                entre em contato conosco em: <a href="mailto:contato@ecommerce.com">contato@ecommerce.com</a>
                            </p>
                        </div>

                        <div className="policy-footer">
                            <p>Última atualização: 01 de Março de 2025</p>
                            <p>
                                <strong>Lembrete:</strong> Este é um site de demonstração criado para fins de portfólio.
                                Nenhuma informação pessoal real é coletada ou processada.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .policy-page {
          padding: 3rem 0;
          max-width: 800px;
          margin: 0 auto;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .policy-content {
          background-color: white;
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .policy-section {
          margin-bottom: 2.5rem;
        }
        
        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--primary-color);
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        h3 {
          font-size: 1.2rem;
          margin: 1.5rem 0 0.75rem;
        }
        
        p, ul {
          margin-bottom: 1rem;
          line-height: 1.6;
          color: var(--text-light);
        }
        
        ul {
          padding-left: 1.5rem;
        }
        
        li {
          margin-bottom: 0.5rem;
        }
        
        a {
          color: var(--primary-color);
          text-decoration: none;
        }
        
        a:hover {
          text-decoration: underline;
        }
        
        .policy-footer {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        @media (max-width: 768px) {
          .policy-content {
            padding: 1.5rem;
          }
          
          h2 {
            font-size: 1.3rem;
          }
          
          h3 {
            font-size: 1.1rem;
          }
        }
      `}</style>
        </>
    );
}