import { ScrollView } from "react-native";

const OpportunitiesList = ({ opportunities, onSelect }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ScrollView>
      {opportunities.map((opportunity) => {
        return (
          <opportunitiesItem
            key={opportunity.id}
            opportunity={opportunity}
            onSelect={onSelect}
          />
        );
      })}
    </ScrollView>
  );
};

export default OpportunitiesList;
