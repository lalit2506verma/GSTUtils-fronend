import type { GstinInfo } from "@/pages/GST_Profile";
import { myAxios } from "./helper";
import type { PlatformFileMap } from "@/pages/GST_Import";

const extractFilesByPlatform = (platformName: string, platformFiles: PlatformFileMap) => {
  const platformData = platformFiles[platformName];

  if (!platformData) return {};

  const fileData: Record<string, File[]> = {};

  Object.entries(platformData).forEach(([fileType, entries]) => {
    fileData[fileType] = entries
      .map((entry) => entry.file)
      .filter((f): f is File => f !== null)
  });

  return fileData;
}

// upload platform-files
export const uploadFiles = async (token: string, platformFiles: PlatformFileMap, platformName: string, gstinData: GstinInfo) => {

  // =============== converted to formData ==============
  const fileMap = extractFilesByPlatform(platformName, platformFiles);
  const formData = new FormData();

  const { gstin, returnMonth, returnYear } = gstinData;

  // ✅ Create the metadata for upload
  const meta = {
    gstinNumber: gstin,
    returnMonth,
    returnYear,
  };

  formData.append("data", JSON.stringify(meta));

  Object.entries(fileMap).forEach(([fileType, files]) => {
    files.forEach((file) => formData.append(fileType, file))
  });

  // =================== CALLING API ===================
  try {
    const response = await myAxios.post(`/api/upload/${platformName}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("Upload success:", response.data);
  }
  catch (error: any) {
    console.error("Upload failed:", error);
  }
}