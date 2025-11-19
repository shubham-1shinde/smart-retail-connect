import './index.css'
import React from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CustomerDashboard from './pages/CustomerDashboard.jsx'
import CreateGroceryList from './pages/CreateGroceryList.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import ShopkepperDashboard from './pages/ShopkepperDashboard.jsx'
import DeliveryPartnerDashboard from './pages/DeliveryPartnerDashboard.jsx'
import TrackOrder from './pages/TrackOrder.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Dashboard />
        ),
      },
      {
        path: "/customer-dashboard",
        element: (
          <CustomerDashboard />
        ),
      },
      {
        path: "/shopkepper-dashboard",
        element: (
          <ShopkepperDashboard />
        ),
      },
      {
        path: "/delivery-partner-dashboard",
        element: (
          <DeliveryPartnerDashboard />
        ),
      },
      {
        path: "/track-order",
        element: (
          <TrackOrder />
        ),
      },
      {
        path: "/create-grocery-list",
        element: (
          <CreateGroceryList />
        ),
      },
      {
        path: "/sign-in",
        element: (
          <SignIn />
        ),
      },
      {
        path: "/sign-up",
        element: (
          <SignUp />
        ),
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
