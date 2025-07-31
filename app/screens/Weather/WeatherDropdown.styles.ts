import { Fonts } from "@/app/fonts";
import { theme } from "@/app/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  locationList: {
    position: "absolute",
    width: "100%",
    zIndex: 50,
    alignItems: "center",
  },
  locationItemButton: {
    flexDirection: "row",
    margin: 5,
    padding: 5,
    gap: 8,
    borderRadius: 10,
  },
  locationItemText: { fontSize: 16, fontFamily: Fonts.REGULAR },
  dropdownContainer: {
    width: "90%",
    flex: 1,
    backgroundColor: theme.pallette.text[700],
    borderRadius: 16,
    marginTop: 10,
    padding: 8,
  },
});

export { styles };
