import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const NoNotification = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate("OrderList")}
    >
      <>
        <LottieView
          source={require("../../assets/animations/no-notification.json")}
          autoPlay
          loop
          style={{ height: 180, width: 180 }}
        />

        <Text style={styles.text}>No Notification Yet</Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    color: "gray",
    fontFamily: "serif",
  },
});

export default NoNotification;
