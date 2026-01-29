
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './AppContext';
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';
import { PRODUCTS } from './constants.tsx';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden coconut-gradient pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center sm:text-left sm:flex items-center gap-12">
          <div className="flex-grow max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Naturally Fresh <br/>
              <span className="text-green-600">Coconuts</span> Delivered.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto sm:mx-0">
              Straight from the farms of coastal India. Fresh, chilled, and packed with electrolytes. 
              Billing made simple with GPay QR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <a href="#shop" className="bg-green-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-2">
                Order Now <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/50 backdrop-blur rounded-2xl border border-white/50">
                 <div className="flex -space-x-2">
                   {[1,2,3].map(i => <img key={i} src={`https://picsum.photos/seed/${i+40}/32/32`} className="w-8 h-8 rounded-full border-2 border-white" alt="user" />)}
                 </div>
                 <span className="text-xs font-bold text-gray-700">500+ Happy Customers</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:block flex-shrink-0 relative">
             <div className="w-[450px] h-[450px] bg-white rounded-[60px] shadow-2xl rotate-3 flex items-center justify-center p-8">
                <img 
                  src="https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=800&h=800&fit=crop" 
                  alt="Fresh Coconut" 
                  className="w-full h-full object-cover rounded-[40px] shadow-inner"
                />
             </div>
             {/* Decorative bubbles */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-200/50 rounded-full blur-3xl animate-pulse"></div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brown-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="shop" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-green-600 uppercase tracking-[0.2em] block mb-2">Our Menu</span>
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Refreshment</h2>
          </div>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
             <button className="px-4 py-2 rounded-lg bg-white shadow-sm text-xs font-bold text-gray-900">All Items</button>
             <button className="px-4 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-700">Tender</button>
             <button className="px-4 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-700">Mature</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-900 text-white py-20 mt-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="space-y-4">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-400">
               <i className="fa-solid fa-bolt text-xl"></i>
             </div>
             <h3 className="text-xl font-bold">Quick QR Payment</h3>
             <p className="text-gray-400 text-sm leading-relaxed">No need to carry cash. Just scan the GPay QR code and complete your order in seconds.</p>
          </div>
          <div className="space-y-4">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-400">
               <i className="fa-solid fa-truck-fast text-xl"></i>
             </div>
             <h3 className="text-xl font-bold">Fast Delivery</h3>
             <p className="text-gray-400 text-sm leading-relaxed">Local delivery within 45 minutes to ensure you get your coconut water fresh and cold.</p>
          </div>
          <div className="space-y-4">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-400">
               <i className="fa-solid fa-check-double text-xl"></i>
             </div>
             <h3 className="text-xl font-bold">Hand-picked Quality</h3>
             <p className="text-gray-400 text-sm leading-relaxed">Every coconut is visually inspected for damage and weight before it reaches your door.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const CartSidebar: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useApp();
  
  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => window.location.hash = ''}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Your Basket</h2>
          <button onClick={() => window.location.hash = ''} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <i className="fa-solid fa-times text-gray-400"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-shopping-basket text-3xl text-gray-200"></i>
              </div>
              <p className="text-gray-500 font-medium">Your basket is empty</p>
              <button onClick={() => window.location.hash = ''} className="mt-4 text-green-600 font-bold text-sm">Start Shopping</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.productId} className="flex gap-4">
                <img 
                  src={PRODUCTS.find(p => p.id === item.productId)?.image} 
                  className="w-20 h-20 rounded-xl object-cover bg-gray-100 shadow-sm"
                  alt={item.type}
                />
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-gray-900 text-sm">{item.type}</span>
                    <span className="font-bold text-gray-900 text-sm">₹{item.price * item.quantity}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">{item.size} Size</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1 hover:text-green-600"><i className="fa-solid fa-minus text-[10px]"></i></button>
                      <span className="px-3 text-xs font-bold text-gray-700">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1 hover:text-green-600"><i className="fa-solid fa-plus text-[10px]"></i></button>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">₹{cartTotal}</span>
            </div>
            <button 
              onClick={() => window.location.hash = '#checkout'}
              className="w-full bg-green-600 text-white font-bold py-5 rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-100 text-lg flex items-center justify-center gap-3"
            >
              Checkout <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (isAdmin) return <AdminPanel />;
    
    switch (route) {
      case '#checkout':
        return <Checkout />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout showAdmin={isAdmin} onToggleAdmin={() => {
      setIsAdmin(!isAdmin);
      window.location.hash = '';
    }}>
      {renderContent()}
      {!isAdmin && route === '#cart' && <CartSidebar />}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </AppProvider>
  );
};

export default App;
