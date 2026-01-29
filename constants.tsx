
import { CoconutType, CoconutSize, Product } from './types';

export const MERCHANT_UPI_ID = 'nariyalpay@upi';
export const MERCHANT_NAME = 'NariyalPay Fresh Coconuts';
export const GST_RATE = 0.05; // 5% GST on fresh produce
export const BASE_DELIVERY_CHARGE = 30;

export const PRODUCTS: Product[] = [
  {
    id: 't-s',
    type: CoconutType.TENDER,
    size: CoconutSize.SMALL,
    price: 45,
    description: 'Refreshing small tender coconut, perfect for a single quick drink.',
    image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fcd0?q=80&w=400&h=400&fit=crop',
    inStock: true
  },
  {
    id: 't-m',
    type: CoconutType.TENDER,
    size: CoconutSize.MEDIUM,
    price: 60,
    description: 'The standard choice. Rich in minerals and natural electrolytes.',
    image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?q=80&w=400&h=400&fit=crop',
    inStock: true
  },
  {
    id: 't-l',
    type: CoconutType.TENDER,
    size: CoconutSize.LARGE,
    price: 80,
    description: 'Maximum water content. Great for sharing or extra thirst.',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=400&h=400&fit=crop',
    inStock: true
  },
  {
    id: 'm-m',
    type: CoconutType.MATURE,
    size: CoconutSize.MEDIUM,
    price: 55,
    description: 'Thick creamy malai/flesh and sweet water.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400&h=400&fit=crop',
    inStock: true
  },
  {
    id: 'h-m',
    type: CoconutType.HUSKED,
    size: CoconutSize.MEDIUM,
    price: 40,
    description: 'Traditional husked coconut for kitchen and culinary use.',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=400&h=400&fit=crop',
    inStock: false
  },
  {
    id: 'dh-l',
    type: CoconutType.DE_HUSKED,
    size: CoconutSize.LARGE,
    price: 70,
    description: 'Ready to break de-husked coconut, easy to manage.',
    image: 'https://images.unsplash.com/photo-1588615419957-ed6996680489?q=80&w=400&h=400&fit=crop',
    inStock: true
  }
];
