import { Fonts } from "@/app/fonts";
import { theme } from "@/app/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  weatherSearchBarContainer: {
    paddingHorizontal: 16,
  },
  inputContainer: { flex: 1 },
  searchBarContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.pallette.text[700],
    paddingHorizontal: 8,
    fontFamily: Fonts.REGULAR,
  },
  searchIconButton: {
    backgroundColor: theme.pallette.text[100],
    padding: 8,
    borderRadius: 50,
  },
});

export { styles };
