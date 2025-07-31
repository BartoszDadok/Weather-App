import { Fonts } from "@/app/fonts";
import { theme } from "@/app/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 24,
    textAlign: "center",
    color: theme.pallette.text[700],
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 16,
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
  },
  temperatureText: {
    textAlign: "center",
    fontSize: 42,
    color: theme.pallette.text[700],
    fontFamily: Fonts.BOLD,
    marginBottom: 14,
  },
  stateText: {
    fontFamily: Fonts.REGULAR,
    textAlign: "center",
    fontSize: 20,
    color: theme.pallette.text[500],
  },
});

export { styles };
