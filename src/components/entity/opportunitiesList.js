import { ScrollView } from "react-native";
import UserItem from "./UserItem";

const opportunitiesList = ({ opportunities, onSelect }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ScrollView style={styles.container}>
      {opportunities.map((opportunity) => {
        return (
          <UserItem
            key={opportunity.UserID}
            user={opportunity}
            onSelect={onSelect}
          />
        );
      })}
    </ScrollView>
  );
};

export default opportunitiesList;
