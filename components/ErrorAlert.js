import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ErrorAlert = ({ error }) => {
  return (
    <View style={styles.alert}>
      <MaterialCommunityIcons
        name="information-outline"
        size={24}
        color="red"
      />
      <Text style={styles.msg}>{error.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    borderRadius: 20,
    backgroundColor: "rgb(250, 214, 207)",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical:10
  },
  msg: {
    color: "red",
    marginHorizontal: 10,
  },
});

export default ErrorAlert;