import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";
import { updateInterests } from "../services/API";

const INTERESTS = [
  { id: "environment", label: "Environment", emoji: "🌱" },
  { id: "education", label: "Education", emoji: "📚" },
  { id: "animal_welfare", label: "Animal Welfare", emoji: "🐾" },
  { id: "community", label: "Community", emoji: "🤝" },
  { id: "health", label: "Health", emoji: "❤️" },
];

const InterestList = ({ navigation, route, onLogin }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const isEditing = route?.params?.isEditing ?? false;
  const prefilled = route?.params?.currentInterests ?? [];

  const [selected, setSelected] = useState(new Set(prefilled));
  const [loading, setLoading] = useState(false);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    if (selected.size === 0) {
      Alert.alert("Please select at least one interest");
      return;
    }
    setLoading(true);
    try {
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);
      const interestArray = Array.from(selected);

      await updateInterests({ email: user.email, interestList: interestArray });

      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...user, interestList: interestArray }),
      );

      if (isEditing) {
        navigation.goBack();
      } else {
        onLogin();
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not save interests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Select Your Interests</Text>
        <Text style={styles.subtitle}>
          Choose the causes you care about. We'll show you personalized
          opportunities.
        </Text>

        <View style={styles.grid}>
          {INTERESTS.map((item) => {
            const isSelected = selected.has(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => toggle(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.cardLabel,
                    isSelected && styles.cardLabelSelected,
                  ]}
                >
                  {item.label}
                </Text>
                <View
                  style={[styles.radio, isSelected && styles.radioSelected]}
                >
                  {isSelected && <Text style={styles.radioTick}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {selected.size === 0 && (
          <Text style={styles.warning}>
            Please select at least one interest
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            (selected.size === 0 || loading) && styles.buttonDisabled,
          ]}
          onPress={handleSave}
          disabled={loading || selected.size === 0}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isEditing
                ? `Save (${selected.size} selected)`
                : `Continue (${selected.size} selected)`}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scroll: {
      padding: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.colors.onBackground,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.primary,
      marginBottom: 24,
      lineHeight: 20,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "space-between",
    },
    card: {
      width: "47%",
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: theme.colors.outlineVariant,
      padding: 16,
      alignItems: "center",
      gap: 8,
    },
    cardSelected: {
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.primary,
    },
    emoji: {
      fontSize: 32,
    },
    cardLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.onSurface,
      textAlign: "center",
    },
    cardLabelSelected: {
      color: theme.colors.onPrimary,
      fontWeight: "600",
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: "#aaa",
      alignItems: "center",
      justifyContent: "center",
    },
    radioSelected: {
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.secondary,
    },
    radioTick: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
    footer: {
      padding: 20,
      paddingBottom: 36,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.background,
    },
    warning: {
      color: theme.colors.primary,
      textAlign: "center",
      fontSize: 13,
      marginBottom: 8,
    },
    button: {
      backgroundColor: theme.colors.primaryContainer,
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
    },
    buttonDisabled: {
      backgroundColor: theme.colors.surfaceDisabled,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default InterestList;
