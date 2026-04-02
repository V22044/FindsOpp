import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import initialOpportunities from "../../data/opportunities.js";
import OppList from "../entity/OppList.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [user, setUser] = useState(null);
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

        await new Promise((resolve) => setTimeout(resolve, 500));

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

    const loadUser = async () => {
      try {
        const userStr = await AsyncStorage.getItem("user");
        if (userStr) {
          setUser(JSON.parse(userStr));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);
  //View -----------------------------
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingTitle}>Loading</Text>
          <Text style={styles.loadingSubtitle}>
            Finding the best opportunities for you...
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome, {user?.firstName || "User"}</Text>
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
          opportunity={selectedOpp}
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
    centerContent: {
      justifyContent: "center",
      alignItems: "center",
    },
    loadingCard: {
      backgroundColor: theme.colors.surface,
      padding: 30,
      borderRadius: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    loadingTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 15,
      color: theme.colors.onSurface,
    },
    loadingSubtitle: {
      fontSize: 14,
      marginTop: 8,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
    },
  });

export default Home;
