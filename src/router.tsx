import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import HomePageLayout from "./layouts/HomePageLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthLayout from "./layouts/AuthLayout";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Calculators from "./pages/Calculators";
import HRA from "./pages/Hra";
import GST_Tools from "./pages/GST_Tools";
import GST_Profile from "./pages/GST_Profile";
import GST_Import from "./pages/GST_Import";
import SIP_Page from "./pages/SIP_Page";
import EMICalculatorPage from "./pages/EMICalculatorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },

      {
        path: "about",
        element: <AboutPage />,
      },

      {
        path: "contact",
        element: <ContactPage />,
      },

      {
        path: "resources/calculators",
        element: <Calculators />,
      },

      {
        path: "resources/calculators/hra",
        element: <HRA />,
      },
      {
        path: "resources/calculators/sip",
        element: <SIP_Page />,
      },
      {
        path: "resources/calculators/emi",
        element: <EMICalculatorPage />,
      },
      {
        path: "user",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <UserDashboard />,
          },

          {
            path: "dashboard",
            element: <UserDashboard />,
          },

          {
            path: "dashboard/gst-tool",
            element: <GST_Tools />,
            children: [
              {
                index: true,
                element: <GST_Profile />,
              },

              {
                path: "gst-profile",
                element: <GST_Profile />,
              },

              {
                path: "gst-import",
                element: <GST_Import />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
