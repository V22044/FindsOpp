import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const SearchTab = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color={theme.colors.onSurface} />
          <TextInput
            style={styles.TextInput}
            placeholder="Search opportunities..."
          />
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const makeStyles = (theme) =>
  StyleSheet.create({
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
