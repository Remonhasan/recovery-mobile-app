import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

interface NotifyProps {
    visible: boolean;
    type: "success" | "error";
    message: string;
    onClose: () => void;
}

const Notify: React.FC<NotifyProps> = ({
    visible,
    type,
    message,
    onClose,
}) => {
  const isSuccess = type === "success";
  const iconSource = isSuccess
    ? require("./success-icon.png")
    : require("./error-icon.png");

  return (
    <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, isSuccess ? styles.success : styles.error]}>
          <Image source={iconSource} style={styles.icon} />
          <Text style={styles.title}>{isSuccess ? "SUCCESS" : "ERROR"}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>
              {isSuccess ? "CONTINUE" : "AGAIN"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
    elevation: 10,
  },
  success: {
    borderColor: "#4CAF50",
  },
  error: {
    borderColor: "#FF5252",
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Notify;
