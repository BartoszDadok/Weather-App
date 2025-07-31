import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Weather } from "../Weather";
import { WeatherResponse } from "@/app/store/types";
import { createTestWrapper } from "@/app/tests-utils";
import {
  useGetWeatherQuery,
  useLazyGetLocationsQuery,
} from "@/app/store/api/api";
import Toast from "react-native-toast-message";

const mockWeatherData: WeatherResponse = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1717234800,
      main: {
        temp: 293.15,
        feels_like: 292.15,
        temp_min: 291.15,
        temp_max: 295.15,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 50,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 4.63,
        deg: 300,
        gust: 5.7,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2025-02-24 12:00:00",
    },
  ],
  city: {
    id: 2950159,
    name: "Lisbon",
    coord: {
      lat: 38.722252,
      lon: -9.139337,
    },
    country: "PT",
    population: 5000000,
    timezone: 3600,
    sunrise: 1717234800,
    sunset: 1717288800,
  },
};

jest.mock("@expo/vector-icons", () => ({
  AntDesign: jest.fn(),
  Entypo: jest.fn(),
  Feather: jest.fn(),
  FontAwesome5: jest.fn(),
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0 }),
}));

jest.mock("@/app/store/api/api", () => ({
  ...jest.requireActual("@/app/store/api/api"),
  useGetWeatherQuery: jest.fn(),
  useLazyGetLocationsQuery: jest.fn(),
}));

describe("Weather Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useLazyGetLocationsQuery as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({ data: [] }),
      { isLoading: false, error: null },
    ]);
  });

  it("renders correctly and shows loading state initially", () => {
    (useGetWeatherQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = render(<Weather />, {
      wrapper: createTestWrapper(),
    });
    expect(getByTestId("loading")).toBeTruthy();
  });

  it("renders weather data after loading", async () => {
    (useGetWeatherQuery as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Weather />, {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => {
      expect(getByText("Lisbon, PT")).toBeTruthy();
      expect(getByText("19°")).toBeTruthy();
      expect(getByText("Clear sky")).toBeTruthy();
      expect(getByText("22° / 18°")).toBeTruthy();
    });
  });

  it("handles search and shows locations", async () => {
    (useGetWeatherQuery as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const mockLocations = [{ name: "Lisbon", country: "PT" }];
    (useLazyGetLocationsQuery as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({ data: mockLocations }),
      { isLoading: false, error: null },
    ]);

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Weather />,
      {
        wrapper: createTestWrapper(),
      }
    );

    const searchIcon = getByTestId("search-icon");
    fireEvent.press(searchIcon);
    const searchInput = getByPlaceholderText("Search City");
    fireEvent.changeText(searchInput, "Lisbon");

    await waitFor(() => {
      expect(getByText("Lisbon, PT")).toBeTruthy();
    });
  });

  it("shows error toast on search failure", async () => {
    (useGetWeatherQuery as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const mockGetLocations = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(new Error("Network Error")),
    });
    (useLazyGetLocationsQuery as jest.Mock).mockReturnValue([
      mockGetLocations,
      { isLoading: false, error: null },
    ]);

    const { getByPlaceholderText, getByTestId } = render(<Weather />, {
      wrapper: createTestWrapper(),
    });

    const searchIcon = getByTestId("search-icon");
    fireEvent.press(searchIcon);

    const searchInput = getByPlaceholderText("Search City");
    fireEvent.changeText(searchInput, "Lisbon");

    await waitFor(() => {
      expect(mockGetLocations).toHaveBeenCalledWith({ city: "Lisbon" });
    });
    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith({
        type: "error",
        text1: "Something went wrong, Please try again later!",
      });
    });
  });

  it("renders WeatherDaysCarousel with forecast data", async () => {
    (useGetWeatherQuery as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Weather />, {
      wrapper: createTestWrapper(),
    });
    await waitFor(() => {
      expect(getByText("Monday")).toBeTruthy();
      expect(getByText("22° / 18°")).toBeTruthy();
    });
  });

  it("renders WeatherMetadata with current weather data", async () => {
    (useGetWeatherQuery as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Weather />, {
      wrapper: createTestWrapper(),
    });
    await waitFor(() => {
      expect(getByText("16.67 km/h")).toBeTruthy();
      expect(getByText("50%")).toBeTruthy();
    });
  });

  it("renders WeatherDropdown with location suggestions", async () => {
    const mockLocations = [{ name: "Lisbon", country: "Portugal" }];
    (useGetWeatherQuery as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });
    (useLazyGetLocationsQuery as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({ data: mockLocations }),
      { isLoading: false, error: null },
    ]);

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Weather />,
      {
        wrapper: createTestWrapper(),
      }
    );
    const searchIcon = getByTestId("search-icon");

    fireEvent.press(searchIcon);

    const searchInput = getByPlaceholderText("Search City");

    fireEvent.changeText(searchInput, "Lisbon");
    await waitFor(() => {
      expect(getByText("Lisbon, PT")).toBeTruthy();
    });
  });

  it("renders WeatherData with location and current weather data", async () => {
    (useGetWeatherQuery as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Weather />, {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => {
      expect(getByText("Lisbon, PT")).toBeTruthy();
      expect(getByText("19°")).toBeTruthy();
      expect(getByText("Clear sky")).toBeTruthy();
    });
  });
});
