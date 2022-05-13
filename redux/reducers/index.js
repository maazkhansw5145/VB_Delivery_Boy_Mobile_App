import { combineReducers } from "redux";
import serverReducer from "./serverReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  blacklist: ["error", "server"],
};
export default combineReducers({
  server: serverReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  error: errorReducer,
});
