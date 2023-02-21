import { useEffect, useRef, useState } from "react";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

import MapView from "react-native-maps";

import { MapViewer } from "@components/mapView";

export const Home = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          pitch: 90,
          center: response.coords,
        });
        console.log("latitude atual", response.coords?.latitude);
        console.log("longitude atual", response.coords?.longitude);
      }
    );
  }, []);

  return location && <MapViewer location={location} mapRef={mapRef} />;
};
