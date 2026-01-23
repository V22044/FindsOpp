import axios from "axios";

// Put API link here:
const API_BASE_URL = "??";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all opportunities
export const getOpportunities = async () => {
  try {
    const response = await api.get("/opportunities");
    return response.data;
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    throw error;
  }
};

// Get single opportunity by ID
export const getOpportunityById = async (jobID) => {
  try {
    const response = await api.get(`/opportunities/${jobID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    throw error;
  }
};

export default api;
