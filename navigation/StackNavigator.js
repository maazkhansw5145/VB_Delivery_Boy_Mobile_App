import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./Header";

import OrderList from "../components/OrderList";
import MapView from "../components/location/MapView";
import NotificationsScreen from "../components/notifications/NotificationsScreen";
import History from "../components/drawer/History";
import Profile from "../components/drawer/Profile";
import RatingScreen from "../components/ratings/RatingScreen";
import Receipt from "../components/receipt/Receipt";
import Logout from "../components/authentication/Logout";
import PhoneAuthentication from "../components/authentication/PhoneAuthentication";

const StackNavigator = createStackNavigator();

const stackNavigator = () => {
  return (
    <StackNavigator.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation }) => (
          <Header scene={scene} navigation={navigation} />
        ),
      }}
    >
      <StackNavigator.Screen name="OrderList" component={OrderList} />
      <StackNavigator.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />

      <StackNavigator.Screen name="Profile" component={Profile} />
      <StackNavigator.Screen name="History" component={History} />
      <StackNavigator.Screen name="Rate" component={RatingScreen} />
      <StackNavigator.Screen name="Receipt" component={Receipt} />
      <StackNavigator.Screen name="MapView" component={MapView} />
      <StackNavigator.Screen name="Logout" component={Logout} />
      <StackNavigator.Screen
        name="PhoneAuthentication"
        component={PhoneAuthentication}
      />
    </StackNavigator.Navigator>
  );
};

export default stackNavigator;
