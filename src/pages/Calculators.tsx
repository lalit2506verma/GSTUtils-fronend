import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import calculator_logo from "@/assets/calculator.png";
import {
  Calculator,
  Home,
  PiggyBank,
  FileText,
  Users,
  Wallet,
  LineChart,
} from "lucide-react";
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { FaCalculator } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";

const calculators = [
  {
    title: "New V/s Old Tax Regime",
    icon: <Calculator size={28} />,
    path: "tax-regime",
  },
  { title: "HRA", icon: <Home size={28} />, path: "hra" },
  { title: "Pension", icon: <PiggyBank size={28} />, path: "pension" },
  { title: "Tax Audit", icon: <FileText size={28} />, path: "tax-audit" },
  { title: "Agriculture", icon: <Users size={28} />, path: "agriculture" },
  { title: "Salary", icon: <Wallet size={28} />, path: "salary" },
  {
    title: "Mutual Fund",
    icon: <LineChart size={28} />,
    path: "mutual-fund",
  },
  { title: "SIP", icon: <GiReceiveMoney size={28} />, path: "sip" },
  { title: "EMI", icon: <BiRupee size={28} />, path: "emi" },
];

function Calculators() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center my-30 w-full">
      <Card className="md:w-[70%] sm:w-full sm:mx-4 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <span className="mr-3">
              <img
                className="w-7 h-7"
                src={calculator_logo}
                alt="Calculator_logo"
              />
            </span>
            All Calculators
          </CardTitle>
          <Separator className="my-4" />
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
            {calculators.map((calc, index) => (
              <Card
                key={index}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 transition hover:shadow-xl hover:bg-gray-200 bg-gray-100"
                onClick={() => navigate(`/resources/calculators/${calc.path}`)}
              >
                <div className="bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {calc.icon}
                </div>
                <p className="text-center font-medium">{calc.title}</p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Calculators;
