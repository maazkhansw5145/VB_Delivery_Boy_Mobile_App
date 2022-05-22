import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CHANGE_AVAILABILITY,
  UPDATE_PROFILE_IMAGE,
  UPDATE_PROFILE_NAME,
  NO_MORE_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  ADD_PHONE_NUMBER
} from "./Types";
import registerForPushNotifications from "../../constants/registerForPushNotifications";
import { returnErrors } from "./errorActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "../../constants/url";
import firebase from "firebase/app";
import "firebase/storage";

// Login User
export const login = (data) => (dispatch) => {
  console.log(data);
  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("resp",data)
      if (data.msg === "Login Successfully") {
        registerForPushNotifications(data.data)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch(returnErrors(data.error));
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const changeAvailability =
  (deliveryboyID, availability) => async (dispatch) => {
    console.log(availability)
    let user = await AsyncStorage.getItem("persist:auth");
    let token = JSON.parse(user).token;
    fetch(`${url}/change/availability/${deliveryboyID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ availability }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        dispatch({
          type: CHANGE_AVAILABILITY,
          payload: res.availability,
        });
      });
  };

export const updateProfileImage = (deliveryboyID, image) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  const task = firebase.storage().ref().child(`deliveryboys/${deliveryboyID}`).put(image);
  task.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
    task.snapshot.ref.getDownloadURL().then((imageURL) => {
      fetch(`${url}/${deliveryboyID}/image/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageURL }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.msg === "Image Uploaded Successfully") {
            dispatch({
              type: UPDATE_PROFILE_IMAGE,
              payload: imageURL,
            });
          }
        })
        .catch((e) => {
          dispatch(returnErrors({ error: { error: "Network Error" } }));
        });
    });
  });
};

export const getNotifications = (userId, skip) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/notifications/${userId}/?skip=${skip}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      res.json().then((response) => {
        if (Array.isArray(response)) {
          if (Number(skip) === 0) {
            dispatch({
              type: GET_NOTIFICATIONS,
              payload: response,
            });
          } else {
            if (response.length === 0) {
              dispatch({
                type: NO_MORE_NOTIFICATIONS,
              });
            } else {
              dispatch({
                type: ADD_NOTIFICATIONS,
                payload: response,
              });
            }
          }
        } else {
          dispatch(
            returnErrors({ error: { error: "Notifications fetching fails" } })
          );
        }
      });
    })
    .catch(() => {
      dispatch(returnErrors({ error: { error: "Network error" } }));
    });
};

// Update Profile Name
export const updateProfileName = (dbID, name) => (dispatch) => {
  console.log(dbID, name)
  fetch(`${url}/${dbID}/update/name`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.msg === "Update Successfully") {
        dispatch({
          type: UPDATE_PROFILE_NAME,
          payload: name,
        });
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(
        returnErrors({
          error: err
        })
      );
    });
};

export const forgotPassword = (phoneNumber, password) => (dispatch) => {
  fetch(`${url}/${phoneNumber}/forgot/password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({password}),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg === "Password Changes Successfully") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors({
          error: err
        })
      );
    });
};

export const addPhoneNumber = (loginId, phoneNumber) => (dispatch) => {
  fetch(`${url}/add/phoneNumber/${loginId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.msg === "Phone Number Added Sucessfully") {
        dispatch({
          type: ADD_PHONE_NUMBER,
          payload: response.phoneNumber,
        });
      }
      if (response.msg === "Phone number is already attached to an account") {
        dispatch(
          returnErrors({
            error: "Phone number is already attached to an account",
          })
        );
      }
    })
    .catch((err) => {
      dispatch(returnErrors({ error: { error: "Network Error" } }));
    });
};


