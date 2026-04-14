import { ScrollView, StyleSheet } from "react-native";
import JobCard from "../UI/jobCard.js";

const OppList = ({ opportunities, onSelect }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ScrollView style={styles.container}>
      {opportunities.map((opportunity) => {
        return (
          <JobCard
            key={opportunity.jobID}
            opportunity={opportunity}
            onSelect={onSelect}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default OppList;
