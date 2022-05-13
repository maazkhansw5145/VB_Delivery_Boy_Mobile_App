import React from "react";
import { connect } from "react-redux";
import ConfirmationScreen from "../ConfirmationScreen";
import { logout } from "../../redux/actions/authActions";

function LogOutScreen(props) {
  const onYes = () => {
    props.logout();
    props.navigation.navigate("OrderList");
  };
  return (
    <ConfirmationScreen
      title="Are You Sure To Logout ?"
      onYes={onYes}
    />
  );
}

export default connect(null, { logout })(LogOutScreen);
