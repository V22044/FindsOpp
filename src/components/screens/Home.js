import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import initialOpportunities from "../../data/opportunities.js";
import OppList from "../entity/OppList.js";
import { Search } from "lucide-react-native";
import { Button, ButtonTray } from "../UI/Button.js";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { DetailInfo } from "../UI/DetailInfo.js";
import { useOpportunities } from "../../context/useOpportunities";
import { useCurrentUser } from "../../context/useCurrentUser";

export const Home = ({ navigation }) => {
  //State ----------------------------
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const {
    opportunities: allOpportunities,
    loading,
    error,
  } = useOpportunities({ prefetchImages: true });
  const { user, reloadUser } = useCurrentUser();

  useFocusEffect(
    useCallback(() => {
      reloadUser();
    }, []),
  );
  const userInterests = user?.interestList ?? [];
  const opportunities =
    userInterests.length > 0
      ? allOpportunities.filter((opp) =>
          userInterests.some(
            (interest) =>
              interest.replace("_", " ").toLowerCase() ===
              opp.cause?.toLowerCase(),
          ),
        )
      : allOpportunities;

  const interestLabels = {
    environment: "Environment",
    education: "Education",
    animal_welfare: "Animal Welfare",
    community: "Community",
    health: "Health",
  };
  //Handler --------------------------
  const goToSearch = () => navigation.navigate("SearchTab");
  const goToDetails = (opp) => {
    setSelectedOpp(opp);
    setModalVisible(true);
  };
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

      {userInterests.length > 0 && (
        <View style={styles.interestView}>
          <Text style={styles.interestText}>For you</Text>
          <Text style={styles.interestValue}>
            Based on your interests:{" "}
            {userInterests.map((i) => interestLabels[i] || i).join(", ")}
          </Text>
        </View>
      )}

      <OppList opportunities={opportunities} onSelect={goToDetails} />

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
    </View>
  );
};
//Styles ---------------------------
const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
    interestView: {
      alignItems: "left",
      paddingHorizontal: 20,
      width: "100%",
      marginBottom: 20,
      marginTop: 20,
    },
    interestText: {
      paddingBottom: 10,
      fontWeight: "bold",
      fontSize: 16,
      color: theme.colors.onBackground,
    },
    interestValue: {
      fontSize: 13,
      color: theme.colors.primary,
    },
  });

export default Home;
