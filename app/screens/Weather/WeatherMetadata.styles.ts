import { Fonts } from "@/app/fonts";
import { theme } from "@/app/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    marginTop: 40,
  },
  item: { flexDirection: "row", alignItems: "center", gap: 8 },
  itemText: {
    color: theme.pallette.text[700],
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
  },
});

export { styles };
