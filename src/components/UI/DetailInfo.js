import { AlignLeft } from "lucide-react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { useTheme } from "react-native-paper";

export const DetailInfo = ({ visible, onClose, title, image, details }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.centeredView} onPress={onClose}>
        <Pressable
          style={styles.modalView}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.modalTitle}>{"Details"}</Text>
          <ScrollView style={styles.scrollView}>
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 200, marginBottom: 15 }}
              resizeMode="cover"
            />
            <Text style={styles.modalTitle}>{title}</Text>
            {details.map((detail, index) => (
              <Text key={index} style={styles.detailText}>
                {detail}
              </Text>
            ))}
          </ScrollView>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
const makeStyles = (theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#2929299f",
      paddingTop: 100,
    },
    modalView: {
      height: "90%",
      width: "92%",
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      alignSelf: "flex-start",
      color: theme.colors.onBackground,
    },
    scrollView: {
      width: "100%",
      flex: 1,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 10,
      color: theme.colors.onBackground,
    },
    closeButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    closeButtonText: {
      color: theme.colors.onPrimary,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default DetailInfo;
