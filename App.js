import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import RootDrawerNavigator from "./navigation/RootDrawerNavigator";

function App() {  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootDrawerNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;