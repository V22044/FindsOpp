import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApplications } from "../../context/ApplicationsContext";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const Applications = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { applications, loadApplications, removeApplication } =
    useApplications();

  useFocusEffect(
    useCallback(() => {
      loadApplications();
    }, []),
  );

  if (applications.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <FontAwesome name="file-text-o" size={64} color="#bdbdbd" />
        <Text style={styles.emptyTitle}>No Applications Yet</Text>
        <Text style={styles.emptySubtitle}>
          Opportunities you apply for will appear here.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Applications</Text>
        <Text style={styles.headerSubtitle}>
          Track your volunteer applications
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {applications.map((app, index) => (
          <View key={`${app.jobID}_${index}`} style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleBlock}>
                <Text style={styles.cardTitle}>{app.title}</Text>
                <Text style={styles.cardOrg}>{app.organisation}</Text>
              </View>
              <FontAwesome
                name="check-circle"
                size={24}
                color={theme.colors.primary}
              />
            </View>

            {/* Approved box */}
            <View style={styles.approvedBox}>
              <Text style={styles.approvedTitle}>
                Approved - Complete Booking
              </Text>
              <Text style={styles.approvedText}>
                Contact {app.organisation}
                {app.contact?.email ? ` at ${app.contact.email}` : ""}
                {app.signup_link ? ` or visit ${app.signup_link}` : ""} to
                complete your booking.
              </Text>
              {app.signup_link && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(app.signup_link)}
                >
                  <Text style={styles.link}>{app.signup_link}</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Applied timestamp */}
            <View style={styles.cardFooter}>
              <Text style={styles.appliedAt}>
                Applied: {formatDate(app.appliedAt)}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Cancel Application",
                    "Are you sure you want to cancel your application?",
                    [
                      { text: "No", style: "cancel" },
                      {
                        text: "Yes, Cancel",
                        style: "destructive",
                        onPress: () => removeApplication(app.jobID),
                      },
                    ],
                  )
                }
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#bdbdbd",
      marginTop: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: "#bdbdbd",
      textAlign: "center",
      paddingHorizontal: 40,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.colors.onBackground,
    },
    headerSubtitle: {
      fontSize: 13,
      color: theme.colors.primary,
      marginTop: 2,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
      gap: 16,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    cardTitleBlock: {
      flex: 1,
      paddingRight: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.onSurface,
    },
    cardOrg: {
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
      marginTop: 2,
    },
    approvedBox: {
      backgroundColor: "#e8f5e9",
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    approvedTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: "#2e7d32",
      marginBottom: 4,
    },
    approvedText: {
      fontSize: 13,
      color: "#2e7d32",
      lineHeight: 18,
    },
    link: {
      fontSize: 13,
      color: "#1565c0",
      textDecorationLine: "underline",
      marginTop: 4,
    },
    appliedAt: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cancelButton: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#e53935",
    },
    cancelText: {
      fontSize: 12,
      color: "#e53935",
      fontWeight: "600",
    },
  });

export default Applications;
