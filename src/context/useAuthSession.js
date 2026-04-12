import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBookmarks } from "../context/BookmarksContext";

export const useAuthSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { clearBookmarks, loadBookmarks } = useBookmarks();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          await loadBookmarks();
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  const handleLogin = async () => {
    await loadBookmarks();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    clearBookmarks();
    setIsLoggedIn(false);
  };

  return { isLoggedIn, isLoading, handleLogin, handleLogout };
};
