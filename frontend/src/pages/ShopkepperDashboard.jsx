import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ShopkepperDashboard() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resp, setResp] = useState([]);
  const [orderBy, setOrderBy] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`/v1/orders/get-shopkepper-orders/${userData.phone}`);
        if (response) {
          console.log("get orders", response.data.data.orders[0].orderBy);
          setOrderBy(response.data.data.orders[0].orderBy);
          setResp(response.data.data.orders);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [prices, setPrices] = useState({});

  const handlePriceChange = (itemName, value) => {
    setPrices({ ...prices, [itemName]: Number(value) || 0 });
  };

  const totalPrice = Object.values(prices).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Shopkepper Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            Welcome, <strong>{userData.fullName}</strong>
          </span>

          <button
            className="bg-gray-100 hover:bg-gray-200 text-sm font-medium px-4 py-2 rounded"
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem('status');
              console.log("logout successfully");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

     
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-lg font-semibold mb-6">Orders</h2>

        <div className="space-y-4">
          {resp.map((list) => (
            <div key={list._id} className="bg-white rounded-lg shadow-sm p-4 flex justify-between hover:shadow-md transition">
              <div>
                <p className="font-semibold">
                  {list.items.length} items - {list.createdAt.slice(0, 10)}
                </p>
                <ul className="text-gray-700 mt-1 text-sm list-disc list-inside">
                  {list.items.map((item, i) => (
                    <li key={i}>
                      {item.name} ({item.quantity}) - {item.note}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded"
                onClick={() => { setSelectedOrder(list); setPrices({}); }}
              >
                View Order
              </button>
            </div>
          ))}
        </div>
      </main>

      
      {selectedOrder && (
        <div className="fixed inset-0 bg-opacity-80 backdrop-blur-xs flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
            <h3 className="text-xl font-semibold mb-4">Enter Prices</h3>

            {selectedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center mb-3">
                <span>{item.name} ({item.quantity})</span>
                <input
                  type="number"
                  className="border p-1 w-24 rounded"
                  placeholder="Price"
                  onChange={(e) => handlePriceChange(item.name, e.target.value)}
                />
              </div>
            ))}

            <div className="text-right font-medium text-lg mb-4">
              Total: ₹{totalPrice}
            </div>

            <button
              className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
              onClick={async() => {
                console.log("Prices Sent:", prices, "Total:", totalPrice);
                const response = await axios.patch(`/v1/orders/update-order/${orderBy}`, {
                  shopkeeperPrices: prices,
                  totalPrice,
                  shopkeeper: userData.phone,
                  shopName: userData.shopName,
                });
                console.log("Update Order Response:", response.data.data);
                setSelectedOrder(null);
              }}
            >
              Send Availability (₹{totalPrice})
            </button>

            <button
              className="mt-3 text-gray-600 hover:text-black w-full"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
