import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import currentLocation from "./currentLocation";
import Loading from "../Loading";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { orderCompleted } from "../../redux/actions/deliveryboyActions";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

function MapViewComponent(props) {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const order = props.route.params.order;

  useEffect(() => {
    if (props.order === null) {
      props.navigation.navigate("Receipt", {
        order: order,
      });
    }
  }, [props.order]);

  useEffect(() => {
    let loc = currentLocation();
    loc.then(async (l) => {
      if (l === "Permission denied") {
        showAlert();
      } else {
        setCoordinates({
          latitude: l.coords.latitude,
          longitude: l.coords.longitude,
        });
        setLoading(false);
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 1,
          },
          (newLocation) => {
            setCoordinates({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
          }
        );
      }
    });
  }, []);

  if (!coordinates) {
    return <Loading />;
  }

  function showAlert() {
    Alert.alert(
      "Location Permission Denied",
      "We cannot proceed without your location.",
      [
        {
          text: "Try Again",
          onPress: () => myLocation(),
        },
        {
          text: "Cancel",
          onPress: () => props.navigation.navigate("ItemsScreen"),
        },
      ]
    );
  }

  function myLocation() {
    let loc = currentLocation();
    loc.then((l) => {
      if (l === "Permission denied") {
        showAlert();
      } else {
        setCoordinates({
          latitude: l.coords.latitude,
          longitude: l.coords.longitude,
        });
        setLoading(false);
      }
    });
  }

  console.log("LOCATION 1", coordinates.latitude, coordinates.longitude);
  console.log(
    "LOCATION 2",
    order.location.coordinates[0],
    order.location.coordinates[1]
  );
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        mapType="hybrid"
      >
        <Marker
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
        >
          <Image
            source={require("../../assets/rider.png")}
            style={{ height: 35, width: 35 }}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: order.location.coordinates[0],
            longitude: order.location.coordinates[1],
          }}
        />
        <MapViewDirections
          origin={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
          destination={{
            latitude: order.location.coordinates[0],
            longitude: order.location.coordinates[1],
          }}
          apikey={"AIzaSyBbzt5t9rg2kCEIBPn8_OGW1Y50tHGJ6sk"}
          precision="high"
          strokeWidth={5}
          strokeColor="cornflowerblue"
          // optimizeWaypoints={true}
          // onStart={(params) => {
          //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
          // }}
          // onReady={result => {
          //   console.log(`Distance: ${result.distance} km`)
          //   console.log(`Duration: ${result.duration} min.`)

          //   mapView.fitToCoordinates(result.coordinates, {
          //     edgePadding: {
          //       right: (width / 20),
          //       bottom: (height / 20),
          //       left: (width / 20),
          //       top: (height / 20),
          //     }
          //   });
          // }}
          // onError={(errorMessage) => {
          //   // console.log('GOT AN ERROR');
          // }}
        />
      </MapView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={[styles.overlay, styles.backButton]}
      >
        <MaterialIcons
          name="keyboard-backspace"
          size={24}
          color="black"
          style={{ padding: 15 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.overlay, styles.myLocation]}
        onPress={myLocation}
      >
        <MaterialIcons
          name="my-location"
          size={24}
          color="orangered"
          style={{ padding: 15 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.overlay, styles.done]}
        disabled={loading}
        onPress={() => {
          setLoading(true);
          props.orderCompleted(order._id, props.route.params.deliveryboyId);
        }}
      >
        {!loading ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="checkmark-done-sharp"
              size={28}
              color="black"
              style={{ padding: 12 }}
            />
            <Text style={{ fontSize: 18, paddingRight: 15, color: "black" }}>
              Arrived on location
            </Text>
          </View>
        ) : (
          <Loading />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(236, 236, 236,0.8)",
    // padding: 15,
    borderRadius: 30,
  },
  myLocation: {
    top: 10,
    right: 10,
  },
  backButton: {
    top: 10,
    left: 10,
  },
  done: {
    bottom: 11,
  },
  text: {
    bottom: 10,
    left: 10,
    width: Dimensions.get("window").width - 80,
    position: "absolute",
    backgroundColor: "rgba(236, 236, 236,0.9)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 4,
  },
});

const mapStateToProps = (state) => ({
  order: state.server.order,
});

export default connect(mapStateToProps, { orderCompleted })(MapViewComponent);
