import React from 'react'
/* import ReactDOM from 'react-dom/client' */
import App from './App.tsx'
import './index.css'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// User dashboard imports component

import SignUp from './Components/Dashboard/SignUp.tsx';
import DashboardHome from './Components/Dashboard/DashboardHome.tsx';
import DashboardStatistics from './Components/Dashboard/DashboardJobsAvailable.tsx';
import DashboardUsers from './Components/Dashboard/Dashboardusers.tsx';
import DashboardJobRequest from './Components/Dashboard/DashboardJobRequest.tsx';
import DashboardSettings from './Components/Dashboard/DashboardSettings.tsx';
import DashboardHelp from './Components/Dashboard/DashboardHelp.tsx';
import DashboardBrowseJob from './Components/Dashboard/DashboardBrowseJob.tsx';

// Employer dashboard import components

import DashboardEmpoyerHome from './Components/EmployerDashboard/DashboardEmployerHome.tsx';
import DashboardEmployerStatistics from './Components/EmployerDashboard/DashboardEmployerJobsAvailable.tsx';
import DashboardEmployerUsers from './Components/EmployerDashboard/DashboardEmployerusers.tsx';
import DashboardEmployerJobRequest from './Components/EmployerDashboard/DashboardEmployerJobRequest.tsx';
import DashboardEmployerSettings from './Components/EmployerDashboard/DashboardEmployerSettings.tsx';
import DashboardEmployerHelp from './Components/EmployerDashboard/DashboardEmployerHelp.tsx';
import DashboardEmployerBrowseJob from './Components/EmployerDashboard/DashboardEmpolyerBrowseJob.tsx';
import AddJobForm from './Components/EmployerDashboard/AddJobForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ),
  },

   // User dashboard routes

  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/dashboard/employee",
    element: <DashboardHome />
  },
  {
    path: "dashboard/employee/list",
    element: <DashboardStatistics />
  },
  {
    path: "dashboard/employee/messages",
    element: <DashboardUsers />
  },
  {
    path: "dashboard/employee/jobrequests",
    element: <DashboardJobRequest />
  },
  {
    path: "dashboard/employee/settings",
    element: <DashboardSettings />
  },
  {
    path: "dashboard/employee/help",
    element: <DashboardHelp />
  },
  {
    path: "dashboard/employee/list/:id",
    element: <DashboardBrowseJob />
  },

    // Employer dashboard routes

  {
    path: "/dashboard/employer",
    element: <DashboardEmpoyerHome />
  },
  {
    path: "dashboard/employer/list",
    element: <DashboardEmployerStatistics />
  },
  {
    path: "dashboard/employer/messages",
    element: <DashboardEmployerUsers />
  },
  {
    path: "dashboard/employer/jobrequests",
    element: <DashboardEmployerJobRequest />
  },
  {
    path: "dashboard/employer/settings",
    element: <DashboardEmployerSettings />
  },
  {
    path: "dashboard/employer/help",
    element: <DashboardEmployerHelp />
  },
  {
    path: "dashboard/employer/list/:id",
    element: <DashboardEmployerBrowseJob />
  },
  {
    path: "dashboard/employer/list/form",
    element: <AddJobForm />
  }
]);


createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
