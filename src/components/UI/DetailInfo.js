import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const DetailInfo = ({ visible, onClose, opportunity }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  if (!opportunity) return null;

  const {
    title,
    imageURL,
    description,
    organisation,
    date,
    time,
    duration,
    location,
  } = opportunity;

  const handleApply = () => {
    console.log(`${title}: applied`);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome
                name="times"
                size={24}
                color={theme.colors.onSurface}
              />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            <Image
              source={{ uri: imageURL }}
              style={styles.image}
              resizeMode="cover"
            />

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.organisation}>{organisation}</Text>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <FontAwesome
                name="calendar"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={styles.detailText}>{date}</Text>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome
                name="clock-o"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={styles.detailText}>
                {time} ({duration})
              </Text>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome
                name="map-marker"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={styles.detailText}>{location}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          </ScrollView>

          {/* Apply Button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const makeStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "90%",
      maxHeight: "85%",
      flexShrink: 1,
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.onSurface,
    },
    closeButton: {
      padding: 5,
    },
    scrollView: {
      flexShrink: 1,
    },
    scrollContent: {
      paddingBottom: 10,
    },
    image: {
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingTop: 20,
      width: "100%",
      height: 200,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.colors.onSurface,
      paddingHorizontal: 20,
      paddingTop: 15,
      paddingBottom: 5,
    },
    organisation: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      paddingHorizontal: 20,
      paddingBottom: 15,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
      marginHorizontal: 20,
      marginVertical: 15,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 6,
      gap: 12,
    },
    detailText: {
      fontSize: 15,
      color: theme.colors.onSurface,
      flex: 1,
    },
    descriptionSection: {
      paddingHorizontal: 20,
      paddingTop: 5,
      paddingBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.onSurface,
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 15,
      color: theme.colors.onSurfaceVariant,
      lineHeight: 22,
    },
    footer: {
      padding: 15,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.background,
    },
    applyButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
    },
    applyButtonText: {
      color: theme.colors.onPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default DetailInfo;
