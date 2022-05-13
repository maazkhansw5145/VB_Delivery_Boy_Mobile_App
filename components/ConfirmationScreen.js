import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ConfirmationScreen = (props) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.mainView}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <Text style={styles.title}>{props.title}</Text>
          {props.msg && <Text style={styles.msg}>{props.msg}</Text>}
        </View>
        <View style={styles.TouchableOpacityButtons}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              props.onYes();
            }}
          >
            <Text style={styles.actionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              props.navigation.navigate.goBack();
            }}
          >
            <Text style={styles.actionText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  mainView: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    backgroundColor: "rgb(224, 224, 222)",
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "limegreen",
  },
  buttonClose: {
    backgroundColor: "lightcoral",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
    fontFamily: "serif",
  },
  msg: {
    marginBottom: 25,
    fontStyle: "italic",
    fontFamily: "serif",
  },
  TouchableOpacityButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ConfirmationScreen;
