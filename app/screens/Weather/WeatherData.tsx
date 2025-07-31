import {
  capitalizeFirstLetter,
  kelvinToCelsius,
  weatherImages,
} from "@/app/utils";
import { Image, Text, View } from "react-native";
import { styles } from "./WeatherData.styles";
import { WeatherResponse } from "@/app/store/types";

type WeatherDataProps = {
  location: WeatherResponse["city"];
  current: WeatherResponse["list"][0];
};

const WeatherData = ({
  location: { name, country },
  current: { weather, main },
}: WeatherDataProps) => (
  <>
    <View style={styles.container}>
      <Text style={styles.locationText}>{`${name}, ${country}`}</Text>
    </View>

    <View style={styles.imageContainer}>
      <Image
        source={
          weather.length > 0
            ? weatherImages[weather[0]?.main]
            : weatherImages.other
        }
        resizeMethod="resize"
        style={styles.image}
      />
    </View>
    <View>
      <Text style={styles.temperatureText}>
        {kelvinToCelsius(main.feels_like).toFixed(0)}&#176;
      </Text>
      <Text style={styles.stateText}>
        {capitalizeFirstLetter(weather[0]?.description)}
      </Text>
    </View>
  </>
);

export { WeatherData };
