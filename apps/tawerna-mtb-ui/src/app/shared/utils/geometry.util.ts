import { Location } from '../models/location.model';

export const EARTH_RADIUS_KM = 6371;

export function distanceBetween(
  location: Pick<Location, 'latitude' | 'longitude'>,
  coordinates: { latitude: number; longitude: number },
): number {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(location.latitude - coordinates.latitude);
  const longitudeDelta = radians(location.longitude - coordinates.longitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(radians(coordinates.latitude)) *
      Math.cos(radians(location.latitude)) *
      Math.sin(longitudeDelta / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}