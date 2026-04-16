import axios from "axios";

// Put API link here:
const API_BASE_URL =
  "https://tqv4cpcyel.execute-api.eu-west-2.amazonaws.com/prod";
const API_USER_URL = "https://findsopp-backend.onrender.com/api";

const Opportunity_api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const User_api = axios.create({
  baseURL: API_USER_URL,
  timeout: 15000,
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
    const response = await Opportunity_api.get(`/opportunities/${jobID}`);
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

export const updateUser = async (currentEmail, updates) => {
  try {
    const response = await User_api.patch("/users/update", {
      email: currentEmail,
      newEmail: updates.email,
      password: updates.password,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const addBookmark = async (email, jobID) => {
  try {
    const response = await User_api.patch("/users/bookmark/add", {
      email,
      jobID,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
};

export const removeBookmark = async (email, jobID) => {
  try {
    const response = await User_api.patch("/users/bookmark/remove", {
      email,
      jobID,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};

export const getBookmarks = async (email) => {
  try {
    const response = await User_api.get(`/users/profile?email=${email}`);
    return response.data.BookmarkedOpportunities || [];
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
};

export const updateInterests = async ({ email, interestList }) => {
  try {
    const response = await User_api.patch("/users/interests", {
      email,
      interestList,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating interests:", error);
    throw error;
  }
};

export const checkApprovalStatus = async (userId, jobID) => {
  try {
    const response = await User_api.get(
      `/users/approval-status?userId=${userId}&jobID=${jobID}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error checking approval status:", error);
    throw error;
  }
};

export const requestParentalApproval = async (userId, opportunity) => {
  try {
    const response = await User_api.post("/apply-request", {
      userId,
      opportunity,
    });
    return response.data;
  } catch (error) {
    console.error("Error requesting approval:", error);
    throw error;
  }
};

export const getParentEmail = async (userId) => {
  try {
    const response = await User_api.get(`/users/parent-email?userId=${userId}`);
    return response.data.p_email;
  } catch (error) {
    console.error("Error fetching parent email:", error);
    return "";
  }
};

export default { Opportunity_api, User_api };
