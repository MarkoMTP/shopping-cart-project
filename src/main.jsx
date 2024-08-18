import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/Homepage.jsx';
import App from './components/App.jsx';
import ShoppingPage, { shoppingLoader } from './components/ShoppingPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/homepage', element: <HomePage /> },
      {
        path: '/shoppingpage',
        element: <ShoppingPage />,
        loader: shoppingLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
