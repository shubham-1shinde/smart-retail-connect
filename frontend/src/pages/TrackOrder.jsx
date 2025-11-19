import React from "react";

export default function TrackOrder() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        
        <h1 className="text-2xl font-semibold text-center mb-6">Track Your Order</h1>

        
        <div className="border rounded-lg p-4 bg-gray-100 mb-8">
          <p className="text-sm text-gray-700"><strong>Order ID:</strong> #ORD123456</p>
          <p className="text-sm text-gray-700"><strong>Placed On:</strong> 07 Nov 2025</p>
          <p className="text-sm text-gray-700"><strong>Current Status:</strong> On the Way 🚚</p>
        </div>

      
        <div className="relative border-l-4 border-green-600 ml-4 space-y-8">
          <div className="ml-6">
            <div className="w-4 h-4 bg-green-600 rounded-full absolute -left-2.5"></div>
            <h3 className="font-semibold">Order Confirmed</h3>
            <p className="text-gray-500 text-sm">Your order has been placed successfully</p>
          </div>

          <div className="ml-6">
            <div className="w-4 h-4 bg-green-600 rounded-full absolute -left-2.5"></div>
            <h3 className="font-semibold">Preparing Order</h3>
            <p className="text-gray-500 text-sm">Shop is preparing your items</p>
          </div>

          <div className="ml-6">
            <div className="w-4 h-4 bg-green-600 rounded-full absolute -left-2.5"></div>
            <h3 className="font-semibold">Out for Delivery</h3>
            <p className="text-gray-500 text-sm">Delivery partner is on the way</p>
          </div>

          <div className="ml-6 opacity-40">
            <div className="w-4 h-4 bg-gray-400 rounded-full absolute -left-2.5"></div>
            <h3 className="font-semibold">Delivered</h3>
            <p className="text-gray-500 text-sm">Will be delivered soon</p>
          </div>
        </div>

        
        <div className="mt-10 border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Delivery Partner</h3>
          <p className="text-sm"><strong>Name:</strong> Ravi Kumar</p>
          <p className="text-sm"><strong>Phone:</strong> 9876543210</p>
        </div>

        
        <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
          Call Delivery Partner
        </button>

      </div>
    </div>
  );
}
