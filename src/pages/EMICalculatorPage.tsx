import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import FAQAccordion from "@/components/FAQAccordion";


const faqList = [
  {
    question: "How does SIP work?",
    answer:
      "When you start a SIP, a fixed amount is automatically debited from your bank account and invested in a mutual fund of your choice. Over time, this helps you accumulate units of the fund at different price points, which averages out your cost. This strategy is known as rupee cost averaging. Plus, your returns get reinvested, allowing you to benefit from compounding—earning returns on your returns.",
  },
  {
    question: "How is SIP different from lump sum investment?",
    answer:
      "With SIP, you invest smaller amounts periodically, which helps reduce the risk of market timing. Lump sum investments, on the other hand, involve investing a large amount at once, which can be risky if the market is at a peak. SIPs are ideal for salaried individuals or anyone looking to build wealth gradually without needing to monitor the market daily.",
  },
  {
    question: "What is the ideal duration for a SIP?",
    answer:
      "SIPs work best when held for the long term—typically 5 years or more. The longer you stay invested, the more you benefit from compounding. Short-term SIPs may not give you the full advantage of market growth and reinvested returns.",
  },
  {
    question: "Does SIP account for inflation?",
    answer:
      "Most basic SIP calculators don’t factor in inflation directly. However, some advanced tools (like goal-based calculators) allow you to input an inflation rate to see the real value of your future corpus. This helps you plan better for long-term goals like retirement or education.",
  },
];

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [loanTenure, setLoanTenure] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [monthlyEMI, setMonthlyEMI] = useState<number>(0);

  // CONVERT NUMBER IN INDIAN FORMAT STYLE
  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleInputChange = (val: String) => {
    const raw = val.replace(/,/g, ""); // remove commas
    if (/^\d*$/.test(raw)) {
      const num = raw === "" ? 0 : Number(raw);
      // clamp to slider max
      if (num <= 200000) {
        setLoanAmount(num);
      }
    }
  };

  // CALCULATE EMI
  useEffect(() => {
    if (!loanAmount || !loanTenure || !interestRate) return;

    // Convert annual interest rate (%) to monthly decimal
    const monthlyRate = interestRate / 12 / 100;

    // Total number of months
    const numberOfMonths = loanTenure * 12;

    // EMI formula: [P * r * (1+r)^n] / [(1+r)^n - 1]
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    // Total payment over the tenure
    const totalPayment = emi * numberOfMonths;

    // Total interest = total payment - principal
    const totalInterest = totalPayment - loanAmount;

    // Update state
    setMonthlyEMI(Math.round(emi));
    setTotalInterest(Math.round(totalInterest));
  }, [loanAmount, loanTenure, interestRate]);

  // CALCULATE PERCENTAGES
  const { loanAmountPercent, interestPercent } = useMemo(() => {
    const total = loanAmount + totalInterest;
    const loanAmountPercent = total > 0 ? (loanAmount / total) * 100 : 0;
    const interestPercent = total > 0 ? (totalInterest / total) * 100 : 0;
    return { loanAmountPercent, interestPercent };
  }, [loanAmount, totalInterest])

  return (
    <>
      <div className="min-h-screen flex flex-col pt-24 pb-16 bg-gray-50">
        <div className="flex justify-center flex-1">
          <div className="w-full max-w-5xl border-gray-200">
            {/* Back button */}
            <div className="back-button my-1">
              <Button variant="ghost" onClick={() => history.back()}>
                <ChevronLeftIcon />
                Back
              </Button>
            </div>

            {/* EMI CALCULATOR */}
            <div className="container my-6">
              <div className="header">
                <span>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-normal text-balanced">
                    EMI Calculator
                  </h1>
                </span>

                <p className="italic text-lg text-gray-600 mb-4 my-3">
                  Your Loan, Your Terms—Calculated
                </p>
              </div>

              <div className="bg-white rounded-md shadow-sm mt-5 p-6 text-gray-700">
                <h2 className="text-xl font-semibold mb-3">
                  Take Control of Your EMIs
                </h2>
                <p className="mb-3 text-sm">
                  Looking to buy your dream home, invest in a car, or fund a
                  personal goal? An EMI calculator is the perfect tool to
                  simplify your loan planning. By entering just three key
                  details—loan amount, interest rate, and tenure—you’ll
                  instantly get your monthly repayment amount. It’s fast,
                  accurate, and designed to take the guesswork out of financial
                  commitments.
                </p>

                <p className="mb-3 text-sm">
                  This smart calculator empowers you to budget better and make
                  confident borrowing decisions. Whether you're comparing loan
                  offers or planning your monthly expenses, it gives you clarity
                  and control. With precise figures at your fingertips, managing
                  debt becomes less stressful and far more efficient.
                </p>

                <p className="mb-3 text-sm">
                  For instance, if you borrow ₹10 lakhs at 12% annual interest
                  over 5 years, the calculator will show a monthly EMI of
                  ₹22,244. Over the loan period, you’ll pay ₹3,34,667 in
                  interest. With insights like these, you can plan smarter and
                  stay financially ahead.
                </p>
              </div>

              <div className="border p-6 my-6 w-full rounded-md shadow-lg">
                {/* SIP AMOUNT INPUT */}
                <div className="flex flex-col justify-between border w-full p-4 rounded-md items-center">
                  <div className="flex justify-between w-full items-center">
                    <label
                      htmlFor="loanAmount"
                      className="font-medium text-gray-800 px-3"
                    >
                      Loan Amount
                    </label>

                    <div className="relative w-[180px]">
                      {/* Currency symbol */}
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg">
                        ₹
                      </span>

                      <Input
                        id="loanAmount"
                        type="text"
                        className="w-full text-right pl-6 pr-2 text-gray-600 font-semibold md:text-lg"
                        placeholder="0"
                        value={loanAmount ? formatINR(loanAmount) : ""}
                        onChange={(e) => handleInputChange(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Slider */}
                  <div className="flex w-full pt-5 items-center">
                    <Slider
                      className="[&>.relative]:bg-gray-200 [&>.relative>.absolute]:bg-cyan-500"
                      value={[loanAmount]}
                      max={10000000}
                      step={1000}
                      onValueChange={(val) => setLoanAmount(val[0])}
                    />
                  </div>
                </div>

                {/* LOAN TENURE INPUT */}
                <div className="flex flex-col justify-between border w-full p-4 rounded-md items-center">
                  <div className="flex justify-between w-full items-center">
                    <label
                      htmlFor="duration"
                      className="font-medium text-gray-800 px-3"
                    >
                      Investment duration
                    </label>

                    <div className="relative w-[180px]">
                      <Input
                        className="w-full text-left pr-6 pl-2 text-gray-500 font-semibold md:text-lg"
                        type="text"
                        placeholder="0"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg ">
                        year
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full pt-5 items-center">
                    {/* Slider */}
                    <Slider
                      className="[&>.relative]:bg-gray-200 [&>.relative>.absolute]:bg-cyan-500"
                      value={[loanTenure]}
                      max={50}
                      step={1}
                      onValueChange={(val) => setLoanTenure(Number(val))}
                    />
                  </div>
                </div>

                {/* RETURN RATE INPUT */}
                <div className="flex flex-col justify-between border w-full p-4 rounded-md items-center">
                  <div className="flex justify-between w-full items-center">
                    <label
                      htmlFor="returnRate"
                      className="font-medium text-gray-800 px-3"
                    >
                      Expected rate of return
                    </label>

                    <div className="relative w-[180px]">
                      <Input
                        id="returnRate"
                        className="w-full text-left pr-6 pl-2 text-gray-500 font-semibold md:text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                            [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        step="any" // allows decimals like 5.25
                        placeholder="0"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value)
                          )
                        }
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg ">
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full pt-5 items-center">
                    <Slider
                      className="[&>.relative]:bg-gray-200 [&>.relative>.absolute]:bg-cyan-500"
                      value={[interestRate]}
                      max={30}
                      step={0.1}
                      onValueChange={(val) => setInterestRate(Number(val))}
                    />
                  </div>
                </div>

                {/* RESULT */}
                <div className="border bg-gray-100 w-full p-5 rounded-md">
                  <div className="grid grid-cols-1 gap-3 pb-3 md:grid-cols-4 md:px-2">
                    {/* COLUMN 1 */}
                    <div className="flex gap-4">
                      {/* Circle Indicator*/}
                      <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-orange-500"></div>

                      {/* Value */}
                      <div className="flex w-full justify-between md:flex-col">
                        <div className="pb-1 text-sm text-gray-500 font-semibold ">
                          Principal amount
                        </div>
                        <div className="font-medium text-lg">
                          ₹&nbsp; {formatINR(loanAmount)}
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 2 */}
                    <div className="flex gap-4">
                      {/* Circle Indicator */}
                      <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-cyan-500"></div>

                      {/* Value */}
                      <div className="flex w-full justify-between md:flex-col">
                        <div className="pb-1 text-sm text-gray-500 font-semibold">
                          Total Interest
                        </div>
                        <div className="font-medium text-lg">
                          ₹&nbsp; {formatINR(totalInterest)}
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 3 */}
                    <div className="flex gap-4">
                      {/* Circle Indicator */}
                      <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-transparent"></div>

                      {/* Value */}
                      <div className="flex w-full justify-between md:flex-col">
                        <div className="pb-1 text-sm text-gray-500 font-semibold">
                          Monthly EMI
                        </div>
                        <div className="font-medium text-lg">
                          ₹&nbsp; {formatINR(monthlyEMI)}
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 4 */}
                    <div className="flex gap-4">
                      {/* Circle Indicator */}
                      <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-transparent"></div>

                      {/* Value */}
                      <div className="flex w-full justify-between md:flex-col">
                        <div className="pb-1 text-sm text-gray-500 font-semibold">
                          Total value
                        </div>
                        <div className="font-medium text-lg">
                          ₹&nbsp; {formatINR(loanAmount + totalInterest)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="flex h-10 w-full rounded-md overflow-hidden text-white font-semibold text-center">
                    <motion.div
                      className="bg-orange-500 flex items-center justify-center"
                      animate={{ width: `${loanAmountPercent}%` }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {loanAmountPercent > 10 && (
                        <span>{loanAmountPercent.toFixed(0)}%</span>
                      )}
                    </motion.div>
                    <motion.div
                      className="bg-cyan-500 flex items-center justify-center"
                      animate={{ width: `${interestPercent}%` }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {interestPercent > 10 && (
                        <span>{interestPercent.toFixed(0)}%</span>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="p-10">
        <FAQAccordion items={faqList}/>
      </section>
    </>
  );
}
