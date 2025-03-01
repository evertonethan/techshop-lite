import { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto do carrinho
const CartContext = createContext();

// Hook personalizado para utilizar o contexto do carrinho
export const useCart = () => {
    return useContext(CartContext);
};

// Provedor do contexto do carrinho
export const CartProvider = ({ children }) => {
    // Estado para armazenar os itens do carrinho
    const [cartItems, setCartItems] = useState([]);

    // Carregar carrinho do localStorage ao iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Erro ao carregar carrinho:', error);
                setCartItems([]);
            }
        }
    }, []);

    // Salvar carrinho no localStorage sempre que for alterado
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Adicionar produto ao carrinho
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            // Verifica se o produto já está no carrinho
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                // Se já existe, atualiza apenas a quantidade
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                return updatedItems;
            } else {
                // Se não existe, adiciona o produto com a quantidade especificada
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    // Remover produto do carrinho
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Atualizar quantidade de um produto
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            // Se a quantidade for zero ou negativa, remove o produto
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Limpar carrinho
    const clearCart = () => {
        setCartItems([]);
    };

    // Calcular o total de itens no carrinho
    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Calcular o total em valor do carrinho
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.preco * item.quantity), 0);
    };

    // Valores e funções disponibilizados pelo contexto
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        getCartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};