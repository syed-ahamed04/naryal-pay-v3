
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, OrderStatus } from './types';
import { PRODUCTS, GST_RATE, BASE_DELIVERY_CHARGE } from './constants';

interface AppContextType {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: (customerData: { name: string; phone: string; address: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cartTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from local storage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('nariyalpay_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to local storage
  useEffect(() => {
    localStorage.setItem('nariyalpay_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        productId,
        quantity: 1,
        price: product.price,
        type: product.type,
        size: product.size
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartTotal = subtotal;

  const createOrder = (customerData: { name: string; phone: string; address: string }): Order => {
    const gst = subtotal * GST_RATE;
    const deliveryCharge = subtotal > 0 ? BASE_DELIVERY_CHARGE : 0;
    const total = subtotal + gst + deliveryCharge;

    const newOrder: Order = {
      id: `NP-${Date.now().toString().slice(-6)}`,
      customerName: customerData.name,
      phone: customerData.phone,
      address: customerData.address,
      items: [...cart],
      subtotal,
      gst,
      deliveryCharge,
      total,
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <AppContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      orders,
      createOrder,
      updateOrderStatus,
      cartTotal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
