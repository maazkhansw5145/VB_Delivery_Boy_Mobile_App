import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="mediumslateblue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Loading;