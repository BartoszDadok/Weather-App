import { theme } from "@/app/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderColor: theme.pallette.text[500],
    borderTopColor: "transparent",
    borderRadius: 25,
  },
});

export { styles };
