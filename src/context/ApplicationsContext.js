import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const key = `applications_${user.id}`;
      const stored = await AsyncStorage.getItem(key);
      if (stored) setApplications(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load applications:", err);
    }
  };

  const addApplication = async (opportunity) => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const key = `applications_${user.id}`;

      const newEntry = {
        jobID: opportunity.jobID,
        title: opportunity.title,
        organisation: opportunity.organisation,
        contact: opportunity.contact,
        signup_link: opportunity.signup_link,
        appliedAt: new Date().toISOString(),
      };

      const updated = [...applications, newEntry];
      setApplications(updated);
      await AsyncStorage.setItem(key, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save application:", err);
    }
  };

  const removeApplication = async (jobID) => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);
      const key = `applications_${user.id}`;
      const updated = applications.filter((a) => a.jobID !== jobID);
      setApplications(updated);
      await AsyncStorage.setItem(key, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to remove application:", err);
    }
  };

  const isApplied = (jobID) => applications.some((a) => a.jobID === jobID);

  const clearApplications = async () => {
    setApplications([]);
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        addApplication,
        isApplied,
        loadApplications,
        clearApplications,
        removeApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationsContext);
