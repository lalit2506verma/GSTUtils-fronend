import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import FAQAccordion from "@/components/FAQAccordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

type Frequency = "Monthly" | "Quarterly" | "Yearly" | "Weekly" | "15-days";
type Mode = "SIP" | "Lumpsum";

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

function SIP_Page() {
  const [sipAmount, setSipAmount] = useState<number>(10000);
  const [duration, setDuration] = useState<number>(10); // In years
  const [returnRate, setReturnRate] = useState<number>(10.0);
  const [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [investedAmount, setInvestedAmount] = useState<number>(0);
  const [estimatedReturn, setEstimatedReturn] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  const [tab, setTab] = useState<Mode>("SIP");

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
        setSipAmount(num);
      }
    }
  };

  const calculateMonthlyInvestedAmount = (
    frequency: Frequency,
    sipAmount: number
  ) => {
    let monthlyInvestment = 0;
    switch (frequency) {
      case "Monthly":
        monthlyInvestment = sipAmount;
        break;
      case "Quarterly":
        monthlyInvestment = sipAmount / 3;
        break;
      case "Yearly":
        monthlyInvestment = sipAmount / 12;
        break;
      case "Weekly":
        monthlyInvestment = sipAmount * 4.345;
        break;
      case "15-days":
        monthlyInvestment = sipAmount * 2;
    }

    return monthlyInvestment;
  };

  // CALCULATE TOTAL INVESTED AMOUNT BASED ON FREQUENCY
  useEffect(() => {
    const r = returnRate / 100 / 12; // monthly rate
    const n = duration * 12; // months
    let invested = 0;
    let total = 0;

    if (tab === "SIP") {
      const p = calculateMonthlyInvestedAmount(frequency, sipAmount);

      if (r > 0) {
        total = p * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
      } else {
        total = p * n;
      }

      invested = p * n;
    } else if (tab === "Lumpsum") {
      invested = sipAmount;

      if (r > 0) {
        total = invested * Math.pow(1 + r, n);
      } else {
        total = invested;
      }
    }

    setInvestedAmount(invested);
    setEstimatedReturn(total - invested);
    setTotalValue(total);
  }, [tab, sipAmount, duration, frequency, returnRate]);

  // CALCULATE PERCENTAGES
  const { investedPercent, returnsPercent } = useMemo(() => {
    const total = totalValue;
    const investedPercent = total > 0 ? (investedAmount / total) * 100 : 0;
    const returnsPercent = total > 0 ? (estimatedReturn / total) * 100 : 0;
    return { investedPercent, returnsPercent };
  }, [investedAmount, estimatedReturn, totalValue]);

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

            {/* SIP Page Content */}
            <div className="container my-6">
              <div className="header">
                <span>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-normal text-balance">
                    SIP Calculator
                  </h1>
                </span>
                <p className="italic  text-lg text-gray-600 mb-4 my-3">
                  Find the future value of your monthly/quarterly SIP
                  investment!
                </p>
              </div>

              <div className="bg-white rounded-md shadow-sm mt-5 p-6 text-gray-700">
                <h2 className="text-xl font-semibold mb-3">What is SIP?</h2>
                <p className="mb-3 text-sm">
                  A Systematic Investment Plan (SIP) is one of the easiest and
                  most effective ways to invest in mutual funds. Instead of
                  investing a large sum at once, SIP lets you invest a fixed
                  amount at regular intervals—monthly, quarterly, or yearly.
                  This disciplined approach helps you:
                </p>
                <ul className="list-disc list-outside pl-6 mb-3">
                  <li>
                    <strong className="text-sm">Grow wealth steadily</strong>{" "}
                    with the power of compounding
                  </li>
                  <li>
                    <strong className="text-sm">Reduce market risk</strong>{" "}
                    through rupee cost averaging
                  </li>
                  <li>
                    <strong className="text-sm">Start small</strong> and
                    increase investments as your income grows
                  </li>
                  <li>
                    <strong className="text-sm">Achieve long-term goals</strong>{" "}
                    like retirement, education, or buying a home
                  </li>
                </ul>
                <p className="mb-3 text-sm">
                  Whether you’re a first-time investor or looking for a smart
                  way to build financial discipline, SIP makes investing simple,
                  affordable, and stress-free.
                </p>
              </div>

              <div className="border p-6 my-6 w-full rounded-md shadow-lg">
                {/* Add your content here */}
                <Tabs
                  value={tab}
                  onValueChange={(val) => setTab(val as Mode)}
                  className="w-full flex flex-col"
                >
                  <TabsList className="gap-10 border-0">
                    {/* SIP */}
                    <TabsTrigger value="SIP">SIP</TabsTrigger>

                    {/* LumpSum */}
                    <TabsTrigger value="Lumpsum">Lumpsum</TabsTrigger>
                  </TabsList>

                  <TabsContent className="m-4 p-6" value="SIP">
                    <div className="flex flex-col gap-4">
                      {/* FREQUENCY INPUT */}
                      <div className="flex justify-between border w-full p-4 rounded-md items-center">
                        <label
                          htmlFor="frequency"
                          className="font-medium text-gray-800 px-3"
                        >
                          Frequency
                        </label>
                        <Select
                          value={frequency}
                          onValueChange={(val) =>
                            setFrequency(val as Frequency)
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                            <SelectItem value="Quarterly">Quarterly</SelectItem>
                            <SelectItem value="Weekly">Weekly</SelectItem>
                            <SelectItem value="15-days">15-days</SelectItem>
                            <SelectItem value="Yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* SIP AMOUNT INPUT */}
                      <div className="flex flex-col justify-between border w-full p-4 rounded-md items-center">
                        <div className="flex justify-between w-full items-center">
                          <label
                            htmlFor="sipAmount"
                            className="font-medium text-gray-800 px-3"
                          >
                            SIP Amount
                          </label>

                          <div className="relative w-[180px]">
                            {/* Currency symbol */}
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg">
                              ₹
                            </span>

                            <Input
                              id="sipAmount"
                              type="text"
                              className="w-full text-right pl-6 pr-2 text-gray-600 font-semibold md:text-lg"
                              placeholder="0"
                              value={sipAmount ? formatINR(sipAmount) : ""}
                              onChange={(e) =>
                                handleInputChange(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        {/* Slider */}
                        <div className="flex w-full pt-5 items-center">
                          <Slider
                            className="[&>.relative]:bg-gray-200 [&>.relative>.absolute]:bg-cyan-500"
                            value={[sipAmount]}
                            max={200000}
                            step={100}
                            onValueChange={(val) => setSipAmount(val[0])}
                          />
                        </div>
                      </div>

                      {/* SIP DURATION INPUT */}
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
                              value={duration}
                              onChange={(e) =>
                                setDuration(Number(e.target.value))
                              }
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg ">
                              year
                            </span>
                          </div>
                        </div>

                        <div className="flex w-full pt-5 items-center">
                          <Slider
                            className="[&>.relative]:bg-gray-200 [&>.relative>.absolute]:bg-cyan-500"
                            value={[duration]}
                            max={40}
                            step={1}
                            onValueChange={(val) => setDuration(Number(val))}
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
                              value={returnRate}
                              onChange={(e) =>
                                setReturnRate(
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
                            value={[returnRate]}
                            max={30}
                            step={0.1}
                            onValueChange={(val) => setReturnRate(Number(val))}
                          />
                        </div>
                      </div>

                      {/* RESULT */}
                      <div className="border bg-gray-100 w-full p-5 rounded-md">
                        <div className="grid grid-cols-1 gap-3 pb-3 md:grid-cols-3 md:px-2">
                          {/* COLUMN 1 */}
                          <div className="flex gap-4">
                            {/* Circle Indicator*/}
                            <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-orange-500"></div>

                            {/* Value */}
                            <div className="flex w-full justify-between md:flex-col">
                              <div className="pb-1 text-sm text-gray-500 font-semibold ">
                                Invested amount
                              </div>
                              <div className="font-medium text-lg">
                                ₹&nbsp; {formatINR(investedAmount)}
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
                                Estimated returns
                              </div>
                              <div className="font-medium text-lg">
                                ₹&nbsp; {formatINR(totalValue - investedAmount)}
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
                                Total value
                              </div>
                              <div className="font-medium text-lg">
                                ₹&nbsp; {formatINR(totalValue)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bar */}
                        <div className="flex h-10 w-full rounded-md overflow-hidden text-white font-semibold text-center">
                          <motion.div
                            className="bg-orange-500 flex items-center justify-center"
                            animate={{ width: `${investedPercent}%` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            {investedPercent > 10 && (
                              <span>{investedPercent.toFixed(0)}%</span>
                            )}
                          </motion.div>
                          <motion.div
                            className="bg-cyan-500 flex items-center justify-center"
                            animate={{ width: `${returnsPercent}%` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            {returnsPercent > 10 && (
                              <span>{returnsPercent.toFixed(0)}%</span>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent className="m-4 p-6" value="Lumpsum">
                    <div className="flex flex-col gap-4">
                      {/* LumpSum AMOUNT INPUT */}
                      <div className="flex flex-col justify-between border w-full p-4 rounded-md items-center">
                        <div className="flex justify-between w-full items-center">
                          <label
                            htmlFor="lumpsum"
                            className="font-medium text-gray-800 px-3"
                          >
                            Investment amount
                          </label>

                          <div className="relative w-[180px]">
                            {/* Currency symbol */}
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg">
                              ₹
                            </span>

                            <Input
                              id="lumpsum"
                              type="text"
                              className="w-full text-right pl-6 pr-2 text-gray-600 font-semibold md:text-lg"
                              placeholder="0"
                              value={sipAmount ? formatINR(sipAmount) : ""}
                              onChange={(e) =>
                                handleInputChange(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        {/* Slider */}
                        <div className="flex w-full pt-5 items-center">
                          <Slider
                            className="[&>.relative]:bg-gray-200 [&>.relative>.absolute]:bg-cyan-500"
                            value={[sipAmount]}
                            max={1000000}
                            step={100}
                            onValueChange={(val) => setSipAmount(val[0])}
                          />
                        </div>
                      </div>

                      {/* SIP DURATION INPUT */}
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
                              value={duration}
                              onChange={(e) =>
                                setDuration(Number(e.target.value))
                              }
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg ">
                              year
                            </span>
                          </div>
                        </div>

                        <div className="flex w-full pt-5 items-center">
                          <Slider
                            className="[&>.relative]:bg-gray-200 [&>.relative>.absolute]:bg-cyan-500"
                            value={[duration]}
                            max={40}
                            step={1}
                            onValueChange={(val) => setDuration(Number(val))}
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
                              value={returnRate}
                              onChange={(e) =>
                                setReturnRate(
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
                            value={[returnRate]}
                            max={30}
                            step={0.1}
                            onValueChange={(val) => setReturnRate(Number(val))}
                          />
                        </div>
                      </div>

                      {/* RESULT */}
                      <div className="border bg-gray-100 w-full p-5 rounded-md">
                        <div className="grid grid-cols-1 gap-3 pb-3 md:grid-cols-3 md:px-2">
                          {/* COLUMN 1 */}
                          <div className="flex gap-4">
                            {/* Circle Indicator*/}
                            <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-orange-500"></div>

                            {/* Value */}
                            <div className="flex w-full justify-between md:flex-col">
                              <div className="pb-1 text-sm text-gray-500 font-semibold ">
                                Invested amount
                              </div>
                              <div className="font-medium text-lg">
                                ₹&nbsp; {formatINR(investedAmount)}
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
                                Estimated returns
                              </div>
                              <div className="font-medium text-lg">
                                ₹&nbsp; {formatINR(totalValue - investedAmount)}
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
                                Total value
                              </div>
                              <div className="font-medium text-lg">
                                ₹&nbsp; {formatINR(totalValue)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bar */}
                        <div className="flex h-10 w-full rounded-md overflow-hidden text-white font-semibold text-center">
                          <motion.div
                            className="bg-orange-500 flex items-center justify-center"
                            animate={{ width: `${investedPercent}%` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            {investedPercent > 10 && (
                              <span>{investedPercent.toFixed(0)}%</span>
                            )}
                          </motion.div>
                          <motion.div
                            className="bg-cyan-500 flex items-center justify-center"
                            animate={{ width: `${returnsPercent}%` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            {returnsPercent > 10 && (
                              <span>{returnsPercent.toFixed(0)}%</span>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Area */}
      <section className="p-10">
        <FAQAccordion items={faqList} />
      </section>
    </>
  );
}

export default SIP_Page;
