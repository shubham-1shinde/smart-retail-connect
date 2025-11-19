import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux"
import { login, logout } from '../store/authSlice'

function Signup() {



    const [role, setRole] = useState("Customer");

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async(data) => {


    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("role", data.role);
    if (role === "Shopkeeper") {
        formData.append("shopName", data.shopName);
    }
    if (role === "Delivery Partner") {
        formData.append("vehicleType", data.vehicleType);
        formData.append("licenseNo", data.licenseNo);
    }
    console.log("role", role);


    const response = await axios.post('/v1/users/sign-up', formData)

    if (response){
      console.log(response.data);
      localStorage.setItem('status', 'true')
      dispatch(login({ userData: response.data.data }));
      if(formData.get("role") === "Customer"){
          navigate('/customer-dashboard');
      }
      else if(formData.get("role") === "Shopkeeper"){
          navigate('/shopkepper-dashboard');
      }
      else if(formData.get("role") === "Delivery Partner"){
          navigate('/delivery-partner-dashboard');
      }
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
        <button
          onClick={() => window.history.back()}
          className="text-gray-500 hover:text-gray-700 text-sm mb-2"
        >
          ←
        </button>

       
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Join GroceryMatch
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">I am a</label>
            <select
              {...register('role', { required: 'role is required' })}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option>Customer</option>
              <option>Shopkeeper</option>
              <option>Delivery Partner</option>
            </select>
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                {...register('fullName', { required: 'Name is required' })}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Your phone number"
                {...register('phone', { required: 'phone is required' })}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              {...register('email', { required: 'Email is required' })}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          
            
            <div>
                <label className="block text-gray-700 font-medium mb-1">Address</label>
                <input
                type="text"
                name="address"
                placeholder="Your delivery address"
                {...register('address', { required: 'Address is required' })}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                {...register('city', { required: 'city is required' })}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          

          {role === "Shopkeeper" && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  placeholder="Enter your shop name"
                  {...register('shopName', {})}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              
            </>
          )}

          {role === "Delivery Partner" && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Vehicle Type</label>
                <input
                  type="text"
                  name="vehicleType"
                  placeholder="e.g. Bike, Scooter, Van"
                  {...register('vehicleType', {})}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">License Number</label>
                <input
                  type="text"
                  name="licenseNo"
                  placeholder="Enter your license number"
                  {...register('licenseNo', {})}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </>
          )}

        
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Create Account
          </button>
        </form>

        
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/sign-in" className="text-green-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
