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
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export const DetailInfo = ({ visible, onClose, title, image, details }) => {
  return (
    <SafeAreaProvider>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{"Details"}</Text>
            <ScrollView style={styles.scrollView}>
              <Image
                source={{ uri: image }}
                style={{ width: 350, height: 200, marginBottom: 15 }}
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
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingTop: 30,
  },
  modalView: {
    height: "90%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
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
  },
  scrollView: {
    width: "100%",
    margin: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailInfo;
