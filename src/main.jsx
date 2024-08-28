import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/Homepage.jsx';
import App from './components/App.jsx';
import ShoppingPage from './components/ShoppingPage.jsx';
import CartPage from './components/shoppingCart.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/homepage', element: <HomePage /> },
      {
        path: '/shoppingpage',
        element: <ShoppingPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
