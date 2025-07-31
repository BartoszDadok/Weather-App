import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  image: {
    position: "absolute",
    zIndex: 0,
    height: "100%",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  weatherDataContainer: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "center",
  },
});

export { styles };
