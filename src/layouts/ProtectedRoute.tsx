import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("authToken");

    // checking token is present or not
    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <SidebarProvider>
            {/* Use grid with fixed sidebar width + flexible main */}
            <div className="grid grid-cols-[250px_1fr] min-h-screen">
                <AppSidebar />
                <main className="p-4">
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
};

export default ProtectedRoute;
