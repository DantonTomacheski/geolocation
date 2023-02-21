import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const MapContainer = styled(MapView)`
  flex: 1;
  width: 100%;
`;

export const MarkerContainer = styled(Marker)``;
