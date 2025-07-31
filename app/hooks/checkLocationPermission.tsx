import * as Location from "expo-location";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { addLocation } from "../store/state";

type LocationCoordinates = {
  latitude: number;
  longitude: number;
};

const DEFAULT_COORDINATES = {
  latitude: 38.722252,
  longitude: -9.139337,
};

const checkLocationPermission = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === Location.PermissionStatus.GRANTED) {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest,
          });
          const {
            coords: { latitude, longitude },
          } = location;

          dispatch(addLocation({ latitude, longitude }));
          return;
        }
        dispatch(addLocation(DEFAULT_COORDINATES));
      } catch (error) {
        dispatch(addLocation(DEFAULT_COORDINATES));
      }
    };
    getLocation();
  }, []);
};

export { checkLocationPermission, DEFAULT_COORDINATES, LocationCoordinates };
