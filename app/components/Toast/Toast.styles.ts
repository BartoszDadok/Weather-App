import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "@/app/utils";
import { Fonts } from "@/app/fonts";
import { theme } from "@/app/theme";

const styles = StyleSheet.create({
  success: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 4,
    marginHorizontal: 10,
    width: "90%",
    alignItems: "center",
    borderLeftColor: theme.pallette.green[500],
    backgroundColor: theme.pallette.green[500],
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
    marginVertical: 10,
  },
  message: {
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    flexWrap: "wrap",
    maxWidth: SCREEN_WIDTH - 150,
  },
  error: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 4,
    marginHorizontal: 10,
    width: "90%",
    alignItems: "center",
    borderLeftColor: theme.pallette.red[500],
    backgroundColor: theme.pallette.red[500],
    justifyContent: "space-between",
  },
  icon: { color: theme.pallette.black[900] },
  iconButton: { alignSelf: "center", marginHorizontal: 10 },
});

export { styles };
