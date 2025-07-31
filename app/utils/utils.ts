import { Dimensions, ImageSourcePropType } from "react-native";
import { ForecastEntry } from "../store/types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const KELVIN_TO_CELSIUS = 273.15;
const MS_TO_KMH = 3.6;
const BOTTOM_TOAST_OFFSET = 80;

// TODO: Add more corresponding imgs
const weatherImages = {
  Clear: require("../assets/images/sun.png"),
  Clouds: require("../assets/images/cloud.png"),
  Overcast: require("../assets/images/cloud.png"),
  Cloudy: require("../assets/images/cloud.png"),
  Rain: require("../assets/images/moderaterain.png"),
  Snow: require("../assets/images/moderaterain.png"),
  Thunderstorm: require("../assets/images/heavyrain.png"),
  Drizzle: require("../assets/images/moderaterain.png"),
  Atmosphere: require("../assets/images/mist.png"),
  Mist: require("../assets/images/mist.png"),
  Smoke: require("../assets/images/mist.png"),
  Haze: require("../assets/images/mist.png"),
  Dust: require("../assets/images/mist.png"),
  Fog: require("../assets/images/mist.png"),
  Sand: require("../assets/images/mist.png"),
  Ash: require("../assets/images/mist.png"),
  Squall: require("../assets/images/mist.png"),
  Tornado: require("../assets/images/mist.png"),
  other: require("../assets/images/moderaterain.png"),
} as Record<string, ImageSourcePropType>;

const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const msToKmh = (speedMs: number) => Number((speedMs * MS_TO_KMH).toFixed(2));

const kelvinToCelsius = (kelvin: number) =>
  Number((kelvin - KELVIN_TO_CELSIUS).toFixed(0));

const groupByWeekday = (allForecasts: ForecastEntry[]) =>
  allForecasts.reduce((daysAccumulator, currentForecast) => {
    const weekDay = new Date(currentForecast.dt_txt).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );
    if (!daysAccumulator[weekDay]) {
      daysAccumulator[weekDay] = [];
    }
    daysAccumulator[weekDay].push(currentForecast);
    return daysAccumulator;
  }, {} as Record<string, ForecastEntry[]>);

const getMiddleForecast = (forecasts: ForecastEntry[]) => {
  const mid = Math.floor(forecasts.length / 2);
  return forecasts[mid];
};

const getMinMaxDayTemp = (forecasts: ForecastEntry[]) => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  for (const forecast of forecasts) {
    const tempForecastMin = forecast.main.temp_min;
    const tempForecastMax = forecast.main.temp_max;

    if (tempForecastMin < min) min = tempForecastMin;
    if (tempForecastMax > max) max = tempForecastMax;
  }

  return {
    min: Number(min),
    max: Number(max),
  };
};

export {
  BOTTOM_TOAST_OFFSET,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  weatherImages,
  kelvinToCelsius,
  capitalizeFirstLetter,
  msToKmh,
  groupByWeekday,
  getMiddleForecast,
  getMinMaxDayTemp,
};
