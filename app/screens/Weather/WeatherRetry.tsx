import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WeatherRetry = ({ refetch }: { refetch: () => void }) => {
  const handleRetry = () => {
    refetch();
  };
  return (
    <View style={styles.container}>
      <Text>Error fetching weather data occurred!</Text>
      <TouchableOpacity onPress={handleRetry}>
        <Text>Try again</Text>
      </TouchableOpacity>
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
export { WeatherRetry };
