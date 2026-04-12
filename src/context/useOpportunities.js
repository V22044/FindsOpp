import { useState, useEffect } from "react";
import { Image } from "react-native";
import { getOpportunities } from "../components/services/API";

export const useOpportunities = ({ prefetchImages = false } = {}) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await getOpportunities();
        const opps = response.opportunities || [];
        setOpportunities(opps);

        if (prefetchImages) {
          opps.forEach((opp) => {
            if (opp.imageURL) Image.prefetch(opp.imageURL);
          });
        }
      } catch (err) {
        console.error("Failed to fetch opportunities:", err);
        setError("Failed to load opportunities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  return { opportunities, loading, error };
};
