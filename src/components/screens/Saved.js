import { StyleSheet, Text, View } from "react-native";
import { Bookmark } from "lucide-react-native";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useBookmarks } from "../../context/BookmarksContext";
import OppList from "../entity/OppList";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailInfo } from "../UI/DetailInfo";

export const Saved = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { bookmarks } = useBookmarks();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);

  const goToDetails = (opp) => {
    setSelectedOpp(opp);
    setModalVisible(true);
  };

  if (bookmarks.length === 0) {
    return (
      <View style={styles.container}>
        <Bookmark size="80" color="#bdbdbd" strokeWidth="1.25px" />
        <Text style={styles.text}>No Saved Opportunities Yet!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.listContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
        <Text style={styles.headerSubtitle}>
          Track your saved opportunities
        </Text>
      </View>
      <OppList opportunities={bookmarks} onSelect={goToDetails} />

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
  );
};
const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      paddingTop: 150,
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
    listContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 20,
    },
    text: {
      fontSize: 17,
      marginTop: 17,
      color: "#bdbdbd",
    },
  });

export default Saved;
