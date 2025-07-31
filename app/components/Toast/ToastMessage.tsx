import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./Toast.styles";

type Props = {
  status: "success" | "error";
  message?: string;
};

const ToastMessage = ({ status, message }: Props) => {
  const onPress = () => Toast.hide();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={status === "success" ? styles.success : styles.error}
    >
      <View style={styles.container}>
        <View style={styles.iconButton}>
          <MaterialCommunityIcons
            name={
              status === "success"
                ? "check-circle-outline"
                : "alert-circle-outline"
            }
            size={20}
            color={styles.icon.color}
          />
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.iconButton}>
        <MaterialCommunityIcons
          name="close"
          size={20}
          color={styles.icon.color}
        />
      </View>
    </TouchableOpacity>
  );
};
export { ToastMessage };
