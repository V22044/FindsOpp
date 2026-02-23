import { Pressable, StyleSheet, Text, View, Image, Button } from "react-native";
import { Calendar, MapPin, Clock, Bookmark } from "lucide-react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export const JobCard = ({ opportunity, onSelect }) => {
  // Initialisations ---------------------
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
      <Image source={{ uri: opportunity.image_link }} style={styles.image} />

      <Pressable style={styles.bookmarkContainer} onPress={toggleBookmark}>
        <View style={styles.bookmarkIcon}>
          <FontAwesome
            name="bookmark"
            size={20}
            color={BookmarkToggle ? "#42bfd8" : "#000"}
          />
        </View>
      </Pressable>

      {/* content */}
      <View style={styles.content}>
        <Text style={styles.title}>{opportunity.title}</Text>
        <Text style={styles.organisation}>{opportunity.organisation}</Text>
        <View style={styles.infoRow}>
          <Calendar size={16} color="#666" />
          <Text style={styles.infoText}>{opportunity.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#666" />
          <Text style={styles.infoText}>{opportunity.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={16} color="#666" />
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

const styles = StyleSheet.create({
  card: {
    borderColor: "#2f00ff",
    borderWidth: 3,
    borderStyle: "dashed",
    backgroundColor: "#00f7ff",
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#f0f0f0",
    resizeMode: "cover",
  },
  bookmarkContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  bookmarkIcon: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  bookmarkText: {
    fontSize: 20,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  organisation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  tagContainer: {
    marginTop: 8,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F0FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#1967D2",
    fontWeight: "500",
  },
});

export default JobCard;
