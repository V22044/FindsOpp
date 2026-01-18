import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Search } from "lucide-react-native";
import { Button, ButtonTray } from "../UI/Button.js";

export const Home = ({ navigation }) => {
  //State ----------------------------
  //Handler --------------------------
  const goToSearch = () => navigation.navigate("SearchTab");

  //View -----------------------------
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome.</Text>
        <ButtonTray>
          <Button
            label="Type Something..."
            icon={<Search size={20} color="grey" />}
            styleButton={{ justifyContent: "flex-start", paddingLeft: 10 }}
            styleLabel={{ color: "grey", fontSize: 16 }}
            onClick={goToSearch}
          />
        </ButtonTray>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
//Styles ---------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "#cfcfcf",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "flex-start",
  },
});

export default Home;
