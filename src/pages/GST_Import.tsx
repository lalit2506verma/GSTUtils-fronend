import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Platform } from "@/data/Platforms";
import { platforms } from "@/data/Platforms";
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
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { months } from "@/data/states";
import { uploadFiles } from "@/services/PlatformService";

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

export type PlatformFileMap = Record<string, Record<string, FileEntry[]>>;

// ========================= COMPONENT =========================
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


// ========================= MAIN =========================
export default function GST_Import() {
  // Selected GSTIN information
  const location = useLocation();
  const selectedGstin = location.state?.selectedGstin;
  const token = localStorage.getItem("authToken");

  console.log(selectedGstin);
  

  // State: { [platformName]: { [fileLabel]: File | null } }
  const [platformFiles, setPlatformFiles] = useState<PlatformFileMap>({});

  // GET MONTH NAME
  const monthName = (monthNumber: string) => {
    return months[monthNumber] || "Unknown Month";
  };

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

  // =========== SUBMIT PLATFORM-UPLOAD HANDLER ===========
  const handlePlatformSubmit = async (
    e: React.FormEvent,
    platform: Platform
  ) => {
    e.preventDefault();
    console.log("Submitting data for:", platform.name);
    console.log("Platform files:", platformFiles);

    // VALIDATION
    if (!platformFiles[platform.name]) {
      return;
    }

    if (!token) {
      console.log("User not logged in");
      return;
    }

    console.log("API hit");
    

    // API CALL
    await uploadFiles(token, platformFiles, platform.name, selectedGstin)
      .then((data) => {
        console.log("succcess from upload", data);
        
      })
      .catch(error => {
        console.log("Error while uploading the file", error);
        
      })
  };

  // ========================= UI =========================
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
                  <form onSubmit={(e) => handlePlatformSubmit(e, platform)}>
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

                    <div className="flex-1 mb-5 border-t border-gray-300"></div>
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
