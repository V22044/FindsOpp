import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const FilterModal = ({
  visible,
  onClose,
  onApplyFilters,
  opportunities,
  activeFilters,
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [selectedCauses, setSelectedCauses] = useState(
    activeFilters.causes || [],
  );
  const [selectedLocations, setSelectedLocations] = useState(
    activeFilters.locations || [],
  );
  const [selectedTimeCommitments, setSelectedTimeCommitments] = useState(
    activeFilters.timeCommitments || [],
  );

  useEffect(() => {
    setSelectedCauses(activeFilters.causes || []);
    setSelectedLocations(activeFilters.locations || []);
    setSelectedTimeCommitments(activeFilters.timeCommitments || []);
  }, [activeFilters]);

  //Get value from opportunities
  const getUniqueValues = (field) => {
    const values = opportunities
      .map((opp) => opp[field])
      .filter((value) => value && value.trim() !== "");
    return [...new Set(values)].sort();
  };

  const causes = getUniqueValues("cause");
  const locations = getUniqueValues("location");
  const durations = getUniqueValues("duration");

  //Toggle selection helpers
  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleApply = () => {
    onApplyFilters({
      causes: selectedCauses,
      locations: selectedLocations,
      timeCommitments: selectedTimeCommitments,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedCauses([]);
    setSelectedLocations([]);
    setSelectedTimeCommitments([]);
  };

  const hasActiveFilters =
    selectedCauses.length > 0 ||
    selectedLocations.length > 0 ||
    selectedTimeCommitments.length > 0;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filters</Text>
            <Pressable onPress={onClose}>
              <FontAwesome
                name="times"
                size={24}
                color={theme.colors.onSurface}
              />
            </Pressable>
          </View>

          {/* Filter Content */}
          <ScrollView style={styles.scrollContent}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Cause</Text>
              {causes.length === 0 ? (
                <Text style={styles.emptyText}>No causes available</Text>
              ) : (
                causes.map((cause) => (
                  <TouchableOpacity
                    key={cause}
                    style={styles.filterItem}
                    onPress={() =>
                      toggleSelection(cause, selectedCauses, setSelectedCauses)
                    }
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selectedCauses.includes(cause) &&
                          styles.checkboxChecked,
                      ]}
                    >
                      {selectedCauses.includes(cause) && (
                        <FontAwesome name="check" size={14} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.filterLabel}>{cause}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>

            {/* Location Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Location</Text>
              {locations.length === 0 ? (
                <Text style={styles.emptyText}>No locations available</Text>
              ) : (
                locations.map((location) => (
                  <TouchableOpacity
                    key={location}
                    style={styles.filterItem}
                    onPress={() =>
                      toggleSelection(
                        location,
                        selectedLocations,
                        setSelectedLocations,
                      )
                    }
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selectedLocations.includes(location) &&
                          styles.checkboxChecked,
                      ]}
                    >
                      {selectedLocations.includes(location) && (
                        <FontAwesome name="check" size={14} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.filterLabel}>{location}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>

            {/* Time Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Time Commitment</Text>
              {durations.length === 0 ? (
                <Text style={styles.emptyText}>No durations available</Text>
              ) : (
                durations.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={styles.filterItem}
                    onPress={() =>
                      toggleSelection(
                        duration,
                        selectedTimeCommitments,
                        setSelectedTimeCommitments,
                      )
                    }
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selectedTimeCommitments.includes(duration) &&
                          styles.checkboxChecked,
                      ]}
                    >
                      {selectedTimeCommitments.includes(duration) && (
                        <FontAwesome name="check" size={14} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.filterLabel}>{duration}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>

          {/* Choice Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={handleClear}
              disabled={!hasActiveFilters}
            >
              <Text
                style={[
                  styles.clearButtonText,
                  !hasActiveFilters && styles.disabledText,
                ]}
              >
                Clear All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>
                Apply
                {hasActiveFilters
                  ? ` (${selectedCauses.length + selectedLocations.length + selectedTimeCommitments.length})`
                  : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "80%",
      paddingBottom: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.onSurface,
    },
    scrollContent: {
      padding: 20,
    },
    filterSection: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.onSurface,
      marginBottom: 15,
    },
    filterItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: theme.colors.outline,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterLabel: {
      fontSize: 15,
      color: theme.colors.onSurface,
      flex: 1,
    },
    emptyText: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      fontStyle: "italic",
    },
    footer: {
      flexDirection: "row",
      padding: 20,
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
    },
    clearButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    clearButtonText: {
      color: theme.colors.onSurface,
      fontSize: 16,
      fontWeight: "600",
    },
    disabledText: {
      color: theme.colors.onSurfaceVariant,
    },
    applyButton: {
      backgroundColor: theme.colors.primary,
    },
    applyButtonText: {
      color: theme.colors.onPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default FilterModal;
