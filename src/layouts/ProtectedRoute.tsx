import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = localStorage.getItem("authToken")

    // checking token is present or not
    if(!token){
        return <Navigate to="/auth/login" replace />
    }
    
  return (
      <>
          <SidebarProvider>
              <AppSidebar />
              <main>
                  <SidebarTrigger />
                  <Outlet />
              </main>
          </SidebarProvider>
      </>
  );
}

export default ProtectedRoute