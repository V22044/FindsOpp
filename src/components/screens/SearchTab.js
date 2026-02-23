import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Key, Search } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SearchTab = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.searchContainer}>
          <Search size={20} color="gray" />
          <TextInput
            style={styles.TextInput}
            placeholder="Search opportunities..."
          />
        </View>
      </TouchableWithoutFeedback>

      <StatusBar style="auto" />
    </SafeAreaView>
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
