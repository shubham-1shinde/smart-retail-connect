import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, DollarSign, Truck, User, Store, Bike } from "lucide-react";

export default function GroceryMatchLanding() {

  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center font-sans">
      
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Grocery<span className="text-green-700">Match</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Connect with local shopkeepers, get competitive prices, and have your groceries
          delivered fresh to your doorstep.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition">
          <Link to="/sign-up">Get Started Today</Link>
        </button>

        
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <ShoppingCart className="mx-auto mb-4 text-gray-500" size={40} />
            <h3 className="text-lg font-semibold mb-2">Easy Ordering</h3>
            <p className="text-gray-600 text-sm">
              Simply type your grocery list or upload a photo. We'll match you with nearby
              shopkeepers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <DollarSign className="mx-auto mb-4 text-yellow-500" size={40} />
            <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600 text-sm">
              Compare quotes from multiple shopkeepers and choose the best deal for your budget.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <Truck className="mx-auto mb-4 text-orange-400" size={40} />
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Track your order in real-time and get fresh groceries delivered quickly.
            </p>
          </div>
        </div>
      </section>

    
      <section className="text-center py-16 px-6 bg-green-50 border-t border-green-100 w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Join Our Community</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <User className="mx-auto mb-4 text-purple-700" size={40} />
            <h3 className="text-lg font-semibold text-green-700 mb-2">Customer</h3>
            <p className="text-gray-600 text-sm">
              Order groceries from local shops with competitive pricing.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <Store className="mx-auto mb-4 text-pink-600" size={40} />
            <h3 className="text-lg font-semibold text-green-700 mb-2">Shopkeeper</h3>
            <p className="text-gray-600 text-sm">
              Expand your business by serving more customers online.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <Bike className="mx-auto mb-4 text-orange-500" size={40} />
            <h3 className="text-lg font-semibold text-green-700 mb-2">Delivery Partner</h3>
            <p className="text-gray-600 text-sm">
              Earn money by delivering groceries in your area.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

