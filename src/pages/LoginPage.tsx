import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/services/auth-context'
import { login, type LoginCredentials } from '@/services/authenticateService'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setIsLoggedIn} = useAuth()


  const  handleLogin = async (credentials: LoginCredentials) => {
    setLoading(true)
    setError("")

    try {
      //data validation
      if(credentials.username.trim() === ""){
        alert("Enter a valid Name")
      }

      if(credentials.password.trim() === ""){
        alert("Enter a strong password")
      }

      console.log(credentials.username);
      console.log(credentials.password);
    
      // calling server API for sending data

      login(credentials).then((resp: string) =>{
        // success
        console.log(resp);
        console.log("Success Login");

        // storing in local storage
        localStorage.setItem("authToken", resp)

        // navigate to dashboard
        setIsLoggedIn(true)
        navigate("/user/dashboard")

      }).catch((error) => {
        console.log(error);
        console.log("Error Log");
      });

    } catch (err: any) {

      setError(err.message)

    } finally {

      setLoading(false)
    }

    // throw new Error('Function not implemented.')
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm onSubmit={handleLogin}/>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        {loading && <p className="text-muted-foreground text-sm">Logging in...</p>}
      </div>
    </div>
  )
}

export default LoginPage