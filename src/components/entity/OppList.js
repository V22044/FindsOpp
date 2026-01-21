import { ScrollView, StyleSheet } from "react-native";
import OppItem from "./OppItem.js";

const OppList = ({ opportunities, onSelect }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ScrollView style={styles.container}>
      {opportunities.map((opportunity) => {
        return (
          <OppItem
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
