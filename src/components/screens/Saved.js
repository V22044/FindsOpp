import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Bookmark } from "lucide-react-native";
import { useTheme } from "react-native-paper";

export const Saved = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <Bookmark size="80" color="#bdbdbd" strokeWidth="1.25px" />
      <Text style={styles.text}>No Saved Opportunities Yet!</Text>
      <StatusBar style="auto" />
    </View>
  );
};
const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      paddingTop: 150,
    },
    text: {
      fontSize: 17,
      fontWeight: "15",
      marginTop: 17,
      color: "#bdbdbd",
    },
  });

export default Saved;
