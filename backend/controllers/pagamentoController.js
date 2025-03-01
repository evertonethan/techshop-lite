const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const produtos = require('../data/produtos');
const { STRIPE_CONFIG, FRONTEND_URL } = require('../config/constants');

// Criar uma sessão de checkout individual para um produto
const criarCheckout = async (req, res) => {
    try {
        const { produtoId } = req.body;

        // Verifica se o produto existe
        const produto = produtos.find(p => p.id === parseInt(produtoId));
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }

        // Cria a sessão de checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: produto.nome,
                            description: produto.descricao,
                            images: [`${FRONTEND_URL}/img/produtos/${produto.imagem}`],
                        },
                        unit_amount: Math.round(produto.preco * 100), // Stripe usa centavos
                    },
                    quantity: 1,
                },
            ],
            mode: STRIPE_CONFIG.mode,
            success_url: STRIPE_CONFIG.successUrl,
            cancel_url: STRIPE_CONFIG.cancelUrl,
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Erro ao criar checkout:', error);
        res.status(500).json({ mensagem: 'Erro ao processar pagamento' });
    }
};

// Criar uma sessão de checkout para múltiplos produtos (carrinho)
const criarCheckoutSession = async (req, res) => {
    try {
        const { items, customer } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ mensagem: 'Nenhum item fornecido' });
        }

        // Mapear itens do carrinho para o formato que o Stripe espera
        const lineItems = items.map(item => {
            // Encontrar o produto detalhado em nossa base
            const produtoDetalhado = produtos.find(p => p.id === parseInt(item.id));

            if (!produtoDetalhado) {
                throw new Error(`Produto com ID ${item.id} não encontrado`);
            }

            return {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: produtoDetalhado.nome,
                        description: produtoDetalhado.descricao,
                        images: [`${FRONTEND_URL}/img/produtos/${produtoDetalhado.imagem}`],
                    },
                    unit_amount: Math.round(produtoDetalhado.preco * 100), // Stripe usa centavos
                },
                quantity: item.quantity,
            };
        });

        // Criar metadados com informações do cliente para uso posterior
        const metadata = {
            customer_email: customer.email,
            customer_name: customer.nome,
            shipping_address: `${customer.endereco}, ${customer.cidade} - ${customer.estado}, ${customer.cep}`,
            customer_phone: customer.telefone
        };

        // Criar a sessão de checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${FRONTEND_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${FRONTEND_URL}/cancelado`,
            customer_email: customer.email,
            metadata: metadata,
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0, // Frete grátis (0 centavos)
                            currency: 'brl',
                        },
                        display_name: 'Frete Grátis',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
            ],
        });

        res.json({
            sessionId: session.id,
            url: session.url
        });
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
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

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.json({
            status: session.payment_status,
            customer: session.customer_details,
            paymentIntent: session.payment_intent
        });
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
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // Verificar assinatura do evento
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Lidar com o evento
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSession = event.data.object;

            // Aqui você processaria o pedido em sua base de dados
            console.log('Pagamento concluído para a sessão:', checkoutSession.id);

            // Em um ambiente real, você poderia:
            // - Atualizar o status do pedido no banco de dados
            // - Enviar email de confirmação para o cliente
            // - Notificar sistema de gestão de estoque
            // - etc.

            break;

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Pagamento confirmado:', paymentIntent.id);
            break;

        case 'payment_intent.payment_failed':
            const failedPaymentIntent = event.data.object;
            console.log('Pagamento falhou:', failedPaymentIntent.id);
            break;

        default:
            console.log(`Evento não tratado: ${event.type}`);
    }

    // Responder para confirmar recebimento
    res.json({ received: true });
};

module.exports = {
    criarCheckout,
    criarCheckoutSession,
    verificarCheckoutSession,
    stripeWebhook
};