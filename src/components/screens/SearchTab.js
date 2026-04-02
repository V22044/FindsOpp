import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { getOpportunities } from "../services/API";
import OppList from "../entity/OppList";
import { DetailInfo } from "../UI/DetailInfo";
import FilterModal from "../UI/FilterModal";
import FilterButton from "../UI/FilterButton";
import ActiveFiltersPills from "../UI/ActiveFiltersPills";

export const SearchTab = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [searchQuery, setSearchQuery] = useState("");
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    causes: [],
    locations: [],
    timeCommitments: [],
  });

  //Fetch all opportunities
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

  //Apply search and filters
  useEffect(() => {
    let filtered = allOpportunities;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (opp) =>
          opp.title?.toLowerCase().includes(query) ||
          opp.description?.toLowerCase().includes(query) ||
          opp.organisation?.toLowerCase().includes(query) ||
          opp.location?.toLowerCase().includes(query) ||
          opp.cause?.toLowerCase().includes(query),
      );
    }
    if (activeFilters.causes.length > 0) {
      filtered = filtered.filter((opp) =>
        activeFilters.causes.includes(opp.cause),
      );
    }
    if (activeFilters.locations.length > 0) {
      filtered = filtered.filter((opp) =>
        activeFilters.locations.includes(opp.location),
      );
    }
    if (activeFilters.timeCommitments.length > 0) {
      filtered = filtered.filter((opp) =>
        activeFilters.timeCommitments.includes(opp.duration),
      );
    }

    setFilteredOpportunities(filtered);
  }, [searchQuery, activeFilters, allOpportunities]);

  const goToDetails = (opp) => {
    setSelectedOpp(opp);
    setModalVisible(true);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({
      causes: [],
      locations: [],
      timeCommitments: [],
    });
  };

  const totalActiveFilters =
    activeFilters.causes.length +
    activeFilters.locations.length +
    activeFilters.timeCommitments.length;

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
        <View style={styles.contentWrapper}>
          {/* Search Bar Row */}
          <View style={styles.searchRow}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <FontAwesome
                name="search"
                size={20}
                color={theme.colors.onBackground}
              />
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
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <FontAwesome name="times-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            <FilterButton
              activeCount={totalActiveFilters}
              onPress={() => setFilterModalVisible(true)}
            />
          </View>

          <ActiveFiltersPills
            activeFilters={activeFilters}
            onRemoveFilter={setActiveFilters}
            onClearAll={handleClearFilters}
          />

          <Text style={styles.resultCount}>
            {filteredOpportunities.length} result
            {filteredOpportunities.length !== 1 ? "s" : ""} found
          </Text>
        </View>

        {filteredOpportunities.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>
              {searchQuery.trim() === "" && totalActiveFilters === 0
                ? "Start typing to search opportunities"
                : "No opportunities found matching your criteria"}
            </Text>
          </View>
        ) : (
          <OppList
            opportunities={filteredOpportunities}
            onSelect={goToDetails}
          />
        )}

        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApplyFilters={handleApplyFilters}
          opportunities={allOpportunities}
          activeFilters={activeFilters}
        />

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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentWrapper: {
      width: "100%",
      alignItems: "center",
      paddingHorizontal: "5%",
    },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginTop: 20,
      gap: 10,
    },
    searchContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    TextInput: {
      flex: 1,
      height: 40,
      marginLeft: 10,
      color: theme.colors.onBackground,
    },
    resultCount: {
      width: "100%",
      fontSize: 14,
      color: theme.colors.onBackground,
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
      color: theme.colors.onBackground,
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.onBackground,
      textAlign: "center",
    },
  });

export default SearchTab;
