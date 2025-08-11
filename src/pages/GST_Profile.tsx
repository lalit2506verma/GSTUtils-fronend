import { useNavigate } from "react-router-dom";

export default function GST_Profile() {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-gray-50">
            <div className="bg-white rounded-xl shadow-md p-8">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-1">
                    GST Information
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Provide GST Number, month and year of filing.
                </p>

                {/* GST Number + Frequency */}
                <div className="flex items-center w-[70%] md:flex-row border rounded-lg overflow-hidden mb-4">
                    <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r px-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 11c0 .341-.034.675-.1.995a4.002 4.002 0 01-7.9 0A5.999 5.999 0 1112 11z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="GST Number"
                            className="w-full p-2 outline-none"
                        />
                    </div>
                    <div className="flex items-center justify-around px-3 py-2 gap-10">
                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="frequency"
                                defaultChecked
                            />
                            <span>Monthly</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="radio" name="frequency" />
                            <span>Quarterly</span>
                        </label>
                    </div>
                </div>

                {/* Month + Year + Submit */}
                <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden mb-6">
                    {/* Month Dropdown */}
                    <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r px-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                            />
                        </svg>
                        <select className="w-full p-2 outline-none">
                            <option value="">Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>

                    {/* Year Dropdown */}
                    <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r px-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                            />
                        </svg>
                        <select className="w-full p-2 outline-none">
                            <option value="">2025 (Return Year)</option>
                            {Array.from({ length: 5 }, (_, i) => {
                                const year = 2025 - i;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-600">
                        Submit
                    </button>
                </div>

                {/* Selected Info */}
                <div className="mb-4">
                    <p className="font-semibold">
                        05BCUPV5986R1ZZ{" "}
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                            Selected
                        </span>
                    </p>
                    <p className="text-sm text-gray-500">
                        <span className="font-medium">State:</span> Uttarakhand
                        /<span className="font-medium"> Period:</span> 06-2025
                    </p>
                </div>

                {/* Import Data Button */}
                <button
                    className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                    onClick={() => navigate("gst-import")}
                >
                    Import Data
                </button>
            </div>
        </div>
    );
}
