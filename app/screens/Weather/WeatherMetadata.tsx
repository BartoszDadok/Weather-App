import { Entypo, Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "./WeatherMetadata.styles";
import { theme } from "@/app/theme";
import { msToKmh } from "@/app/utils";
import { WeatherResponse } from "@/app/store/types";

type WeatherMetadataProps = {
  current: WeatherResponse["list"][0];
};
const WeatherMetadata = ({
  current: { dt_txt: last_updated, wind, main },
}: WeatherMetadataProps) => {
  const lastUpdated = new Date(last_updated || "").toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.item}>
          <Feather name="wind" size={30} color={theme.pallette.text[700]} />
          <Text style={styles.itemText}>{msToKmh(wind.speed)} km/h</Text>
        </View>
        <View style={styles.item}>
          <Entypo name="drop" size={30} color={theme.pallette.text[700]} />
          <Text style={styles.itemText}>{main.humidity}%</Text>
        </View>
        <View style={styles.item}>
          <Feather name="sun" size={30} color={theme.pallette.text[700]} />
          <Text style={styles.itemText}>{lastUpdated}</Text>
        </View>
      </View>
    </View>
  );
};

export { WeatherMetadata };
