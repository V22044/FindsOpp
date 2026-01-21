import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import initialOpportunities from "../../data/opportunities.js";
import OppList from "../entity/OppList.js";
import { Search } from "lucide-react-native";
import { Button, ButtonTray } from "../UI/Button.js";
import { useState } from "react";

export const Home = ({ navigation }) => {
  //State ----------------------------
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  //Handler --------------------------
  const goToSearch = () => navigation.navigate("SearchTab");

  //View -----------------------------
  return (
    <View style={styles.container}>
      {/* Header */}
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
      {/* Main */}
      <OppList opportunities={opportunities} onSelect={() => {}} />
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
