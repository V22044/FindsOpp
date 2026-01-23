import { Pressable, StyleSheet, Text, View } from "react-native";

const OppItem = ({ opportunity, onSelect }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <Pressable onPress={() => onSelect(opportunity)}>
      <View style={styles.item}>
        <Text style={styles.Text}>
          {opportunity.title} - {opportunity.organisation}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  Text: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

export default OppItem;
