import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2, CheckCircle, Clock } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/order/my', { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-lg">You haven’t placed any orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all p-6"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 break-words">
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p className="text-blue-600 font-semibold break-all">{order._id}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full max-w-full
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                     `}
                >
                  {order.status === 'Delivered' ? <CheckCircle size={16} /> : <Clock size={16} />}
                  {order.status}
                </span>
              </div>

              <p className="text-base font-semibold text-gray-700 mb-2">
                Total: <span className="text-xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</span>
              </p>

              <p className="text-sm text-gray-600 mb-2">
                <strong>Address:</strong> {order.address}
              </p>

              <p className="font-semibold text-gray-800 mb-1">Items:</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {order.items.map((item, index) => (
                  <li key={item.productId?._id || index}>
                    {item.productId?.name || 'Product unavailable'} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyOrders;
