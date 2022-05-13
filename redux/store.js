import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import AsyncStorage from "@react-native-async-storage/async-storage";

import rootReducer from "./reducers/index";

const middleware = [thunk];

const serverPersistConfig = {
  key: "server",
  storage: AsyncStorage,
  blacklist: ["auth", "error"],
};

const persistedReducer = persistReducer(serverPersistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
