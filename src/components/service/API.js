import axios from "axios";

// Put API link here:
const API_BASE_URL = "??";
const API_USER_URL = "??";

const Opportunity_api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const User_api = axios.create({
  baseURL: API_USER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//================OPPORTUNITIES (DYNAMODB)================//

// Get all opportunities
export const getOpportunities = async () => {
  try {
    const response = await Opportunity_api.get("/opportunities");
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

//================USERS (MONGODB)================//

export const registerUser = async (userData) => {
  try {
    const response = await User_api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await User_api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const getUserProfile = async (email) => {
  try {
    const response = await User_api.get(`/users/profile?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
export default { Opportunity_api, User_api };
