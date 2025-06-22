import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"


const HomePageLayout = () => {
  return (
    <>  
        <Navbar/>

        <Outlet/>
    </>
  )
}

export default HomePageLayout