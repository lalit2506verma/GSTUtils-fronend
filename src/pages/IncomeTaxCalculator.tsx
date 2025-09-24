import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function IncomeTaxCalculator() {
    return (
        <>
            <section className="min-h-screen flex flex-col pt-24 pb-16 bg-gray-50">
                <div className="flex justify-center flex-1">
                    <div className="w-full max-w-3xl border-gray-200">
                        {/* Back button */}
                        <div className="back-button my-1">
                            <Button
                                variant="ghost"
                                onClick={() => history.back()}
                            >
                                <ChevronLeftIcon />
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default IncomeTaxCalculator;
