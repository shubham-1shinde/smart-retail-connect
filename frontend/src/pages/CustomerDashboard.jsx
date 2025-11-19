import React from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux' 
import { logout } from '../store/authSlice'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CustomerDashboard() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate   = useNavigate()
  const [resp,setResp] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ popup state

  useEffect(() => {
    const getOrders = async() => {
      try {
        const response = await axios.get(`/v1/orders/get-customer-orders/${userData.phone}`);
        if (response) {
          setResp(response.data.data.orders);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getOrders();
  },[])

  const closePopup = () => setSelectedOrder(null);

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">

    
    <nav className="bg-white shadow-md p-4 px-6 flex justify-between items-center sticky top-0 z-40">
      <h1 className="text-2xl font-bold text-green-700">Customer Dashboard</h1>

      <div className="flex items-center space-x-5">
        <span className="text-gray-700">
          Welcome, <strong className="text-green-700">{userData.fullName}</strong>
        </span>

        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm"
          onClick={() => { 
            dispatch(logout());
            localStorage.removeItem('status');
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </nav>

    
    <main className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-7">
        <h2 className="text-xl font-semibold text-gray-800">Your Grocery Lists</h2>

        <Link
          to="/create-grocery-list"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-md shadow"
        >
          Create New List
        </Link>
      </div>

     
      <div className="space-y-5">
        {resp.map((list) => (
          <div
            key={list._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex justify-between items-start hover:shadow-lg transition-all duration-200"
          >
            <div>
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-green-700">{list.items.length} Items</span>
                <span className="text-gray-400 text-sm">• {list.createdAt.slice(0,10)}</span>
              </p>

              <ul className="text-gray-700 mt-2 text-sm space-y-1">
                {list.items.map((item, i) => (
                  <li key={i} className="flex gap-1">
                    <span className="font-medium text-gray-800">{item.name}</span> 
                    <span>({item.quantity})</span> 
                    <span className="text-gray-500">- {item.note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedOrder(list)}
              className="relative bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm"
            >
              View Responses

              {list.shopkeepers?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                  {list.shopkeepers.length}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </main>

   
    {selectedOrder && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-6 relative animate-fadeIn">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Shopkeeper Responses</h2>

          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            onClick={() => setSelectedOrder(null)}
          >
            ✕
          </button>

          {selectedOrder.shopkeepers?.length === 0 ? (
            <p className="text-gray-600 text-center py-6">No shopkeepers have responded yet.</p>
          ) : (
            <div className="space-y-4">
              {selectedOrder.shopkeepers.map((sk, index) => (
                <div
                  key={index}
                  className="group border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition relative shadow-sm"
                >
                  <h3 className="font-medium text-gray-800">
                    Shopkeeper: <span className="text-green-700 font-semibold">{sk.shopName}</span>
                  </h3>

                  <ul className="mt-2 text-sm text-gray-700 space-y-1">
                    {Object.entries(sk.prices).map(([item, price], i) => (
                      <li key={i}>{item}: ₹{price}</li>
                    ))}
                  </ul>

                  <p className="mt-3 font-semibold text-gray-900">Total: ₹{sk.totalPrice}</p>

                  <button
                    className="opacity-0 group-hover:opacity-100 transition bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-md absolute top-4 right-4 shadow"
                    onClick={async () => {
                      const response = await axios.post(`/v1/orders/confirm-order`, {
                        shopkeeper: sk.shopkeeper,
                        orderBy: userData.phone,
                      });
                      if (response) navigate("/track-order");
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )}

  </div>
);

}
