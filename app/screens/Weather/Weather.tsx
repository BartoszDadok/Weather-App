import { Image, View } from "react-native";
import { styles } from "./Weather.styles";
import { Loading } from "@/app/components/Loading";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WeatherSearchBar } from "./WeatherSearchBar";
import { WeatherDropdown } from "./WeatherDropdown";
import { WeatherDaysCarousel } from "./WeatherDaysCarousel";
import { WeatherMetadata } from "./WeatherMetadata";
import { WeatherData } from "./WeatherData";
import Toast from "react-native-toast-message";
import { groupByWeekday } from "@/app/utils";
import { DEFAULT_COORDINATES, LocationCoordinates } from "@/app/hooks";
import { WeatherRetry } from "./WeatherRetry";
import { NoWeatherData } from "./NoWeatherData";
import { useGetWeatherQuery, useLazyGetLocationsQuery } from "@/app/store/api";
import { useAppSelector } from "@/app/store";
import { SearchLocationResponse } from "@/app/store/types";

const imagePath = "../../assets/icons/mountain.jpg";

const Weather = () => {
  const { location } = useAppSelector((state) => state.location);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState<SearchLocationResponse>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationCoordinates>(
    location || DEFAULT_COORDINATES
  );
  const { bottom } = useSafeAreaInsets();
  const {
    data: weather,
    error,
    isLoading,
    refetch,
  } = useGetWeatherQuery(selectedLocation);
  const [getLocations] = useLazyGetLocationsQuery();
  const handleSearch = async (city: string) => {
    try {
      if (city) {
        const locations = await getLocations({ city }).unwrap();
        setLocations(locations);
        return;
      }
      setLocations([]);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong, Please try again later!",
      });
    }
  };
  const handleLocation = (latitude: number, longitude: number) => {
    setSelectedLocation({ latitude, longitude });
    setLocations([]);
    setShowSearchBar(false);
  };

  const renderWeather = () => {
    if (isLoading) {
      return <Loading testID="loading" />;
    } else if (weather) {
      return (
        <>
          <WeatherSearchBar
            showSearchBar={showSearchBar}
            handleSearch={handleSearch}
            setShowSearchBar={setShowSearchBar}
          />
          <View style={[styles.weatherDataContainer, { marginBottom: bottom }]}>
            <WeatherData current={weather.list[0]} location={weather.city} />
            <WeatherMetadata current={weather.list[0]} />
            <WeatherDaysCarousel
              dayByDayWeather={groupByWeekday(weather?.list)}
            />
          </View>
        </>
      );
    } else if (error) {
      return <WeatherRetry refetch={refetch} />;
    }
    return <NoWeatherData />;
  };

  return (
    <View style={styles.screenContainer}>
      <Image style={styles.image} blurRadius={25} source={require(imagePath)} />
      <View style={styles.contentContainer}>
        {renderWeather()}
        <WeatherDropdown
          locations={locations}
          showSearchBar={showSearchBar}
          handleLocation={handleLocation}
        />
      </View>
    </View>
  );
};

export { Weather };
