import { RegisterForm } from "@/components/register-form"
import { showToast } from "@/components/ui/toast-alert"
import { register, type TempUser } from "@/services/authenticateService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const RegisterPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRegister = async (user: TempUser) => {
        setError("")

        // data validation
        if (user.email.trim() === "") {
            alert("Enter Email ID");
            return;
        }

        if (user.password.trim() === "") {
            alert("Enter password")
            return;
        }

        if (user.username.trim() === "") {
            alert("Enter correct email ID");
            return;
        }

        if(user.password.length >= 6 && user.password.length <= 13){
            showToast("Password must be 7–12 characters long.", "warning")
        }

        setLoading(true);

        try {
            // api call
            await toast.promise(
                register(user),
                {
                    pending: "Registering user....",
                    success: "Registered Successfully",
                    error: {
                        render({ data }) {
                            // narrow the type and extract message safely
                            const err = data as any;
                            const message = err?.response?.data?.message || err?.message || "Something went wrong";

                            // make sure it's a plain string, not an object
                            return <>{message}</>;
                        }
                    }
                }
            );

            // Navigate only after success
            navigate("/auth/login");
        }
        catch (err: any) {
            setError(err);
        }
        finally {
            setLoading(false)
        }
    };
    return (

        <>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-8">
                <div className="w-full max-w-sm md:max-w-3xl min-h-[600px]">
                    <RegisterForm
                        className="min-h-[600px]"
                        onSubmit={handleRegister}
                    />
                </div>
            </div>
        </>
    )
}

export default RegisterPage