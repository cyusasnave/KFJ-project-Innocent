import React from 'react'
/* import ReactDOM from 'react-dom/client' */
import App from './App.tsx'
import './index.css'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './Components/Dashboard/SignUp.tsx';
import DashboardHome from './Components/Dashboard/DashboardHome.tsx';
import DashboardStatistics from './Components/Dashboard/DashboardJobsAvailable.tsx';
import DashboardUsers from './Components/Dashboard/Dashboardusers.tsx';
import DashboardJobRequest from './Components/Dashboard/DashboardJobRequest.tsx';
import DashboardSettings from './Components/Dashboard/DashboardSettings.tsx';
import DashboardHelp from './Components/Dashboard/DashboardHelp.tsx';

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
    path: "/signUp", // Corrected path with leading forward slash
    element: <SignUp />,
  },
  {
    path: "/dashboard", // Corrected path with leading forward slash
    element: <DashboardHome />
  },
  {
    path: "dashboard/list", // Corrected path with leading forward slash
    element: <DashboardStatistics />
  },
  {
    path: "dashboard/messages", // Corrected path with leading forward slash
    element: <DashboardUsers />
  },
  {
    path: "dashboard/jobrequests", // Corrected path with leading forward slash
    element: <DashboardJobRequest />
  },
  {
    path: "dashboard/settings", // Corrected path with leading forward slash
    element: <DashboardSettings />
  },
  {
    path: "dashboard/help", // Corrected path with leading forward slash
    element: <DashboardHelp />
  }
]);


createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
