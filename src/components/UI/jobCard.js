import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Calendar, MapPin, Clock } from "lucide-react-native";
import { useState } from "react";
import { useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export const JobCard = ({ opportunity, onSelect }) => {
  // Initialisations ---------------------
  const theme = useTheme();
  const styles = makeStyles(theme);
  // State -------------------------------
  const [BookmarkToggle, setBookmarkToggle] = useState(false);
  // Handlers ----------------------------
  const toggleBookmark = () => {
    const testState = !BookmarkToggle;
    console.log("Bookmarked:", opportunity.title, "Status:", testState);
    setBookmarkToggle(testState);
  };
  // View --------------------------------
  return (
    <Pressable onPress={() => onSelect(opportunity)} style={styles.card}>
      {/* image */}
      <Image source={{ uri: opportunity.imageURL }} style={styles.image} />

      <Pressable style={styles.bookmarkContainer} onPress={toggleBookmark}>
        <View style={styles.bookmarkIcon}>
          <FontAwesome
            name="bookmark"
            size={20}
            color={BookmarkToggle ? "#42bfd8" : theme.colors.onBackground}
          />
        </View>
      </Pressable>

      {/* content */}
      <View style={styles.content}>
        <Text style={styles.title}>{opportunity.title}</Text>
        <Text style={styles.organisation}>{opportunity.organisation}</Text>
        <View style={styles.infoRow}>
          <Calendar size={16} color={theme.colors.onPrimary} />
          <Text style={styles.infoText}>{opportunity.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={16} color={theme.colors.onPrimary} />
          <Text style={styles.infoText}>{opportunity.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={16} color={theme.colors.onPrimary} />
          <Text style={styles.infoText}>
            {opportunity.time} ({opportunity.duration})
          </Text>
        </View>
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{opportunity.cause}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      borderColor: theme.colors.onBackground,
      borderWidth: 4,
      marginHorizontal: 16,
      marginVertical: 10,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: 180,
      backgroundColor: theme.colors.background,
      resizeMode: "cover",
    },
    bookmarkContainer: {
      position: "absolute",
      top: 12,
      right: 12,
      zIndex: 10,
    },
    bookmarkIcon: {
      backgroundColor: theme.colors.surface,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.onPrimary,
      marginBottom: 4,
    },
    organisation: {
      fontSize: 14,
      color: theme.colors.onPrimary,
      marginBottom: 12,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    infoText: {
      fontSize: 14,
      color: theme.colors.onPrimary,
      marginLeft: 8,
    },
    tagContainer: {
      marginTop: 8,
    },
    tag: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
    },
    tagText: {
      fontSize: 12,
      color: theme.colors.onPrimaryContainer,
      fontWeight: "500",
    },
  });
export default JobCard;
