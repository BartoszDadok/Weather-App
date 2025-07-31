import type { ExpoConfig } from "@expo/config-types";

export default ({ config }: { config: ExpoConfig }) => {
  return {
    ...config,
    name: "Weather",
    slug: "weather",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/icons/icon.png",
    scheme: "com.polar.weather",
    userInterfaceStyle: "automatic",
    ios: {
      bundleIdentifier: "com.polar.weather",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/icons/adaptive-icon.png",
        backgroundColor: "#00062a",
      },
      softwareKeyboardLayoutMode: "pan",
      package: "com.polar.weather",
    },

    plugins: [
      [
        "expo-dev-launcher",
        {
          launchMode: "most-recent",
        },
      ],
      [
        "expo-splash-screen",
        {
          image: "./app/assets/icons/icon.png",
          imageWidth: 180,
          resizeMode: "contain",
          backgroundColor: "#00062a",
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
      "expo-font",
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};
