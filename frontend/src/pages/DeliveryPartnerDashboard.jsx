import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux' 
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DeliveryPartnerDashboard() {
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`/v1/delivery/get-delivery-order/${userData.phone}`);
        console.log("Delivery Order:", res.data.data);
        setOrder(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrder();
  }, []);

  

  return (
  <>
  
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Delivery Partner Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, <strong>{userData.fullName}</strong></span>
            <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium px-4 py-2 rounded"
              onClick={() => { 
                dispatch(logout());
                localStorage.removeItem('status');
                navigate("/");
              }}>
              Logout
            </button>
          </div>
        </nav>
  <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      {!order ? (
        <p className="text-gray-600">No orders assigned yet.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl border">
          <h2 className="text-lg font-semibold text-green-700 mb-4">Confirmed Order Details</h2>

          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Customer:</strong> {order.customer_name}</p>
            <p><strong>Phone:</strong> {order.customer_phone}</p>
            <p><strong>Address:</strong> {order.customer_address}</p>
            <hr className="my-2" />

            <p><strong>Shop:</strong> {order.shopName}</p>
            <p><strong>Shopkeeper:</strong> {order.shopkeeper_name}</p>
            <p><strong>Phone:</strong> {order.shopkeeper_phone}</p>
            <p><strong>Shop Address:</strong> {order.shopAddress}</p>
            <p><strong>City:</strong> {order.city}</p>
            <hr className="my-2" />

            <p className="text-lg font-semibold text-gray-900">
              Total Amount to Collect: ₹{order.totalPrice}
            </p>
          </div>

          <button
            onClick={async () => {
              try {
                const res =  axios.post("/v1/delivery/delivery-done",{
                  customer_phone: order.customer_phone,
                  shopkeeper_phone: order.shopkeeper_phone,
                  deliveryPartner_phone: userData.phone,
                });
                console.log("Delivery Done Response:", res.data);
                if(res){
                  navigate("/delivery-partner-dashboard");
                }
              } catch (error) {
                console.log(error);
              }
            }}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition" 
          >
            Mark as Delivered ✅
          </button>
        </div>
      )}
    </div>
  </>
    
    
  );
}
