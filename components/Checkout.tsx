
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { MERCHANT_UPI_ID, MERCHANT_NAME, GST_RATE, BASE_DELIVERY_CHARGE } from '../constants';

const Checkout: React.FC = () => {
  const { cart, createOrder, cartTotal } = useApp();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  const gst = cartTotal * GST_RATE;
  const delivery = cartTotal > 0 ? BASE_DELIVERY_CHARGE : 0;
  const total = cartTotal + gst + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.address) {
      setStep('payment');
    }
  };

  const handlePaymentConfirm = () => {
    const order = createOrder(formData);
    setCurrentOrder(order);
    setStep('success');
  };

  // Generate UPI Payment URI
  const upiUri = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${total.toFixed(2)}&cu=INR&tn=CoconutOrder`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUri)}`;

  if (step === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-8 animate-bounce">
          <i className="fa-solid fa-check"></i>
        </div>
        <h2 className="text-3xl font-bold mb-4">Order Placed!</h2>
        <p className="text-gray-500 mb-8">
          Your order <strong>#{currentOrder?.id}</strong> is being processed. 
          Please keep the UPI transaction ID handy for verification.
        </p>
        <button 
          onClick={() => window.location.hash = ''}
          className="bg-green-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-100"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-12">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-8">{step === 'details' ? 'Delivery Details' : 'Complete Payment'}</h2>
        
        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="Rahul Sharma"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                <input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="9876543210"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Delivery Address</label>
              <textarea 
                required
                rows={3}
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="House No, Street Name, Area..."
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-5 rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all shadow-xl shadow-green-100 text-lg"
            >
              Continue to Payment
            </button>
          </form>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Scan QR to pay with GPay / UPI</p>
              <div className="p-4 bg-white rounded-2xl shadow-xl border border-gray-50 mb-6">
                <img src={qrUrl} alt="Payment QR" className="w-48 h-48 sm:w-64 sm:h-64" />
              </div>
              <p className="font-bold text-2xl text-gray-900 mb-2">₹{total.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-6">UPI ID: {MERCHANT_UPI_ID}</p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={handlePaymentConfirm}
                  className="w-full bg-green-600 text-white font-bold py-5 rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all shadow-xl shadow-green-100 text-lg"
                >
                  I've Completed Payment
                </button>
                <button 
                  onClick={() => setStep('details')}
                  className="w-full text-gray-400 font-medium py-2 hover:text-gray-600 transition-colors"
                >
                  Back to Details
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4 text-blue-800">
               <i className="fa-solid fa-circle-info text-xl"></i>
               <p className="text-sm font-medium leading-relaxed">
                 After scanning and paying via GPay, click the confirmation button. Our admin will verify the payment against your phone number and order ID.
               </p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-96">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sticky top-24 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  <span className="font-bold text-gray-900">{item.quantity}x</span> {item.type} ({item.size})
                </span>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-900">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">GST (5%)</span>
              <span className="font-medium text-gray-900">₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="font-medium text-gray-900">₹{delivery}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-dashed border-gray-200">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-green-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
