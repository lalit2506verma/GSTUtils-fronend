import type { GstinInfo } from "@/pages/GST_Profile";
import { myAxios } from "./helper";

// Define GstinInfo type or import it from its module
export type ReceiverGstinInfo = {
    // Add appropriate fields here, for example:
    gstinNumber: string;
    createdAt: string;
    updatedAt: string;
    state: string;
};

export type GstinResponse = {
    gstinNumber: string;
    state: string;
    // createdAt and updatedAt is added in the backend system itself
    // GSTINID is also auto-generated in the backend system itself
}


// Fetch list of GSTINs from the backend system
export const fetchGstinList = async (token: string): Promise<ReceiverGstinInfo[]> => {
    try {
        const response = await myAxios.get("/api/gstin/list/", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.data; // Adjust based on actual response structure
    } catch (error) {
        console.error("Error fetching GSTIN list:", error);
        throw error;
    }
}

// Add new GSTIN in the backend system
export const addGstin = async (token: string, gstin: GstinInfo): Promise<any> => {
    try {
        // Before sending the GstinInfo, ensure conversing into receiver format
        const gstinData: GstinResponse = {
            gstinNumber: gstin.gstin,
            state: gstin.state,
        }

        const response = await myAxios.post("/api/gstin/", gstinData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Add GSTIN response:", response.data);
        
        return response.data; // Adjust based on actual response structure
            
    }

    catch (error) {
        console.error("Error adding GSTIN:", error);
        throw error;
    }
}

// Update GSTIN Last Used Timestamp
export const updateGstin = async (token: string, gstinNumber: string): Promise<any> => {
    try {
        const response = await myAxios.put(`/api/gstin/${gstinNumber}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data; // Adjust based on actual response structure
    } catch (error) {
        console.error("Error updating GSTIN:", error);
        throw error;
    }
};
