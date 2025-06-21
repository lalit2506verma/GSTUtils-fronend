import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { indianStates } from "@/data/states";
import { Link } from "react-router-dom"



const RegisterPage = () => {
    return (
        <>
            <section className="flex justify-center items-center h-screen">

                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form>
                            <div className="grid gap-4">

                                <div className="grid grid-cols-2 gap-4">

                                    {/* First Name */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" placeholder="Arpit" required />
                                    </div>

                                    {/* Last Name */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" placeholder="Verma" required />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="phoneNumber">Phone Number</Label>
                                        <Input id="phoneNumber" placeholder="+91 98765 43210" required />
                                    </div>

                                    {/* state dropdown */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="state">Select State: </Label>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {indianStates.map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" placeholder="*********" required />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input id="confirm-password" placeholder="*********" required />
                                </div>

                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                Sign Up with Google
                            </Button>
                            <Button variant="outline" className="w-full">
                                Sign Up with Apple
                            </Button>

                        </div>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link to={'/login'} className="underLine">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

            </section>
        </>
    )
}

export default RegisterPage