import { View } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./Loading.styles";
import { useEffect } from "react";

type LoadingScreenProps = {
  testID?: string;
};

const Loading = ({ testID }: LoadingScreenProps) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View testID={`${testID}`} style={styles.loadingContainer}>
      <Animated.View style={[styles.spinner, animatedStyle]} />
    </View>
  );
};

export { Loading };
