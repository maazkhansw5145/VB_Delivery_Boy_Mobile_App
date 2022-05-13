import * as Location from "expo-location";

export default async function currentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return "Permission denied";
  }

  let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
  return location;
}