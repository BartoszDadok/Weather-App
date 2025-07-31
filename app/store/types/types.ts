type LocationCoordinates = {
  latitude: number;
  longitude: number;
};

type SearchLocation = {
  city: string;
};

type SearchLocationResponse = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
  local_names: Record<string, string>;
}[];

type WeatherResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastEntry[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

type ForecastEntry = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: "d" | "n";
  };
  dt_txt: string;
};

type WeatherDescription = {
  id: number;
  main: WeatherCategory;
  description: string;
  icon: string;
};

type WeatherCategory =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado"
  | "Clear"
  | "Clouds";

export {
  LocationCoordinates,
  SearchLocation,
  SearchLocationResponse,
  WeatherResponse,
  ForecastEntry,
};
