
import React from 'react';
import { Product } from '../types';
import { useApp } from '../AppContext';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useApp();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.type} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
           <span className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-700 uppercase tracking-wide border border-white/20">
            {product.size} Size
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 leading-tight">{product.type}</h3>
          <span className="text-green-600 font-bold text-lg">₹{product.price}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8 leading-relaxed">
          {product.description}
        </p>
        
        <button
          disabled={!product.inStock}
          onClick={() => addToCart(product.id)}
          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            product.inStock 
            ? 'bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-lg shadow-green-100' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <i className="fa-solid fa-plus text-[10px]"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
