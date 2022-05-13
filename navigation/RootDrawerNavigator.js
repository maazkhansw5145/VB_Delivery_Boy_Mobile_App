import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { StyleSheet, View, Text, Image } from "react-native";
import { Rating } from "react-native-ratings";
import StackNavigator from "./StackNavigator";
import { connect } from "react-redux";
import LoginStackNavigator from "./LoginStackNavigator";
import { changeAvailability } from "../redux/actions/authActions";
const DrawerNavigator = createDrawerNavigator();

const RootNavigator = (props) => {
  return (
    <>
      {props.auth.isAuthenticated ? (
        <DrawerNavigator.Navigator
          screenOptions={{ gestureEnabled: props.auth.isAuthenticated }}
          drawerContent={(navProps) => (
            <DrawerContent
              {...navProps}
              auth={props.auth}
              changeAvailability={props.changeAvailability}
            />
          )}
        >
          <DrawerNavigator.Screen
            name="StackNavigator"
            component={StackNavigator}
          />
        </DrawerNavigator.Navigator>
      ) : (
        <LoginStackNavigator />
      )}
    </>
  );
};
const DrawerContent = (props) => {
  return (
    <Drawer.Section style={{ justifyContent: "center", height: "100%" }}>
      <View style={styles.userContainer}>
        {props.auth.deliveryboy.image ? (
          <Image
            style={styles.image}
            source={{ uri: props.auth.deliveryboy.image }}
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>
              {props.auth.deliveryboy.name[0]}
            </Text>
          </View>
        )}
        <Rating
          ratingCount={5}
          startingValue={3}
          readonly={true}
          imageSize={20}
        />
        <Text style={styles.name}>{props.auth.deliveryboy.name}</Text>
        <Text
          style={{ color: "cornflowerblue", fontStyle: "italic", marginTop: 5 }}
        >
          Rank: {props.auth.deliveryboy.status}
        </Text>
      </View>
      <View style={styles.line} />
      <Drawer.Item
        label={props.auth.deliveryboy.available ? "Available" : "Unavailable"}
        icon={
          props.auth.deliveryboy.available
            ? "account-tie-voice"
            : "account-tie-voice-off"
        }
        onPress={() => {
          props.changeAvailability(
            props.auth.deliveryboy.id,
            !props.auth.deliveryboy.available
          );
          props.navigation.closeDrawer();
        }}
      />
      <Drawer.Item
        label="Profile"
        icon="face-profile"
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
      />
      <Drawer.Item
        label="History"
        icon="history"
        onPress={() => {
          props.navigation.navigate("History");
        }}
      />
      <Drawer.Item
        label="Logout"
        icon="logout"
        onPress={() => {
          props.navigation.navigate("Logout");
        }}
      />
    </Drawer.Section>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    marginVertical: 10,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  image: {
    marginVertical: 35,
    resizeMode: "cover",
    height: 150,
    width: 150,
    borderRadius: 70,
    marginHorizontal: "auto",
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color: "#B95291",
    fontFamily: "serif",
  },
  line: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  noImageContainer: {
    width: 150,
    height: 140,
    borderRadius: 70,
    marginBottom: 15,
    backgroundColor: "slateblue",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 30,
    margin: "auto",
    color: "white",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changeAvailability })(RootNavigator);
