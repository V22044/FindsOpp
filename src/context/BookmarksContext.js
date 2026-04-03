import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addBookmark,
  removeBookmark,
  getBookmarks,
  getOpportunities,
} from "../components/services/API";

const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkedIDs, setBookmarkedIDs] = useState([]);

  //Load bookmarks when app starts
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const userStr = await AsyncStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);

        //Get saved jobIDs from DB
        const savedIDs = await getBookmarks(user.email);
        setBookmarkedIDs(savedIDs);

        //Fetch all opportunities to match full objects
        if (savedIDs.length > 0) {
          const response = await getOpportunities();
          const allOpps = response.opportunities || [];
          const savedOpps = allOpps.filter((opp) =>
            savedIDs.includes(opp.jobID),
          );
          setBookmarks(savedOpps);
        }
      } catch (err) {
        console.error("Failed to load bookmarks:", err);
      }
    };

    loadBookmarks();
  }, []);

  const toggleBookmark = async (opportunity) => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);

      const alreadyBookmarked = bookmarkedIDs.includes(opportunity.jobID);

      if (alreadyBookmarked) {
        //Remove from DB
        await removeBookmark(user.email, opportunity.jobID);
        setBookmarkedIDs((prev) =>
          prev.filter((id) => id !== opportunity.jobID),
        );
        setBookmarks((prev) =>
          prev.filter((o) => o.jobID !== opportunity.jobID),
        );
      } else {
        //Add to DB
        await addBookmark(user.email, opportunity.jobID);
        setBookmarkedIDs((prev) => [...prev, opportunity.jobID]);
        setBookmarks((prev) => [...prev, opportunity]);
      }
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
    }
  };

  const isBookmarked = (jobID) => bookmarkedIDs.includes(jobID);

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
