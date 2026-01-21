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
            key={opportunity.id}
            opportunity={opportunity}
            onSelect={onSelect}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default OppList;
