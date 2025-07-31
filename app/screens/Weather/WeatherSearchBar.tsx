import { AntDesign } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "@/app/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./WeatherSearchBar.styles";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

type WeatherSearchBarProps = {
  showSearchBar: boolean;
  handleSearch: (city: string) => void;
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const WeatherSearchBar = ({
  showSearchBar,
  handleSearch,
  setShowSearchBar,
}: WeatherSearchBarProps) => {
  const { top } = useSafeAreaInsets();

  const handleSearchIconPress = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <View style={[styles.weatherSearchBarContainer, { paddingTop: top }]}>
      <View
        style={[
          styles.searchBarContainer,
          {
            backgroundColor: showSearchBar
              ? theme.pallette.text[100]
              : "transparent",
          },
        ]}
      >
        {showSearchBar && (
          <Animated.View
            entering={FadeInRight}
            exiting={FadeOutRight}
            style={styles.inputContainer}
          >
            <TextInput
              onChangeText={handleSearch}
              placeholder="Search City"
              placeholderTextColor={theme.pallette.text[700]}
              style={styles.searchInput}
            />
          </Animated.View>
        )}

        <TouchableOpacity
          testID="search-icon"
          onPress={handleSearchIconPress}
          style={styles.searchIconButton}
        >
          <AntDesign
            name="search1"
            size={24}
            color={theme.pallette.text[700]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { WeatherSearchBar };
