
export enum CoconutType {
  TENDER = 'Tender (Elaneer)',
  MATURE = 'Mature',
  HUSKED = 'Husked',
  DE_HUSKED = 'De-husked'
}

export enum CoconutSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
  EXTRA_LARGE = 'XL'
}

export enum OrderStatus {
  PENDING = 'Pending Payment',
  VERIFIED = 'Payment Verified',
  FAILED = 'Payment Failed',
  DELIVERED = 'Delivered'
}

export interface Product {
  id: string;
  type: CoconutType;
  size: CoconutSize;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  type: CoconutType;
  size: CoconutSize;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  deliveryCharge: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  upiRef?: string;
}
