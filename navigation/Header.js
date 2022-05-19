import React from "react";
import { Appbar } from "react-native-paper";
import {View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OfflineNotice from "../components/OfflineNotice";
import { connect } from "react-redux";

function Header(props) {
  const { index, routes } = props.navigation.dangerouslyGetState();
  const screenName = routes[index].name;
  return (
    <View>
      <SafeAreaView>
        {screenName !== "Logout" &&
          screenName !== "ForgotPassword" &&
          screenName !== "Receipt" &&
          screenName !== "Virtual Bazaar" &&
          screenName !== "MapView" && (
            <Appbar
              style={{
                backgroundColor: props.auth.deliveryboy.available
                  ? "dodgerblue"
                  : "grey",
              }}
              dark={true}
            >
              <Appbar.Action
                icon="reorder-horizontal"
                onPress={() => props.navigation.openDrawer()}
              />
              <Appbar.Content title="Virtual Bazaar" />
              <Appbar.Action
                icon="view-list"
                color={screenName === "OrderList" ? "#24091b" : "white"}
                onPress={() => props.navigation.navigate("OrderList")}
              />
              <Appbar.Action
                // icon={props.auth.newNotification ? "bell-ring" : "bell"}
                icon="bell"
                color={
                  screenName === "NotificationsScreen" ? "orange" : "white"
                }
                onPress={() => props.navigation.navigate("NotificationsScreen")}
              />
            </Appbar>
          )}
        <OfflineNotice />
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
