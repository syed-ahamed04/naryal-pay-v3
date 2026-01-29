
import React from 'react';
import { useApp } from '../AppContext';

const Layout: React.FC<{ children: React.ReactNode; showAdmin?: boolean; onToggleAdmin: () => void }> = ({ children, showAdmin, onToggleAdmin }) => {
  const { cart } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                <i className="fa-solid fa-leaf text-xl"></i>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">Nariyal<span className="text-green-600">Pay</span></span>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest leading-none">Fresh Coconuts</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onToggleAdmin}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${showAdmin ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {showAdmin ? 'Customer View' : 'Admin'}
              </button>
              
              {!showAdmin && (
                <button 
                  onClick={() => window.location.hash = '#cart'}
                  className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <i className="fa-solid fa-shopping-cart text-xl"></i>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">© 2024 NariyalPay. Naturally Fresh.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
