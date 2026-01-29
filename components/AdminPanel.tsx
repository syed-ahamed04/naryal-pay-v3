
import React from 'react';
import { useApp } from '../AppContext';
import { OrderStatus } from '../types';

const AdminPanel: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Merchant Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your orders and verify payments</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-2 flex items-center gap-6 shadow-sm">
          <div className="text-center">
            <span className="block text-[10px] font-bold text-gray-400 uppercase">Pending</span>
            <span className="text-lg font-bold text-orange-500">{orders.filter(o => o.status === OrderStatus.PENDING).length}</span>
          </div>
          <div className="w-px h-8 bg-gray-100"></div>
          <div className="text-center">
            <span className="block text-[10px] font-bold text-gray-400 uppercase">Total Sales</span>
            <span className="text-lg font-bold text-green-600">₹{orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-400">
                    <i className="fa-solid fa-box-open text-4xl mb-4 block opacity-20"></i>
                    No orders found yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-sm block">#{order.id}</span>
                      <span className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium block">{order.customerName}</span>
                      <span className="text-[11px] text-gray-500">{order.phone}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{order.items.length} items</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-sm">₹{order.total.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                        order.status === OrderStatus.PENDING ? 'bg-orange-100 text-orange-600' :
                        order.status === OrderStatus.VERIFIED ? 'bg-green-100 text-green-600' :
                        order.status === OrderStatus.FAILED ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {order.status === OrderStatus.PENDING && (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => updateOrderStatus(order.id, OrderStatus.VERIFIED)}
                            className="bg-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Verify
                          </button>
                          <button 
                             onClick={() => updateOrderStatus(order.id, OrderStatus.FAILED)}
                            className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
