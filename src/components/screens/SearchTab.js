import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Search } from "lucide-react-native";

export const SearchTab = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="gray" />
        <TextInput
          style={styles.TextInput}
          placeholder="Search opportunities..."
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "90%",
    marginTop: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  TextInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
});

export default SearchTab;
