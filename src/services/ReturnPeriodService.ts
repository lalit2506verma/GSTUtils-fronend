import type { GstinInfo } from "@/pages/GST_Profile";
import { myAxios } from "./helper";

export type ReturnPeriodDTO = {
  gstinNumber: String;
  returnMonth: String;
  returnYear: number;
  frequency: String;
};

// FETCH AND CREATE RETURN PERIOD IF NOT EXISTS IN THE BACKEND SYSTEM
export const fetchAndCreateReturnIfNotExists = async (
  token: string,
  gstin: GstinInfo
): Promise<any> => {
  try {
    // Check if return period exists
    const response = await myAxios.get<ReturnPeriodDTO>(
      `/api/returns/gstinNumber/${gstin.gstin}/month/${gstin.returnMonth}/year/${gstin.returnYear}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } 
    );

    console.log("Return period found", response.data);
    return response.data;

  }
  catch (error: any) {

    // IF BACKEND RETURNS 404, THEN CREATE THE RETURN PERIOD
    if (error.response && error.response.status === 404) {
      console.warn("Return period not found, creating new one...");

      // CREATE RETURN PERIOD
      const returnPeriodData: ReturnPeriodDTO = {
        gstinNumber: gstin.gstin,
        returnMonth: gstin.returnMonth,
        returnYear: gstin.returnYear,
        frequency: gstin.frequency,
      };

      // Create new return period
      const createResponse = await myAxios.post(
        "/api/returns/",
        returnPeriodData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Created new return period:", createResponse.data);
      return createResponse.data;
    }
    else {
      // SOME OTHER ERROR OCCURRED
      console.error("Error fetching return period:", error);
      throw error;
    }
  }

};
  