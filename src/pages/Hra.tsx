import { Button } from "@/components/ui/button";
import FAQAccordion from "@/components/FAQAccordion";
import { ChevronLeftIcon, CircleAlert } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export default function hra() {
  const faqList = [
    {
      question: "Can I claim HRA by paying rent to parents?",
      answer:
        "Many salaried individuals live in their parents’ home instead of staying in rented accommodation. If you receive a House Rent Allowance (HRA) and reside with your parents, you can still claim an exemption by paying rent to them. To qualify, your parents must be the legal owners of the property, and the rent you pay should be reported by them as “income from house property” in their income tax returns.",
    },
    {
      question:
        "What should I do if I forgot to submit the rent receipts to my employer?",
      answer:
        "The good news is that HRA can also be claimed directly while filing your income tax return. Even if you did not submit rent receipts to your employer during proof submission, you can still claim the benefit at the time of filing. To do this, recalculate your taxable income by factoring in the HRA exemption and compute the tax payable on the reduced amount. If excess tax has already been deducted, you will be eligible to receive a refund.",
    },
    {
      question: "Can I claim HRA if I'm also claiming home loan deductions?",
      answer:
        "Yes, it is possible. If you own a home and are repaying a home loan but reside in a rented property, you can still claim HRA. In such cases, you are eligible to avail both benefits—home loan deductions and HRA exemption—thereby reducing your taxable income.",
    },
    {
      question: "What should I do if my landlord doesn't give me his PAN?",
      answer:
        "If your annual rent exceeds ₹1,00,000 and your landlord is an individual or HUF, you are required to provide their PAN to your employer for tax deduction purposes. If your landlord refuses to share their PAN, you can still claim the HRA exemption by submitting a declaration to your employer stating that you have requested the PAN but have not received it. In this case, your employer will deduct tax on the entire HRA amount without considering any exemption. However, you can still claim the HRA exemption when filing your income tax return by providing the necessary details and rent receipts.",
    },
  ];

  const [submitted, setSubmitted] = useState(false);
  const [basicSalary, setBasicSalary] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [isMetroCity, setIsMetroCity] = useState<boolean | null>(null);
  const [financialYear, setFinancialYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // CALCULATE HRA EXEMPTION
    const rentMinus10PercentOfBasic = rentPaid - 0.1 * basicSalary;
    const percentageOfBasic = isMetroCity
      ? 0.5 * basicSalary
      : 0.4 * basicSalary;

    const hraExemption = Math.min(
      hraReceived,
      rentMinus10PercentOfBasic,
      percentageOfBasic
    );

    // SET THE SUBMITTED TO TRUE
    setSubmitted(true);
  };

  const handleCalculateAgain = (e: React.FormEvent) => {
    e.preventDefault();
    // SET THE SUBMITTED TO FALSE
    setSubmitted(false);
  };

  const handleIsMetroCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "true") {
      setIsMetroCity(true);
    } else if (value === "false") {
      setIsMetroCity(false);
    } else {
      setIsMetroCity(null);
    }
  };

  return (
    <>
      <section className="min-h-screen flex flex-col pt-24 pb-16 bg-gray-50">
        <div className="flex justify-center flex-1">
          <div className="w-full max-w-3xl border-gray-200">
            {/* Back button */}
            <div className="back-button my-1">
              <Button variant="ghost" onClick={() => history.back()}>
                <ChevronLeftIcon />
                Back
              </Button>
            </div>

            {/* HRA Page Content */}
            <div className="container my-6">
              <div className="header">
                <span>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                    HRA Calculator
                  </h1>
                </span>

                <p className="italic text-lg text-gray-600 mb-4 my-3">
                  Save more by smartly calculating your House Rent Allowance!
                </p>
              </div>

              <div className="bg-white p-6 rounded-md shadow-sm mt-5 text-gray-700 ">
                <h2 className="text-xl font-semibold mb-3">What is HRA?</h2>
                <p className="mb-3 text-sm">
                  If you're a salaried professional, you could be missing out on
                  significant tax benefits from House Rent Allowance (HRA). This
                  tool helps you figure out exactly how much HRA you can claim
                  as exemption — fast, simple, and accurate!
                </p>
                <p className="mb-3 text-sm">
                  The exemption is calculated as the lowest of the following:
                </p>
                <ul className="list-disc list-inside pl-4 mb-3">
                  <li>
                    <strong className="text-sm">Actual HRA received</strong>
                  </li>
                  <li>
                    <strong className="text-sm">
                      Rent paid - 10% of Basic Salary
                    </strong>
                  </li>
                  <li>
                    <strong className="text-sm">50% of Basic Salary</strong>{" "}
                    (for metro cities) or{" "}
                    <strong className="text-sm">40%</strong> otherwise
                  </li>
                </ul>

                {/* Additional Information - Alert */}
                <Alert variant="destructive" className="my-5">
                  <AlertTitle className="flex items-center gap-2 text-sm">
                    <CircleAlert size={20} />
                    <span>
                      If you dont receive HRA, you can now claim up to{" "}
                      <strong className="text-sm">
                        ₹60,000 per year as rent paid under Section 80GG.
                      </strong>
                    </span>
                  </AlertTitle>
                </Alert>

                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-semibold mb-2 text-sm">Example:</h3>
                  <p className="text-sm">
                    Arun lives in Mumbai, earns ₹50,000/month, receives HRA of
                    ₹25,000/month and pays ₹15,000/month as rent.
                  </p>
                  <ul className="list-disc list-inside mt-2 text-sm">
                    <li>HRA received: ₹3,00,000</li>
                    <li>Rent paid - 10% of salary: ₹1,20,000</li>
                    <li>50% of salary: ₹3,00,000</li>
                  </ul>
                  <p className="mt-2 font-semibold text-green-600 text-sm">
                    Exemption = ₹1,20,000 (lowest of above)
                  </p>
                </div>
              </div>
              {!submitted && (
                <div className="text-center mt-8">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Start calculating yours now{" "}
                    <span className="animate-bounce inline-block">👇</span>
                  </h2>
                </div>
              )}
            </div>

            {!submitted ? (
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="bg-gray-100 p-6 my-6 rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Financial Year *
                  </label>
                  <select
                    onChange={(e) => setFinancialYear(e.target.value)}
                    value={financialYear}
                    className="w-full border border-gray-400 p-2 rounded-md focus:ring focus:ring-blue-200"
                  >
                    <option value="">-- Select --</option>
                    <option value="2025">2024-2025</option>
                    <option value="2024">2023-2024</option>
                    <option value="2023">2022-2023</option>
                    <option value="2022">2021-2022</option>
                    <option value="2021">2020-2021</option>
                    <option value="2020">2019-2020</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    onChange={(e) => handleIsMetroCityChange(e)}
                    className="w-full border border-gray-400 p-2 rounded-md focus:ring focus:ring-blue-200"
                  >
                    <option value="">-- Select --</option>
                    <option value="true">Mumbai</option>
                    <option value="true">Delhi</option>
                    <option value="true">Bangalore</option>
                    <option value="true">Kolkata</option>
                    <option value="false">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ₹ Rent Paid P.A. *
                  </label>
                  <input
                    value={rentPaid}
                    onChange={(e) => setRentPaid(Number(e.target.value))}
                    type="number"
                    className="w-full border border-gray-400 p-2 rounded-md"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ₹ Basic Salary P.A. *
                  </label>
                  <input
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                    type="number"
                    className="w-full border border-gray-400 p-2 rounded-md"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ₹ HRA Received P.A. *
                  </label>
                  <input
                    value={hraReceived}
                    onChange={(e) => setHraReceived(Number(e.target.value))}
                    type="number"
                    className="w-full border border-gray-400 p-2 rounded-md"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-400 p-2 rounded-md"
                    placeholder="Email"
                  />
                </div>
                <div className="flex md:col-span-2 lg:col-span-3 mt-8 justify-center">
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                  >
                    Calculate HRA
                  </button>
                </div>
              </form>
            ) : (
              <div className="border h-[200px]"></div>
            )}
          </div>
        </div>
      </section>

      <section className="p-10">
        <FAQAccordion items={faqList} />
      </section>
    </>
  );
}
