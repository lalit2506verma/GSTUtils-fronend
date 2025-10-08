import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useState } from "react";

function OldVsNewTaxRegimeCalculator() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <>
      <section className="min-h-screen flex flex-col pt-24 pb-16 bg-gray-50">
        <div className="flex justify-center flex-1">
          <div className="w-full max-w-5xl border-gray-200">
            {/* BACK BUTTON */}
            <div className="back-button my-1">
              <Button variant="ghost" onClick={() => history.back()}>
                <ChevronLeftIcon />
                Back
              </Button>
            </div>

            {/* OLD VS NEW TAX REGIME CALULATOR CONTENT */}
            <div className="container my-6">
              {/* HEADING */}
              <div className="header">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-normal text-balance">
                  Income Tax Calculator: FY 2024-25 & FY 2025-26
                </h1>

                {/* TAG LINE */}
                <p className="italic text-lg text-gray-600 mb-4 my-3">
                  Clear, accurate, and hassle-free tax guidance you can trust.
                </p>
              </div>

              <div className="bg-white p-6 rounded-md shadow-sm mt-5 text-gray-700">
                <h2 className="text-xl font-semibold mb-3">Confused between Old Tax or New Tax Regime?</h2>
                <p className="mb-3 text-sm">
                  Our Income Tax Calculator is designed for simplicity and
                  accuracy. It helps you quickly estimate your tax liability for
                  the new financial year, making it easier to file your ITR
                  online. Whether you prefer the traditional deductions under
                  the old tax regime or want to explore the streamlined rates of
                  the new regime, our tool guides you seamlessly through both
                  options.
                </p>

                <p className="mb-3 text-sm">
                  Stay updated with the Union Budget 2025 to plan your taxes
                  more effectively.
                </p>
              </div>

              {/* FORM  */}
              {!isSubmitted && (
                <div className="bg-gray-100 p-6 my-6 rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                </div>
                
            )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OldVsNewTaxRegimeCalculator;
