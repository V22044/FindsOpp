import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";

const FilterButton = ({ activeCount, onPress }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <TouchableOpacity style={styles.filterButton} onPress={onPress}>
      <FontAwesome name="filter" size={20} color="#fff" />
      {activeCount > 0 && (
        <View style={styles.filterBadge}>
          <Text style={styles.filterBadgeText}>{activeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    filterButton: {
      width: 50,
      height: 50,
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    filterBadge: {
      position: "absolute",
      top: -5,
      right: -5,
      backgroundColor: "#ff3b30",
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 5,
    },
    filterBadgeText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
  });

export default FilterButton;
