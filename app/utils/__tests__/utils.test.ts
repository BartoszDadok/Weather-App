import {
  kelvinToCelsius,
  capitalizeFirstLetter,
  msToKmh,
  groupByWeekday,
  getMiddleForecast,
  getMinMaxDayTemp,
} from "../utils";
import { ForecastEntry } from "../../store/types";

describe("utils", () => {
  describe("kelvinToCelsius", () => {
    it("should convert 273.15 Kelvin to 0 Celsius", () => {
      expect(kelvinToCelsius(273.15)).toBe(0);
    });

    it("should convert 0 Kelvin to -273 Celsius", () => {
      expect(kelvinToCelsius(0)).toBe(-273);
    });

    it("should convert 300 Kelvin to 27 Celsius", () => {
      expect(kelvinToCelsius(300)).toBe(27);
    });

    it("should convert 373.15 Kelvin to 100 Celsius", () => {
      expect(kelvinToCelsius(373.15)).toBe(100);
    });

    it("should handle decimal values correctly", () => {
      expect(kelvinToCelsius(293.15)).toBe(20);
    });

    it("should return a number", () => {
      expect(typeof kelvinToCelsius(300)).toBe("number");
    });
  });

  describe("capitalizeFirstLetter", () => {
    it("should capitalize the first letter of a lowercase string", () => {
      expect(capitalizeFirstLetter("hello")).toBe("Hello");
    });

    it("should keep the first letter capitalized if already uppercase", () => {
      expect(capitalizeFirstLetter("Hello")).toBe("Hello");
    });

    it("should handle single character strings", () => {
      expect(capitalizeFirstLetter("a")).toBe("A");
    });

    it("should handle empty string", () => {
      expect(capitalizeFirstLetter("")).toBe("");
    });

    it("should handle strings with numbers", () => {
      expect(capitalizeFirstLetter("123abc")).toBe("123abc");
    });

    it("should handle special characters", () => {
      expect(capitalizeFirstLetter("!hello")).toBe("!hello");
    });
  });

  describe("msToKmh", () => {
    it("should convert 1 m/s to 3.6 km/h", () => {
      expect(msToKmh(1)).toBe(3.6);
    });

    it("should convert 10 m/s to 36 km/h", () => {
      expect(msToKmh(10)).toBe(36);
    });

    it("should convert 0 m/s to 0 km/h", () => {
      expect(msToKmh(0)).toBe(0);
    });

    it("should handle decimal values", () => {
      expect(msToKmh(2.5)).toBe(9);
    });

    it("should return a number", () => {
      expect(typeof msToKmh(5)).toBe("number");
    });

    it("should round to 2 decimal places", () => {
      expect(msToKmh(1.111)).toBe(4);
    });
  });

  describe("groupByWeekday", () => {
    const mockForecastEntry: ForecastEntry = {
      dt: 1640995200,
      main: {
        temp: 280,
        feels_like: 275,
        temp_min: 275,
        temp_max: 285,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1010,
        humidity: 80,
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
      clouds: { all: 0 },
      wind: { speed: 5, deg: 180, gust: 10 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2022-01-01 12:00:00",
    };

    it("should group forecasts by weekday", () => {
      const forecasts: ForecastEntry[] = [
        { ...mockForecastEntry, dt_txt: "2022-01-01 12:00:00" },
        { ...mockForecastEntry, dt_txt: "2022-01-01 15:00:00" },
        { ...mockForecastEntry, dt_txt: "2022-01-02 12:00:00" },
      ];

      const result = groupByWeekday(forecasts);

      expect(result).toHaveProperty("Saturday");
      expect(result).toHaveProperty("Sunday");
      expect(result.Saturday).toHaveLength(2);
      expect(result.Sunday).toHaveLength(1);
    });

    it("should handle single forecast", () => {
      const forecasts: ForecastEntry[] = [
        { ...mockForecastEntry, dt_txt: "2022-01-01 12:00:00" },
      ];

      const result = groupByWeekday(forecasts);

      expect(result).toHaveProperty("Saturday");
      expect(result.Saturday).toHaveLength(1);
    });

    it("should handle multiple forecasts on same day", () => {
      const forecasts: ForecastEntry[] = [
        { ...mockForecastEntry, dt_txt: "2022-01-01 00:00:00" },
        { ...mockForecastEntry, dt_txt: "2022-01-01 03:00:00" },
        { ...mockForecastEntry, dt_txt: "2022-01-01 06:00:00" },
        { ...mockForecastEntry, dt_txt: "2022-01-01 09:00:00" },
      ];

      const result = groupByWeekday(forecasts);

      expect(result).toHaveProperty("Saturday");
      expect(result.Saturday).toHaveLength(4);
    });
  });

  describe("getMiddleForecast", () => {
    const mockForecastEntry: ForecastEntry = {
      dt: 1640995200,
      main: {
        temp: 280,
        feels_like: 275,
        temp_min: 275,
        temp_max: 285,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1010,
        humidity: 80,
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
      clouds: { all: 0 },
      wind: { speed: 5, deg: 180, gust: 10 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2022-01-01 12:00:00",
    };

    it("should return middle forecast from odd-length array", () => {
      const forecasts: ForecastEntry[] = [
        { ...mockForecastEntry, dt: 1 },
        { ...mockForecastEntry, dt: 2 },
        { ...mockForecastEntry, dt: 3 },
      ];

      const result = getMiddleForecast(forecasts);
      expect(result.dt).toBe(2);
    });

    it("should return middle forecast from even-length array", () => {
      const forecasts: ForecastEntry[] = [
        { ...mockForecastEntry, dt: 1 },
        { ...mockForecastEntry, dt: 2 },
        { ...mockForecastEntry, dt: 3 },
        { ...mockForecastEntry, dt: 4 },
      ];

      const result = getMiddleForecast(forecasts);
      expect(result.dt).toBe(3);
    });

    it("should return single forecast from array with one element", () => {
      const forecasts: ForecastEntry[] = [{ ...mockForecastEntry, dt: 1 }];

      const result = getMiddleForecast(forecasts);
      expect(result.dt).toBe(1);
    });
  });

  describe("getMinMaxDayTemp", () => {
    const mockForecastEntry: ForecastEntry = {
      dt: 1640995200,
      main: {
        temp: 280,
        feels_like: 275,
        temp_min: 275,
        temp_max: 285,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1010,
        humidity: 80,
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
      clouds: { all: 0 },
      wind: { speed: 5, deg: 180, gust: 10 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2022-01-01 12:00:00",
    };

    it("should return min and max temperatures from forecasts", () => {
      const forecasts: ForecastEntry[] = [
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: 270, temp_max: 280 },
        },
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: 275, temp_max: 285 },
        },
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: 280, temp_max: 290 },
        },
      ];

      const result = getMinMaxDayTemp(forecasts);

      expect(result.min).toBe(270);
      expect(result.max).toBe(290);
    });

    it("should handle single forecast", () => {
      const forecasts: ForecastEntry[] = [
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: 275, temp_max: 285 },
        },
      ];

      const result = getMinMaxDayTemp(forecasts);

      expect(result.min).toBe(275);
      expect(result.max).toBe(285);
    });

    it("should handle negative temperatures", () => {
      const forecasts: ForecastEntry[] = [
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: -10, temp_max: 5 },
        },
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: -5, temp_max: 10 },
        },
      ];

      const result = getMinMaxDayTemp(forecasts);

      expect(result.min).toBe(-10);
      expect(result.max).toBe(10);
    });

    it("should handle decimal temperatures", () => {
      const forecasts: ForecastEntry[] = [
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: 20.5, temp_max: 25.7 },
        },
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: 18.2, temp_max: 27.3 },
        },
      ];

      const result = getMinMaxDayTemp(forecasts);

      expect(result.min).toBe(18.2);
      expect(result.max).toBe(27.3);
    });

    it("should return numbers", () => {
      const forecasts: ForecastEntry[] = [
        {
          ...mockForecastEntry,
          main: { ...mockForecastEntry.main, temp_min: 275, temp_max: 285 },
        },
      ];

      const result = getMinMaxDayTemp(forecasts);

      expect(typeof result.min).toBe("number");
      expect(typeof result.max).toBe("number");
    });
  });
});
