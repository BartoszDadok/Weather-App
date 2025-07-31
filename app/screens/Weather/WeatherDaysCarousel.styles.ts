import { Fonts } from "@/app/fonts";
import { theme } from "@/app/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  carouselContainer: { marginTop: 24 },
  carouselItemContainer: {
    backgroundColor: theme.pallette.black[100],
    width: 110,
    alignItems: "center",
    borderRadius: 22,
    gap: 8,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginTop: 24,
    marginHorizontal: 4,
  },
  dayText: {
    color: theme.pallette.text[700],
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
  },
  tempText: {
    color: theme.pallette.text[700],
    fontSize: 18,
    fontFamily: Fonts.BOLD,
  },
  image: { width: 32, height: 32 },
});

export { styles };
