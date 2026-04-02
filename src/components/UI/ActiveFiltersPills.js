import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";

const ActiveFiltersPills = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const { causes, locations, timeCommitments } = activeFilters;
  const totalActiveFilters =
    causes.length + locations.length + timeCommitments.length;

  if (totalActiveFilters === 0) {
    return null;
  }

  const handleRemoveCause = (cause) => {
    onRemoveFilter({
      ...activeFilters,
      causes: causes.filter((c) => c !== cause),
    });
  };

  const handleRemoveLocation = (location) => {
    onRemoveFilter({
      ...activeFilters,
      locations: locations.filter((l) => l !== location),
    });
  };

  const handleRemoveTime = (time) => {
    onRemoveFilter({
      ...activeFilters,
      timeCommitments: timeCommitments.filter((t) => t !== time),
    });
  };

  return (
    <View style={styles.activeFiltersContainer}>
      <Text style={styles.activeFiltersLabel}>Active filters:</Text>

      <View style={styles.filtersAndClearRow}>
        <View style={styles.pillsWrapper}>
          {/* Cause filters */}
          {causes.map((cause) => (
            <View key={cause} style={styles.filterPill}>
              <Text style={styles.filterPillText}>{cause}</Text>
              <TouchableOpacity onPress={() => handleRemoveCause(cause)}>
                <FontAwesome
                  name="times"
                  size={12}
                  color={theme.colors.onPrimary}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* Location filters */}
          {locations.map((location) => (
            <View key={location} style={styles.filterPill}>
              <Text style={styles.filterPillText}>{location}</Text>
              <TouchableOpacity onPress={() => handleRemoveLocation(location)}>
                <FontAwesome
                  name="times"
                  size={12}
                  color={theme.colors.onPrimary}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* Time filters */}
          {timeCommitments.map((time) => (
            <View key={time} style={styles.filterPill}>
              <Text style={styles.filterPillText}>{time}</Text>
              <TouchableOpacity onPress={() => handleRemoveTime(time)}>
                <FontAwesome
                  name="times"
                  size={12}
                  color={theme.colors.onPrimary}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.clearAllButton} onPress={onClearAll}>
          <Text style={styles.clearAllText}>Clear all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    activeFiltersContainer: {
      width: "100%",
      marginTop: 10,
    },
    filtersAndClearRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: 5,
    },
    activeFiltersLabel: {
      fontSize: 14,
      color: theme.colors.onBackground,
      fontWeight: "500",
    },
    pillsWrapper: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 8,
      marginRight: 10,
    },
    filterPill: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
    },
    filterPillText: {
      color: theme.colors.onPrimary,
      fontSize: 13,
      fontWeight: "500",
    },
    clearAllButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    clearAllText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: "600",
    },
  });

export default ActiveFiltersPills;
