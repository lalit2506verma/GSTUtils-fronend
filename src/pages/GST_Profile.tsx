import { addGstin, fetchGstinList, updateGstin } from "@/services/GstinService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { months, states } from "@/data/states";
import { toast } from "react-toastify";
import type { ReceiverGstinInfo } from "@/services/GstinService";

export type GstinInfo = {
    gstin: string;
    frequency: "Monthly" | "Quarterly";
    returnMonth: string;
    returnYear: string;
    state: string;
};

function getStateFromGstin(gstin: string) {
    if (!gstin || gstin.length < 2) return "";
    return states[gstin.substring(0, 2)] || "Unknown";
}

export default function GST_Profile() {
    // Get userID from local storage
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const [gstin, setGstin] = useState("");
    const [frequency, setFrequency] = useState<"Monthly" | "Quarterly">(
        "Monthly"
    );
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("2025");
    const [gstinList, setGstinList] = useState<ReceiverGstinInfo[]>([]);
    const [selectedGstin, setSelectedGstin] = useState<GstinInfo | null>(null);

    // Fetch existing GSTINs from database
    useEffect(() => {
        if (!token) {
            console.log("User not logged in");
            return;
        }

        const fetchData = async () => {
            try {
                const data = await fetchGstinList(token);
                console.log("Raw API Response:", data);

                setGstinList(data);
            } catch (err) {
                console.error("Error fetching GSTINs:", err);
            }
        };

        fetchData();
    }, [token]);

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // return if any field is empty
        if (!gstin || !month || !year || !frequency) return;
        // extract state from gstin
        const state = getStateFromGstin(gstin);

        const newGstin: GstinInfo = {
            gstin,
            frequency,
            returnMonth: month,
            returnYear: year,
            state,
        };
        console.log("from handleSubmit:", newGstin);

        setSelectedGstin(newGstin);
    };

    // Handle select from GSTIN list
    const handleSelect = (info: ReceiverGstinInfo) => {
        // two way binding for all the fields
        setGstin(info.gstinNumber);
    };

    // Handle import submit
    const handleImportSubmit = () => {
        // Validate selection fields are filled before navigating
        if (!gstin || !month || !year || !frequency) {
            toast.error("Please fill all fields before importing.");
            return;
        }

        if (!selectedGstin) {
            console.error("No GSTIN selected for import");
            return;
        }
        console.log("Importing data for:", selectedGstin);

        // Before navigating,
        // ensure if GSTIN already exists in the gstinList -> Update API call to update 'used' timestamp
        // else -> Add API call to add new GSTIN

        const existingGSTIN = gstinList.find(
            (g) => g.gstinNumber === selectedGstin.gstin
        );

        if (existingGSTIN) {
            // Update existing GSTIN
            updateGstin(token!, selectedGstin.gstin)
                .then(() => console.log("GSTIN updated successfully"))
                .catch((err) => console.log("Error updating GSTIN:", err));
        } else {
            // Add new GSTIN
            addGstin(token!, selectedGstin)
                .then(() => console.log("GSTIN added successfully"))
                .catch((err) => console.log("Error adding GSTIN:", err));
        }

        navigate("/user/dashboard/gst-tool/gst-import", {
            state: { selectedGstin },
        });
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen flex flex-col items-center py-8">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-3xl">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-1">
                    GST Information
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Provide GST Number, month and year of filing.
                </p>

                {/* GST Info Form */}
                <form onSubmit={handleSubmit}>
                    {/* GST Number + Frequency */}
                    <div className="flex items-center w-full md:flex-row border rounded-lg overflow-hidden mb-4">
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
                                value={gstin}
                                onChange={(e) =>
                                    setGstin(e.target.value.toUpperCase())
                                }
                                maxLength={15}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-around px-3 py-2 gap-10">
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="frequency"
                                    checked={frequency === "Monthly"}
                                    onChange={() => setFrequency("Monthly")}
                                />
                                <span>Monthly</span>
                            </label>
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="frequency"
                                    checked={frequency === "Quarterly"}
                                    onChange={() => setFrequency("Quarterly")}
                                />
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
                            <select
                                className="w-full p-2 outline-none"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                required
                            >
                                <option value="">Month</option>
                                {Object.entries(months).map(([Key, value]) => (
                                    <option key={Key} value={Key}>
                                        {value}
                                    </option>
                                ))}
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
                            <select
                                className="w-full p-2 outline-none"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            >
                                <option value="">2025 (Return Year)</option>
                                {Array.from({ length: 5 }, (_, i) => {
                                    const y = 2025 - i;
                                    return (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* Selected Info Block */}
                {selectedGstin && (
                    <div className="mb-4 border rounded-lg p-4 bg-blue-50 flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <p className="font-semibold text-lg">
                                {selectedGstin.gstin}{" "}
                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ml-2">
                                    Current
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">State:</span>{" "}
                                {selectedGstin.state} /
                                <span className="font-medium"> Period:</span>{" "}
                                {selectedGstin.returnMonth}-
                                {selectedGstin.returnYear}
                            </p>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-3 md:mt-0"
                            onClick={() => handleImportSubmit()}
                        >
                            <svg
                                className="inline-block mr-2"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 5v14m7-7H5"></path>
                            </svg>
                            Import Data
                        </button>
                    </div>
                )}

                {/* Help link */}
                <div className="flex justify-end mb-2">
                    <a
                        href="#"
                        className="text-cyan-600 text-sm hover:underline flex items-center"
                    >
                        Need Help ? Read the Guide
                        <svg
                            className="ml-1"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 4v16m8-8H4"></path>
                        </svg>
                    </a>
                </div>
            </div>

            {/* GSTIN List */}
            <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl mt-8">
                <h3 className="text-xl font-semibold mb-2 text-center">
                    GSTIN List{" "}
                    <span className="text-gray-400 text-sm">
                        ( Added:{gstinList.length} / Limit:20 )
                    </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {gstinList.map((info) => (
                        <div
                            key={info.gstinNumber}
                            className={`border rounded-lg p-4 flex flex-col items-center ${
                                selectedGstin?.gstin === info.gstinNumber
                                    ? "border-blue-500 bg-blue-50"
                                    : "bg-gray-50"
                            }`}
                        >
                            <p className="font-semibold">{info.gstinNumber}</p>
                            <p className="text-xs text-gray-500 mb-2">
                                <span className="font-medium">Added:</span>{" "}
                                {info.createdAt} /{" "}
                                <span className="font-medium">Used:</span>{" "}
                                {info.updatedAt}
                            </p>
                            <button
                                className={`px-4 py-1 rounded text-white text-sm ${
                                    selectedGstin?.gstin === info.gstinNumber
                                        ? "bg-blue-500"
                                        : "bg-blue-400 hover:bg-blue-500"
                                }`}
                                onClick={() => handleSelect(info)}
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
