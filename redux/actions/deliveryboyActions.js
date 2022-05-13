import {
  GET_ORDER,
  CLEAR_MESSAGE,
  ORDER_COMPLETED,
  ORDER_DELIVERING,
} from "./Types";

import url from "../../constants/url";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getOrder = (deliveryboyID) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/${deliveryboyID}/get/order`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((order) => {
      dispatch({
        type: GET_ORDER,
        payload: order,
      });
    });
};

export const deliveringOrder = (orderID) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/${orderID}/delivering/order`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: ORDER_DELIVERING,
        payload: orderID,
      });
    }
  });
};

export const orderCompleted = (orderID, deliveryboyID) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/${orderID}/${deliveryboyID}/order/done`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: ORDER_COMPLETED,
      });
    }
  });
};

export const clearMessage = () => async (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE,
  });
};
