import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useDispatch} from "react-redux"
import axios from 'axios';
import {useSelector} from 'react-redux' 
import { login, logout } from '../store/authSlice'
import { useNavigate } from "react-router-dom";


export default function SignIn() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /*const authStatus = useSelector((state) => state.auth.status);
  if (authStatus) {
    console.log("session is already active")
    return;
  };   */ 

  const dispatch   = useDispatch();
  const navigate   = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/v1/users/sign-in", data);
      console.log("login resp", response)  
      if(response.data.statusCode === 200){
        console.log("Login successful");
        dispatch(login({ userData: response.data.data }));
        localStorage.setItem("status", "true");
        if(response.data.data.role === "Customer"){
        navigate("/customer-dashboard");
        } else if(response.data.data.role === "Shopkeeper"){
          navigate("/shopkepper-dashboard");
        } else if(response.data.data.role === "Delivery Partner"){
          navigate("/delivery-partner-dashboard");
        }
      } else {
          dispatch(logout());
      }
      setLoginDone(true);                                 
    } catch (err) {
      console.error(err);
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
          Welcome Back
        </h2>

       
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="number"
              name="phone"
              placeholder="Enter your mobile number"
              {...register('phone', { required: 'Phone is required' })}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Submit
          </button>
        </form>

      
        <p className="text-center text-sm text-gray-600 mt-4">
          Need an account?{" "}
          <a href="/sign-up" className="text-green-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
