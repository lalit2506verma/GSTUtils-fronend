import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import meesho_logo from "@/assets/meesho.png";
import amazon_logo from "@/assets/amazon.png";
import flipkart_logo from "@/assets/flipkart.png";
import myntra_logo from "@/assets/myntra.png";
import jioMart_logo from "@/assets/jiomart.png";
import snapDeal_logo from "@/assets/snapdeal.png";
import glowroad_logo from "@/assets/glowroad.png";
import limeroad_logo from "@/assets/limeroad.png";

export default function GST_Import() {

    const platforms = [
        { name: "Meesho", type: "B2C", logo: meesho_logo },
        { name: "Amazon", type: "B2C", logo: amazon_logo },
        { name: "Amazon B2B", type: "B2B", logo: amazon_logo },
        {
            name: "Flipkart",
            type: "B2C & B2B Sales Report",
            logo: flipkart_logo,
        },
        { name: "Myntra", type: "B2C", logo: myntra_logo },
        { name: "Snapdeal", type: "B2C", logo: snapDeal_logo },
        { name: "Glowroad", type: "B2C", logo: glowroad_logo },
        { name: "Limeroad", type: "B2C", logo: limeroad_logo },
        { name: "JioMart", type: "B2C", logo: jioMart_logo },
    ];
    return (
        <div className="p-6">
            {/* Warning text */}
            <p className="text-red-500 text-center mb-4 font-medium">
                Caution: Avoid importing the edited file to prevent potential
                errors.
            </p>

            {/* Section heading */}
            <div className="flex items-center mb-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 font-medium">
                    Famous Platforms
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {platforms.map((platform) => (
                    <Card
                        key={platform.name}
                        className="flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
                    >
                        <CardHeader className="flex flex-col items-center w-full">
                            <img
                                src={platform.logo}
                                alt={platform.name}
                                className="w-16 h-16 object-contain mb-2"
                            />
                            <CardTitle>{platform.name}</CardTitle>
                            <p className="text-gray-500 text-sm">
                                {platform.type}
                            </p>
                        </CardHeader>
                        <CardFooter>
                            <Dialog>
                                <form>
                                    <DialogTrigger asChild>
                                        <Button variant="secondary" className="rounded-full hover:bg-gray-200">
                                            Import Data
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-center">
                                                Edit profile
                                            </DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile
                                                here. Click save when
                                                you&apos;re done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name-1">
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name-1"
                                                    name="name"
                                                    defaultValue="Pedro Duarte"
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="username-1">
                                                    Username
                                                </Label>
                                                <Input
                                                    id="username-1"
                                                    name="username"
                                                    defaultValue="@peduarte"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button type="submit">
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </form>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
