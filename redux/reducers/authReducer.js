import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  CLEAR_MESSAGE,
  CHANGE_AVAILABILITY,
  UPDATE_PROFILE_IMAGE,
  UPDATE_PROFILE_NAME,
  GET_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
  NO_MORE_NOTIFICATIONS,
  ADD_PHONE_NUMBER
} from "../actions/Types";

const initialState = {
  token: null,
  isAuthenticated: null,
  deliveryboy: null,
  msg: null,
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        deliveryboy: action.payload.data,
        token: action.payload.token,
        isAuthenticated: true,
        msg: action.payload.msg,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        deliveryboy: null,
        isAuthenticated: false,
        msg: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        msg: null,
      };
      case ADD_PHONE_NUMBER:
        return {
          ...state,
          deliveryboy: { ...state.deliveryboy, phoneNumber: action.payload },
          msg: "Phone Number Added Sucessfully",
        };
    case CHANGE_AVAILABILITY:
      return {
        ...state,
        deliveryboy: {
          ...state.deliveryboy,
          available: action.payload,
        },
      };
    case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        deliveryboy: { ...state.deliveryboy, image: action.payload },
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case ADD_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload],
        msg: "",
      };
    case NO_MORE_NOTIFICATIONS:
      return {
        ...state,
        msg: "No More Notifications",
      };
    case UPDATE_PROFILE_NAME:
      return {
        ...state,
        user: { ...state.deliveryboy, name: action.payload },
        msg: "Updated Successfully",
      };
    default:
      return state;
  }
}
