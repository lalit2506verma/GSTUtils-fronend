import { myAxios } from "./helper";

// Define GstinInfo type or import it from its module
export type ReceiverGstinInfo = {
    // Add appropriate fields here, for example:
    gstinID: number;
    gstinNumber: string;
    state: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    lastUsedReturnPeriod: string
};

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
