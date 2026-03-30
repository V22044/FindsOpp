import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { getOpportunities } from "../services/API";
import OppList from "../entity/OppList";
import { DetailInfo } from "../UI/DetailInfo";

export const SearchTab = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [searchQuery, setSearchQuery] = useState("");
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const response = await getOpportunities();
        setAllOpportunities(response.opportunities || []);
        setFilteredOpportunities(response.opportunities || []);
      } catch (error) {
        console.error("Failed to fetch opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredOpportunities(allOpportunities);
    } else {
      const filtered = allOpportunities.filter((opp) => {
        const query = searchQuery.toLowerCase();
        return (
          opp.title?.toLowerCase().includes(query) ||
          opp.description?.toLowerCase().includes(query) ||
          opp.organisation?.toLowerCase().includes(query) ||
          opp.location?.toLowerCase().includes(query) ||
          opp.cause?.toLowerCase().includes(query)
        );
      });
      setFilteredOpportunities(filtered);
    }
  }, [searchQuery, allOpportunities]);

  const goToDetails = (opp) => {
    setSelectedOpp(opp);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading opportunities...</Text>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color={theme.colors.onSurface} />
          <TextInput
            style={styles.TextInput}
            placeholder="Search opportunities..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableWithoutFeedback onPress={() => setSearchQuery("")}>
              <FontAwesome name="times-circle" size={20} color="#999" />
            </TouchableWithoutFeedback>
          )}
        </View>

        {/* Result Count */}
        <Text style={styles.resultCount}>
          {filteredOpportunities.length} result
          {filteredOpportunities.length !== 1 ? "s" : ""} found
        </Text>

        {/* Results List */}
        {filteredOpportunities.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>
              {searchQuery.trim() === ""
                ? "Start typing to search opportunities"
                : `No opportunities found matching "${searchQuery}"`}
            </Text>
          </View>
        ) : (
          <OppList
            opportunities={filteredOpportunities}
            onSelect={goToDetails}
          />
        )}

        {/* Detail Modal */}
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
              `Contact: ${selectedOpp.contact?.telephone} | ${
                selectedOpp.contact?.email
              }`,
            ]}
          />
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
      color: "fffff",
    },
    TextInput: {
      flex: 1,
      height: 40,
      marginLeft: 10,
      color: theme.colors.onBackground,
    },
    resultCount: {
      width: "90%",
      fontSize: 14,
      color: "#666",
      marginTop: 10,
      marginBottom: 10,
    },
    centerContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: "#333",
    },
    emptyText: {
      fontSize: 16,
      color: "#999",
      textAlign: "center",
    },
  });

export default SearchTab;
