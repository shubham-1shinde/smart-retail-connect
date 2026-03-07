import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateGroceryList() {
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: "", note: "" }]);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  console.log("address",userData.address)

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addNewItemRow = () => {
    setItems([...items, { name: "", quantity: "", note: "" }]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const filledItems = items.filter(
      (item) => item.name.trim() !== "" && item.quantity.trim() !== ""
    );
    console.log({
      address: userData.address,
      items: filledItems,
      notes,
      orderBy: userData.phone,
      orderCity: userData.city,
    });

      const response = await axios.post(`/v1/orders/create-orders/${userData.phone}`, {
        address: userData.address,
        items: filledItems,
        notes,
        orderBy: userData.phone,
        orderCity: userData.city,
      });
      if (response) {
        console.log("create order",response);
        navigate("/customer-dashboard");
      }

  };

  /*const createOrder = async() => {
    try {
      const response = await axios.post("/api/v1/orders/create-orders", {
        address: userData.address,
        items: filledItems,
        notes,
      });
      if (response) {
        console.log("create order",response);
      }
    } catch (error) {
      console.error(error);
    }
  }*/

  

/*
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    const getDeliveryAddress = async () => {
    try {
      const response = await axios.get("/v1/users/get-delivery-address");
      if (response) {
        setDeliveryAddress(response.data.data.address);
        console.log(response);
      }
      
    } catch (error) {
      
    }
  }
  getDeliveryAddress();
  }, []);
  
*/

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      
      <div className="flex items-center mb-8">
        <button
          className="text-gray-600 hover:text-gray-800 text-sm font-medium mr-4"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold">Create Grocery List</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-6 text-gray-800"
      >
       
        <div className="bg-white rounded-lg shadow-sm p-6">
          <label className="block font-semibold mb-2">Delivery Address</label>
          <div>
            {userData.address}
          </div>
        </div>

      
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <label className="font-semibold">Grocery Items</label>
            <button
              type="button"
              onClick={addNewItemRow}
              className="border border-gray-300 hover:bg-gray-100 text-sm font-medium px-4 py-1 rounded"
            >
              + Add Item
            </button>
          </div>

       
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
            >
              <input
                type="text"
                placeholder="e.g., Rice, Milk, Bread"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="e.g., 1kg, 2L, 5pc"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Brand, preference"
                value={item.note}
                onChange={(e) =>
                  handleItemChange(index, "note", e.target.value)
                }
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

   
        <div className="bg-white rounded-lg shadow-sm p-6">
          <label className="block font-semibold mb-2">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions or preferences"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            rows="2"
          />
        </div>

     
        <div className="text-center">
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Create Grocery List
          </button>
        </div>
      </form>
    </div>
  );
}
