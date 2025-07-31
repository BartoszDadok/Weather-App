import { SearchLocationResponse } from "@/app/store/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./WeatherDropdown.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TOP_DISTANCE = 60;

type WeatherSearchBarProps = {
  locations: SearchLocationResponse;
  showSearchBar: boolean;
  handleLocation: (lat: number, lon: number) => void;
};

const WeatherDropdown = ({
  locations,
  showSearchBar,
  handleLocation,
}: WeatherSearchBarProps) => {
  const { top } = useSafeAreaInsets();
  return (
    locations.length > 0 &&
    showSearchBar && (
      <View style={[styles.locationList, { top: top + TOP_DISTANCE }]}>
        <View style={styles.dropdownContainer}>
          {locations.map(({ lat, lon, name, country }, index) => {
            const handlePressLocation = () => {
              handleLocation(lat, lon);
            };
            return (
              <TouchableOpacity
                onPress={handlePressLocation}
                key={index}
                style={styles.locationItemButton}
              >
                <FontAwesome5 name="map-marker-alt" size={20} color="black" />
                <Text style={styles.locationItemText}>
                  {name}, {country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    )
  );
};

export { WeatherDropdown };
