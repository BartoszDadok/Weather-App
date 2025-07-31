import {
  getMiddleForecast,
  getMinMaxDayTemp,
  kelvinToCelsius,
  weatherImages,
} from "@/app/utils";
import { Image, ScrollView, Text, View } from "react-native";
import { styles } from "./WeatherDaysCarousel.styles";
import { ForecastEntry } from "@/app/store/types";

type WeatherDaysCarouselProps = {
  dayByDayWeather: Record<string, ForecastEntry[]>;
};

const WeatherDaysCarousel = ({ dayByDayWeather }: WeatherDaysCarouselProps) => (
  <View style={styles.carouselContainer}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {Object.keys(dayByDayWeather).map((dayForecasts, index) => {
        const currentDayForecast = dayByDayWeather[dayForecasts];
        const { min, max } = getMinMaxDayTemp(currentDayForecast);

        const newDate = new Date(currentDayForecast[0].dt_txt);
        const dayName = newDate.toLocaleDateString("en-US", {
          weekday: "long",
        });

        const tempMin = kelvinToCelsius(min);
        const tempMax = kelvinToCelsius(max);

        const middleForecast = getMiddleForecast(currentDayForecast);
        return (
          <View key={index} style={styles.carouselItemContainer}>
            <Image
              source={
                weatherImages[middleForecast?.weather?.[0]?.main] ||
                weatherImages.other
              }
              style={styles.image}
            />
            <Text style={styles.dayText} numberOfLines={1}>
              {dayName}
            </Text>
            <Text style={styles.tempText}>
              {tempMax}&#176; / {tempMin}&#176;
            </Text>
          </View>
        );
      })}
    </ScrollView>
  </View>
);

export { WeatherDaysCarousel };
