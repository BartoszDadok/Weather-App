import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { preventAutoHideAsync } from "expo-splash-screen";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/app/components/Toast";
import { BOTTOM_TOAST_OFFSET } from "../utils";
import { Weather } from "@/app/screens";
import { Routes } from "./routes";
import { checkLocationPermission } from "../hooks";
import { useAppSelector } from "../store";

const RootStack = createNativeStackNavigator();

preventAutoHideAsync();

const Router = () => {
  const { location } = useAppSelector(({ location }) => location);
  const [fontLoaded] = useFonts({
    "Lato-Light": require("../assets/fonts/LatoLight.ttf"),
    "Lato-Regular": require("../assets/fonts/LatoRegular.ttf"),
    "Lato-Bold": require("../assets/fonts/LatoBold.ttf"),
  });

  useEffect(() => {
    if (fontLoaded && location !== null) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, location]);

  checkLocationPermission();

  if (!fontLoaded || location === null) {
    return null;
  }

  return (
    <>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={Routes.WEATHER} component={Weather} />
      </RootStack.Navigator>
      <Toast
        config={toastConfig}
        position="bottom"
        bottomOffset={BOTTOM_TOAST_OFFSET}
      />
    </>
  );
};

export { Router };
