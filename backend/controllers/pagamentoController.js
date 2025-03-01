const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const produtos = require('../data/produtos');
const { STRIPE_CONFIG } = require('../config/constants');

// Pegar o URL do frontend de forma segura
const getFrontendUrl = () => {
    return process.env.FRONTEND_URL || 'http://localhost:3000';
};

// Criar uma sessão de checkout individual para um produto
const criarCheckout = async (req, res) => {
    try {
        console.log('Iniciando checkout de produto único');
        const { produtoId } = req.body;

        // Verifica se o produto existe
        const produto = produtos.find(p => p.id === parseInt(produtoId));
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }

        console.log('Produto encontrado:', produto.nome);

        // Definindo imagens com fallback para evitar erros
        const images = [];
        if (produto.imagem) {
            // Usar caminho relativo sem domínio para evitar problemas de CORS
            images.push(`/img/produtos/${produto.imagem}`);
        }

        // Cria a sessão de checkout com tratamento de erro melhorado
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'brl',
                            product_data: {
                                name: produto.nome,
                                description: produto.descricao || '',
                                // Apenas adicionar imagens se existirem
                                ...(images.length > 0 && { images }),
                            },
                            unit_amount: Math.round(produto.preco * 100), // Stripe usa centavos
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${getFrontendUrl()}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${getFrontendUrl()}/cancelado`,
            });

            console.log('Sessão criada com sucesso:', session.id);
            res.json({ id: session.id, url: session.url });
        } catch (stripeError) {
            console.error('Erro específico do Stripe:', stripeError);
            res.status(400).json({
                mensagem: 'Erro ao criar sessão de checkout no Stripe',
                erro: stripeError.message
            });
        }
    } catch (error) {
        console.error('Erro geral ao criar checkout:', error);
        res.status(500).json({ mensagem: 'Erro ao processar pagamento', erro: error.message });
    }
};

// Criar uma sessão de checkout para múltiplos produtos (carrinho)
const criarCheckoutSession = async (req, res) => {
    try {
        console.log('Iniciando checkout do carrinho');
        console.log('Dados recebidos:', JSON.stringify(req.body));

        const { items, customer } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ mensagem: 'Nenhum item fornecido' });
        }

        // Verificar todos os produtos antes de prosseguir
        const lineItems = [];
        for (const item of items) {
            // Validar ID e quantidade
            const itemId = parseInt(item.id);
            if (isNaN(itemId)) {
                return res.status(400).json({ mensagem: `ID de produto inválido: ${item.id}` });
            }

            // Encontrar o produto detalhado em nossa base
            const produtoDetalhado = produtos.find(p => p.id === itemId);

            if (!produtoDetalhado) {
                console.error(`Produto com ID ${itemId} não encontrado`);
                return res.status(404).json({ mensagem: `Produto com ID ${itemId} não encontrado` });
            }

            console.log(`Adicionando produto ao checkout: ${produtoDetalhado.nome}`);

            // Adicionar ao array de items
            lineItems.push({
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: produtoDetalhado.nome,
                        description: produtoDetalhado.descricao || '',
                        // Não incluir imagens para evitar erros
                    },
                    unit_amount: Math.round(produtoDetalhado.preco * 100), // Stripe usa centavos
                },
                quantity: item.quantity,
            });
        }

        console.log(`Total de ${lineItems.length} itens adicionados ao checkout`);

        // Simplificar os metadados para evitar problemas
        const metadata = {
            customer_name: customer?.nome || 'Cliente',
            customer_email: customer?.email || 'email@exemplo.com'
        };

        // Criar a sessão de checkout com tratamento de erro melhorado
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${getFrontendUrl()}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${getFrontendUrl()}/cancelado`,
                metadata: metadata,
            });

            console.log('Sessão de carrinho criada com sucesso:', session.id);
            res.json({
                sessionId: session.id,
                url: session.url
            });
        } catch (stripeError) {
            console.error('Erro específico do Stripe:', stripeError);
            res.status(400).json({
                mensagem: 'Erro ao criar sessão de checkout no Stripe',
                erro: stripeError.message
            });
        }
    } catch (error) {
        console.error('Erro geral ao criar sessão de checkout:', error);
        res.status(500).json({
            mensagem: 'Erro ao processar checkout',
            erro: error.message
        });
    }
};

// Verificar o status de uma sessão
const verificarCheckoutSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!sessionId) {
            return res.status(400).json({ mensagem: 'ID de sessão não fornecido' });
        }

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            res.json({
                status: session.payment_status,
                customer: session.customer_details,
                paymentIntent: session.payment_intent
            });
        } catch (stripeError) {
            console.error('Erro ao recuperar sessão do Stripe:', stripeError);
            res.status(400).json({
                mensagem: 'Erro ao verificar sessão no Stripe',
                erro: stripeError.message
            });
        }
    } catch (error) {
        console.error('Erro ao verificar status do checkout:', error);
        res.status(500).json({
            mensagem: 'Erro ao verificar status do pagamento',
            erro: error.message
        });
    }
};

// Webhook para receber eventos do Stripe
const stripeWebhook = async (req, res) => {
    // Webhook simplificado para ambiente de desenvolvimento
    try {
        const event = req.body;

        // Apenas logging do tipo de evento
        console.log(`Webhook recebido: ${event.type}`);

        // Responder para confirmar recebimento
        res.json({ received: true });
    } catch (error) {
        console.error('Erro ao processar webhook:', error);
        res.status(400).json({ erro: error.message });
    }
};

module.exports = {
    criarCheckout,
    criarCheckoutSession,
    verificarCheckoutSession,
    stripeWebhook
};