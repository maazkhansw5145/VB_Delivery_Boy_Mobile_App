import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Notification from "./Notification";
import { connect } from "react-redux";
import Loading from "../Loading";
import NoNotification from "./NoNotification";
import {
  getNotifications,
} from "../../redux/actions/authActions";
import * as Notifications from "expo-notifications";

function NotificationsScreen(props) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (notifications.length === 0) {
      props.getNotifications(props.auth.deliveryboy.id, 0);
    }
    if (props.auth.newNotification) {
      props.getNotifications(props.auth.deliveryboy.id, 0);
      notificationsSeen();
    }
    if (props.auth.notifications.length !== 0) {
      setNotifications(props.auth.notifications);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loadingMore && props.auth.msg === "No More Notifications") {
      setLoading(false);
      setAllLoaded(true);
      setLoadingMore(false);
    }
  }, [props.auth.msg, loadingMore]);

  useEffect(() => {
    setNotifications(props.auth.notifications);
    setLoading(false);
    setLoadingMore(false);
  }, [props.auth.notifications]);

  const notificationsSeen = async () => {
    await Notifications.setBadgeCountAsync(0);
    props.newNotification(false);
  };

  const loadMoreItems = (lengthOfItems) => {
    setLoadingMore(true);
    props.getNotifications(props.auth.deliveryboy.id, lengthOfItems);
  };

  const reFetch = () => {
    props.getNotifications(props.auth.deliveryboy.id, 0);
    setAllLoaded(false);
    setRefreshing(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.line} />
      {notifications.length === 0 ? (
        <NoNotification navigation={props.navigation} />
      ) : (
        <FlatList
          data={notifications}
          onRefresh={() => {
            setRefreshing(true);
            reFetch();
          }}
          refreshing={refreshing}
          renderItem={(item) => (
            <Notification notifications={item.item.notification} />
          )}
          keyExtractor={(item) => item.notification._id}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            !allLoaded && !loadingMore && loadMoreItems(notifications.length);
          }}
          ListFooterComponent={() =>
            loadingMore ? <Loading /> : <View style={styles.dot} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    fontSize: 24,
    marginTop: 10,
    fontFamily: "serif",
    color: "#785895",
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    margin: 10,
  },
  dot: {
    marginVertical: 15,
    alignSelf: "center",
    backgroundColor: "gray",
    borderRadius: 50,
    width: 10,
    height: 10,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getNotifications })(
  NotificationsScreen
);
