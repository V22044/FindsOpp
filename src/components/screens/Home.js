import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import initialOpportunities from "../../data/opportunities.js";
import OppList from "../entity/OppList.js";
import { Search } from "lucide-react-native";
import { Button, ButtonTray } from "../UI/Button.js";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { DetailInfo } from "../UI/DetailInfo.js";
import { getOpportunities } from "../services/API.js";

export const Home = ({ navigation }) => {
  //State ----------------------------
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  //Handler --------------------------
  const goToSearch = () => navigation.navigate("SearchTab");
  const goToDetails = (opp) => {
    setSelectedOpp(opp);
    setModalVisible(true);
  };
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getOpportunities();

        setOpportunities(response.opportunities || []);

        if (response.opportunities) {
          response.opportunities.forEach((opp) => {
            if (opp.imageURL) {
              Image.prefetch(opp.imageURL);
            }
          });
        }
      } catch (err) {
        console.error("Failed to fetch opportunities:", err);
        setError("Failed to load opportunities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);
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
      {selectedOpp && (
        <DetailInfo
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedOpp(null);
          }}
          title={selectedOpp.title}
          image={selectedOpp.imageURL}
          details={[
            selectedOpp.description,
            `Organisation: ${selectedOpp.organisation}`,
            `Date: ${selectedOpp.date}`,
            `Time: ${selectedOpp.time}`,
            `Duration: ${selectedOpp.duration}`,
            `Location: ${selectedOpp.location}`,
            `Cause: ${selectedOpp.cause}`,
            `Contact: ${selectedOpp.contact.telephone} | ${selectedOpp.contact.email}`,
          ]}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};
//Styles ---------------------------
const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
    },
    titleContainer: {
      width: "100%",
      backgroundColor: theme.colors.secondaryContainer,
      padding: 20,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 50,
      alignSelf: "flex-start",
    },
  });

export default Home;
