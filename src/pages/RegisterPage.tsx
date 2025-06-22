import { RegisterForm } from "@/components/register-form"

const RegisterPage = () => {
    return (

        <>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-8">
                <div className="w-full max-w-sm md:max-w-3xl min-h-[600px]">
                    <RegisterForm className="min-h-[600px]"/>
                </div>
            </div>
        </>
    )
}

export default RegisterPage