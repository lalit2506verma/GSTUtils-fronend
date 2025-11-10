import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import meesho_logo from "@/assets/meesho.png";
import amazon_logo from "@/assets/amazon.png";
import flipkart_logo from "@/assets/flipkart.png";
import myntra_logo from "@/assets/myntra.png";
import jioMart_logo from "@/assets/jiomart.png";
import snapDeal_logo from "@/assets/snapdeal.png";
import glowroad_logo from "@/assets/glowroad.png";
import limeroad_logo from "@/assets/limeroad.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { months } from "@/data/states";

type PlatformFile = {
  label: string;
  fileType: string;
  fileDownloadPath?: string;
  instruction?: string;
};

type Platform = {
  name: string;
  type: string;
  logo: string;
  link: string;
  downloadPath?: string;
  files: PlatformFile[];
};

// EXAMPLE STRUCTURE OF USESTATE
// {
//   Meesho: {
//     sales_files: [
//       { label: "tcs_sales.xlsx", file: File1 },
//       { label: "tcs_sales_return.xlsx", file: File2 },
//     ],
//     invoice_files: [
//       { label: "Tax_invoice_details.xlsx", file: File3 }
//     ]
//   },
//   Amazon: {
//     sales_files: [
//       { label: "MTR_B2C File", file: File4 }
//     ]
//   }
// }

type FileEntry = {
  label: string;
  file: File | null;
};

type PlatformFileMap = Record<string, Record<string, FileEntry[]>>;

function CustomFileInput({
  label,
  file,
  setFile,
}: {
  label: string;
  file: File | null;
  setFile: (File: File | null) => void;
}) {
  const inputId = label.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  console.log(label);
  console.log(file);  
  
  return (
    <div className="flex mb-2">
      <label
        htmlFor={inputId}
        className="bg-gray-200 px-4 py-2 rounded-l cursor-pointer font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="file"
        accept=".xlsx"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <span className="flex-1 border rounded-r px-2 py-2 bg-white text-gray-500 text-sm">
        {file ? file.name : "No file chosen"}
      </span>
    </div>
  );
}

export default function GST_Import() {
  // Selected GSTIN information
  const location = useLocation();
  const selectedGstin = location.state?.selectedGstin;

  // State: { [platformName]: { [fileLabel]: File | null } }
  const [platformFiles, setPlatformFiles] = useState<PlatformFileMap>({});

  // GET MONTH NAME
  const monthName = (monthNumber: string) => {
    return months[monthNumber] || "Unknown Month";
  };

  const platforms: Platform[] = [
    {
      name: "Meesho",
      type: "B2C",
      logo: meesho_logo,
      link: "meesho.com",
      downloadPath: "Meesho Panel -> Payments -> Download GST Reports",
      files: [
        { label: "tcs_sales.xlsx", fileType: "sales" },
        { label: "tcs_sales_return.xlsx", fileType: "sales" },
        {
          label: "Tax_invoice_details.xlsx",
          fileType: "invoice",
          fileDownloadPath: "Meesho Panel → Payments → Tax Invoice",
          instruction:
            "Unzip the file and upload only the Excel (Tax_invoice_details.xlsx) file.",
        },
      ],
    },
    {
      name: "Amazon",
      type: "B2C",
      logo: amazon_logo,
      link: "amazon.in",
      downloadPath:
        "Reports -> Manage Taxes -> GST Monthly Reports -> Download Report -> Select Merchant Tax Report (MTR) -> select (B2C) -> Select Year and Month -> Download Report.",
      files: [{ label: "MTR_B2C File", fileType: "sales" }],
    },
    {
      name: "Amazon B2B",
      type: "B2B",
      logo: amazon_logo,
      link: "amazon.in",
      downloadPath:
        "Reports -> Manage Taxes -> GST Monthly Reports -> Download Report -> Select Merchant Tax Report (MTR) -> select (B2B) -> Select Year and Month -> Download Report.",
      files: [{ label: "MTR_B2C File", fileType: "sales" }],
    },
    {
      name: "Flipkart",
      type: "B2C & B2B",
      logo: flipkart_logo,
      link: "flipkart.com",
      downloadPath: "Flipkart Portal -> Report -> Tax Reports -> Sales report",
      files: [{ label: "Sales Report", fileType: "sales" }],
    },
    {
      name: "Myntra",
      type: "B2C",
      logo: myntra_logo,
      link: "myntra.com",
      downloadPath:
        "Partner Portal -> Financial Reports -> Monthly Reports -> Select Month -> Download Below Required Reports",
      files: [
        { label: "GSTR Report Packed", fileType: "sales" },
        { label: "GSTR Report RTO", fileType: "sales" },
        { label: "GSTR Report RT", fileType: "invoice" },
      ],
    },
    {
      name: "Snapdeal",
      type: "B2C",
      logo: snapDeal_logo,
      link: "snapdeal.com",
      downloadPath:
        "Snapdeal Panel -> Payments -> GST Report -> Request Report -> Download report",
      files: [{ label: "GSTR Return Report", fileType: "invoice" }],
    },
    {
      name: "Glowroad",
      type: "B2C",
      logo: glowroad_logo,
      link: "glowroad.com",
      downloadPath:
        "Glowroad Portal -> My Earnings -> Download ->GST Reports & Invoices -> Select Year and Month -> Download",
      files: [{ label: "GST Reports", fileType: "sales" }],
    },
    {
      name: "Limeroad",
      type: "B2C",
      logo: limeroad_logo,
      link: "limeroad.com",
      downloadPath:
        "Limeroad Portal -> Report -> Tax Reports -> GSTR return report",
      files: [{ label: "GSTR Report", fileType: "sales" }],
    },
    {
      name: "JioMart",
      type: "B2C",
      logo: jioMart_logo,
      link: "jiomart.com",
      downloadPath:
        "Jiomart Portal -> Reports -> View Generated Reports -> Invoice reports -> Monthly -> Download",
      files: [{ label: "GSTR Report", fileType: "sales" }],
    },
  ];

  // ========================= FILE CHANGE HANDLER =========================
  const handleFileUploadChange = (
    platform: string,
    fileType: string,
    label: string,
    newFile: File | null
  ) => {
    if (!newFile) return;

    setPlatformFiles((prev) => {
      const currentPlatform = prev[platform] || {};
      const currentFiles = currentPlatform[fileType] || [];

      // Replace if label exists, else add new
      const updatedFiles = currentFiles.some((entry) => entry.label === label)
        ? currentFiles.map((entry) =>
            entry.label === label ? { ...entry, file: newFile } : entry
          )
        : [...currentFiles, { label, file: newFile }];

      return {
        ...prev,
        [platform]: {
          ...currentPlatform,
          [fileType]: updatedFiles,
        },
      };
    });
  };

  // Handle platform-wise upload submission
  const handlePlatformSubmit = async (
    e: React.FormEvent,
    platform: Platform
  ) => {
    e.preventDefault();
    console.log("Submitting data for:", platform.name);
    console.log("Platform files:", platformFiles[platform.name]);
  };

  return (
    <div className="p-6">
      {/* Warning text */}
      <p className="text-red-500 text-center mb-4 font-medium">
        Caution: Avoid importing the edited file to prevent potential errors.
      </p>

      {/* Section heading */}
      <div className="flex items-center mb-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 font-medium">Famous Platforms</span>
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
              <p className="text-gray-500 text-sm">{platform.type}</p>
            </CardHeader>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild={true}>
                  <Button
                    variant="secondary"
                    className="rounded-full hover:bg-gray-200"
                  >
                    Import Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] sm:max-h-[700px]">
                  <form
                    onSubmit={(e) => handlePlatformSubmit(e, platform)}
                  >
                    <DialogHeader className="bg-grey-200">
                      <DialogTitle className="text-center text-3xl">
                        {platform.name}
                      </DialogTitle>
                      <DialogDescription
                        className="flex flex-col justify-center items-center"
                        asChild
                      >
                        <div
                          id="platform-type"
                          className="bg-blue-600 text-white p-1.5 rounded "
                        >
                          {platform.type}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-8">
                      {/* Return Month */}
                      <div
                        id="return-month"
                        className="grid gap-3 border rounded py-1.5 text-center shadow-xl"
                      >
                        {monthName(selectedGstin.returnMonth)} Data
                      </div>

                      {/* Download Path */}
                      <div id="download-path" className="grid gap-0.5 py-1.5">
                        <span className="font-semibold">Download Path:</span>
                        <span className="text-sm text-gray-600">
                          {platform.downloadPath || "GSTR Report"}
                        </span>
                      </div>

                      {/* Dynamic file inputs */}
                      <div className="grid gap-2">
                        <span className="font-semibold">
                          Upload Files:{" "}
                          <span className="text-red-500">
                            ({monthName(selectedGstin.returnMonth)}-2025)
                          </span>
                        </span>
                        {platform.files.map((fileObj) => (
                          <div key={fileObj.label} className="mb-2">
                            {fileObj.fileDownloadPath && (
                              <span className="text-sm font-semibold text-cyan-600">
                                Download Path: ({fileObj.fileDownloadPath})
                              </span>
                            )}
                            <CustomFileInput
                              label={fileObj.label}
                              file={
                                platformFiles[platform.name]?.[
                                  fileObj.fileType
                                ]?.find((f) => f.label === fileObj.label)
                                  ?.file || null
                              }
                              setFile={(file) =>
                                handleFileUploadChange(
                                  platform.name,
                                  fileObj.fileType,
                                  fileObj.label,
                                  file
                                )
                              }
                            />
                            {fileObj.instruction && (
                              <span className="text-sm text-cyan-600">
                                {fileObj.instruction}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 border-t border-gray-300"></div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Upload</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
