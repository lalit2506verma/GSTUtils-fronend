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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePageLayout />,
        children: [
            {
                path: 'home',
                element: <HomePage />
            },

            {
                path: 'about',
                element: <AboutPage />
            },

            {
                path: 'contact',
                element: <ContactPage />
            },

            {
                path: 'user',
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'dashboard',
                        element: <UserDashboard />
                    },
                ]
            }

        ]
    },

    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },

            {
                path: 'register',
                element: <RegisterPage />,
            },
        ]
    },
]);