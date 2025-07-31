import { StyleSheet, View, Text } from "react-native";

const NoWeatherData = () => {
  return (
    <View style={styles.container}>
      <Text>
        No weather data, please try again later, or search for a different
        location
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { NoWeatherData };
