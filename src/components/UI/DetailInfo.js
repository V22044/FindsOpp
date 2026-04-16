import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  checkApprovalStatus,
  requestParentalApproval,
  getParentEmail,
} from "../services/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApplications } from "../../context/ApplicationsContext";
import { useState } from "react";

export const DetailInfo = ({ visible, onClose, opportunity }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { addApplication, isApplied } = useApplications();
  const [showApprovalView, setShowApprovalView] = useState(false);
  const [parentEmail, setParentEmail] = useState("");

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

  // Reset back to detail view when modal closes
  const handleClose = () => {
    setShowApprovalView(false);
    setParentEmail("");
    onClose();
  };

  const handleApply = async () => {
    if (isApplied(opportunity.jobID)) {
      Alert.alert(
        "Already Applied",
        "You have already applied for this opportunity.",
      );
      return;
    }

    const userStr = await AsyncStorage.getItem("user");
    const user = JSON.parse(userStr);
    const userId = user.id || user._id;

    // Fire both requests at the same time instead of one after another
    const [{ blocked, status }, pEmail] = await Promise.all([
      checkApprovalStatus(userId, opportunity.jobID),
      getParentEmail(userId),
    ]);

    // Store parent email early so it's ready when needed
    setParentEmail(pEmail);

    if (!blocked) {
      await addApplication(opportunity);
      Alert.alert("Applied!", `You have successfully applied for "${title}".`);
      return;
    }

    if (status === "pending") {
      // Already sent — just show the modal immediately, no extra call needed
      setShowApprovalView(true);
      return;
    }

    // Send the approval email
    const result = await requestParentalApproval(userId, {
      jobID: opportunity.jobID,
      title,
      organisation,
      date,
      time,
      duration,
      location,
      description,
    });

    if (result.emailSent || result.alreadySent) {
      setShowApprovalView(true); // parent email is already set above
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {showApprovalView ? (
            // ── Approval sent view ──────────────────────────────
            <View style={styles.approvalContainer}>
              <View style={styles.iconCircle}>
                <FontAwesome name="clock-o" size={36} color="#f59e0b" />
              </View>

              <Text style={styles.approvalTitle}>
                Parental Approval Required
              </Text>
              <Text style={styles.approvalSubtitle}>
                We've sent an approval request to your parent/guardian at:
              </Text>

              <View style={styles.emailPill}>
                <FontAwesome name="envelope" size={14} color="#6b7280" />
                <Text style={styles.emailText}>{parentEmail}</Text>
              </View>

              <View style={styles.infoBox}>
                <View style={styles.infoRow}>
                  <FontAwesome
                    name="exclamation-circle"
                    size={16}
                    color="#f59e0b"
                  />
                  <Text style={styles.infoHeader}> What you can do now:</Text>
                </View>
                <Text style={styles.infoItem}>
                  • Browse volunteer opportunities
                </Text>
                <Text style={styles.infoItem}>
                  • Save opportunities you like
                </Text>
                <Text style={styles.infoItem}>• View opportunity details</Text>
                <Text style={styles.infoHeader}>What requires approval:</Text>
                <Text style={styles.infoItem}>• Applying to opportunities</Text>
              </View>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleClose}
              >
                <Text style={styles.continueButtonText}>
                  Continue to Browse
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // ── Normal detail view ──────────────────────────────
            <>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Details</Text>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                >
                  <FontAwesome
                    name="times"
                    size={24}
                    color={theme.colors.onSurface}
                  />
                </TouchableOpacity>
              </View>

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

              <View style={styles.footer}>
                <TouchableOpacity
                  style={[
                    styles.applyButton,
                    isApplied(opportunity.jobID) && styles.applyButtonDisabled,
                  ]}
                  onPress={handleApply}
                  disabled={isApplied(opportunity.jobID)}
                >
                  <Text style={styles.applyButtonText}>
                    {isApplied(opportunity.jobID) ? "Already Applied" : "Apply"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    // ── Detail view styles ──
    applyButtonDisabled: {
      backgroundColor: theme.colors.surfaceDisabled,
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
    closeButton: { padding: 5 },
    scrollView: { flexShrink: 1 },
    scrollContent: { paddingBottom: 10 },
    image: {
      borderRadius: 10,
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

    // ── Approval view styles ──
    approvalContainer: {
      padding: 24,
      alignItems: "center",
    },
    iconCircle: {
      backgroundColor: theme.colors.onSecondaryContainer,
      borderRadius: 50,
      width: 72,
      height: 72,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    approvalTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.onBackground,
      textAlign: "center",
      marginBottom: 8,
    },
    approvalSubtitle: {
      fontSize: 14,
      color: "#999",
      textAlign: "center",
      marginBottom: 12,
    },
    emailPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: theme.colors.onBackground,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginBottom: 16,
    },
    emailText: {
      fontSize: 14,
      color: theme.colors.background,
      fontWeight: "500",
    },
    infoBox: {
      backgroundColor: theme.colors.secondaryContainer,
      borderRadius: 10,
      padding: 14,
      width: "100%",
      marginBottom: 20,
      gap: 4,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    infoHeader: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.onSecondaryContainer,
      marginBottom: 4,
      marginTop: 6,
    },
    infoItem: {
      fontSize: 13,
      color: theme.colors.onSecondaryContainer,
      paddingLeft: 8,
      lineHeight: 20,
    },
    continueButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      width: "100%",
      alignItems: "center",
      marginBottom: 12,
    },
    continueButtonText: {
      color: theme.colors.onPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default DetailInfo;
