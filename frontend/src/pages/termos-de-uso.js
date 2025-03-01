import Head from 'next/head';
import { config } from '../utils/config';

export default function TermosDeUso() {
    return (
        <>
            <Head>
                <title>Termos de Uso | {config.appName}</title>
                <meta name="description" content="Termos de uso e condições" />
            </Head>

            <div className="container">
                <div className="terms-page">
                    <h1>Termos de Uso</h1>

                    <div className="terms-content">
                        <div className="terms-section">
                            <h2>1. Introdução</h2>
                            <p>
                                Bem-vindo aos termos de uso da {config.appName}. Estes termos definem as regras e regulamentos
                                para o uso deste site demonstrativo.
                            </p>
                            <p>
                                <strong>Importante:</strong> Este é um site de demonstração criado para fins de portfólio.
                                Nenhuma venda real é realizada e nenhum produto é realmente entregue.
                            </p>
                        </div>

                        <div className="terms-section">
                            <h2>2. Licença de Uso</h2>
                            <p>
                                Ao acessar este site, você concorda em usar o conteúdo apenas para fins de avaliação e teste.
                                Todo o conteúdo deste site, incluindo textos, gráficos, logos, imagens e software, está protegido
                                por leis de propriedade intelectual.
                            </p>
                        </div>

                        <div className="terms-section">
                            <h2>3. Restrições</h2>
                            <p>Você está especificamente restrito a:</p>
                            <ul>
                                <li>Utilizar este site apenas para fins legais e de forma que não restrinja ou iniba o uso por terceiros</li>
                                <li>Vender, sublicenciar e/ou comercializar qualquer parte deste site</li>
                                <li>Reproduzir, duplicar ou copiar material deste site para fins comerciais</li>
                                <li>Realizar qualquer atividade que cause danos ao site ou prejudique sua performance</li>
                            </ul>
                        </div>

                        <div className="terms-section">
                            <h2>4. Conta e Checkout</h2>
                            <p>
                                Este site permite a simulação de um processo de checkout com o Stripe em modo sandbox.
                                Nenhuma cobrança real será feita em cartões de crédito usados durante os testes.
                            </p>
                            <p>
                                Se você criar uma conta neste site, é responsável por manter a confidencialidade de sua
                                conta e senha, bem como por restringir o acesso ao seu computador. Você concorda em aceitar
                                a responsabilidade por todas as atividades que ocorram sob sua conta.
                            </p>
                        </div>

                        <div className="terms-section">
                            <h2>5. Produtos e Preços</h2>
                            <p>
                                Todos os produtos exibidos neste site são fictícios e usados apenas para demonstração.
                                Os preços mostrados não refletem valores reais de mercado e são usados apenas para simular
                                um ambiente de loja virtual.
                            </p>
                        </div>

                        <div className="terms-section">
                            <h2>6. Limitação de Responsabilidade</h2>
                            <p>
                                Em nenhuma circunstância seremos responsáveis por qualquer perda ou dano, incluindo sem limitação,
                                perdas indiretas ou consequentes, ou qualquer perda ou dano decorrente da perda de dados ou lucros
                                resultantes do uso deste site demonstrativo.
                            </p>
                        </div>

                        <div className="terms-section">
                            <h2>7. Precisão de Materiais</h2>
                            <p>
                                Os materiais que aparecem no site da {config.appName} podem incluir erros técnicos, tipográficos
                                ou fotográficos. Não garantimos que qualquer material neste site seja preciso, completo ou atual.
                            </p>
                        </div>

                        <div className="terms-section">
                            <h2>8. Links para Terceiros</h2>
                            <p>
                                Este site pode conter links para sites externos que não são fornecidos ou mantidos por nós.
                                Não temos controle sobre o conteúdo e a natureza desses sites e não somos responsáveis
                                por eles.
                            </p>
                        </div>

                        <div className="terms-section">
                            <h2>9. Modificações</h2>
                            <p>
                                Podemos revisar estes termos de serviço a qualquer momento, a nosso critério. Ao usar este site,
                                você concorda em estar vinculado à versão atual destes termos de serviço.
                            </p>
                        </div>

                        <div className="terms-section">
                            <h2>10. Lei Aplicável</h2>
                            <p>
                                Estes termos e condições são regidos e interpretados de acordo com as leis brasileiras,
                                e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
                            </p>
                        </div>

                        <div className="terms-footer">
                            <p>Última atualização: 01 de Março de 2025</p>
                            <p>
                                Se você tiver alguma dúvida sobre estes termos, entre em contato conosco em:
                                <a href="mailto:contato@ecommerce.com"> contato@ecommerce.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .terms-page {
          padding: 3rem 0;
          max-width: 800px;
          margin: 0 auto;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .terms-content {
          background-color: white;
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .terms-section {
          margin-bottom: 2.5rem;
        }
        
        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--primary-color);
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
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
        
        .terms-footer {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        @media (max-width: 768px) {
          .terms-content {
            padding: 1.5rem;
          }
          
          h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>
        </>
    );
}