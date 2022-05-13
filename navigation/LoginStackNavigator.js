import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginForm from "../components/authentication/Login";
import PhoneAuthentication from "../components/authentication/PhoneAuthentication";
import ForgotPassword from "../components/authentication/ForgotPassword";

const StackNavigator = createStackNavigator();

const LoginStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Virtual Bazaar" component={LoginForm} />
      <StackNavigator.Screen
        name="PhoneAuthentication"
        component={PhoneAuthentication}
      />
      <StackNavigator.Screen name="ForgotPassword" component={ForgotPassword} />
    </StackNavigator.Navigator>
  );
};

export default LoginStackNavigator;
