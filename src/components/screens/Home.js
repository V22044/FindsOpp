import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import initialOpportunities from "../../data/opportunities.js";
import OppList from "../entity/OppList.js";
import { Search } from "lucide-react-native";
import { Button, ButtonTray } from "../UI/Button.js";
import { useState } from "react";
import { DetailInfo } from "../UI/DetailInfo.js";

export const Home = ({ navigation }) => {
  //State ----------------------------
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  //Handler --------------------------
  const goToSearch = () => navigation.navigate("SearchTab");
  const goToDetails = (opp) => {
    setSelectedOpp(opp);
    setModalVisible(true);
  };

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
      <OppList opportunities={opportunities} onSelect={goToDetails} />
      {/* When click on the JOB card this will appear */}
      <DetailInfo
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={selectedOpp?.title}
        details={
          selectedOpp
            ? [
                selectedOpp.description,
                `Organisation: ${selectedOpp.organisation}`,
                `Date: ${selectedOpp.date}`,
                `Time: ${selectedOpp.time}`,
                `Duration: ${selectedOpp.duration}`,
                `Location: ${selectedOpp.location}`,
                `Cause: ${selectedOpp.cause}`,
                `Contact: ${selectedOpp.contact.telephone} | ${selectedOpp.contact.email}`,
              ]
            : []
        }
      />
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
