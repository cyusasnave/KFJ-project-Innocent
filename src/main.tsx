import React from 'react'
/* import ReactDOM from 'react-dom/client' */
import App from './App.tsx'
import './index.css'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './Components/signUp.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ),
  },
  {
    path: "signUp",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
