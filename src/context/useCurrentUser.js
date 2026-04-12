import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      if (userStr) setUser(JSON.parse(userStr));
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return { user, reloadUser: loadUser };
};
