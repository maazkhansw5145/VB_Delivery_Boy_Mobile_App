import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Notification = (props) => {
  const notification = props.notifications;
  const date = new Date(notification.date).toLocaleDateString();
  const time = new Date(notification.date).toLocaleTimeString();
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon(notification.title)}</View>
      <View>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.description}>{notification.description}</Text>
        <Text style={{ fontSize: 10, fontStyle: "italic", color: "#785895" }}>
          {date} - {time}
        </Text>
      </View>
    </View>
  );
};

const icon = (title) => {
  switch (title) {
    case "Order Accepted":
      return (
        <MaterialCommunityIcons
          name="text-box-check-outline"
          size={40}
          color="yellowgreen"
        />
      );
    case "Order Rejected":
      return (
        <MaterialCommunityIcons
          name="text-box-remove-outline"
          size={40}
          color="firebrick"
        />
      );
    case "Your order is on the way!":
      return (
        <MaterialCommunityIcons
          name="truck-delivery"
          size={40}
          color="cornflowerblue"
        />
      );
    case "Order Arrived!!!":
      return (
        <MaterialCommunityIcons
          name="truck-check"
          size={40}
          color="orangered"
        />
      );
    case "Shop Registered Successfully":
      return <MaterialIcons name="fact-check" size={40} color="orangered" />;
    case "Shop Registration Rejected":
      return <MaterialIcons name="cancel-presentation" size={40} color="red" />;
    default:
      break;
  }
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginHorizontal: 15,
    backgroundColor:'bisque',
    borderRadius:20
  },
  title: {
    fontWeight: "bold",
    color: "black",
  },
  description: {
    marginRight: 55,
    marginVertical: 5,
  },
  icon: { marginRight: 20, justifyContent: "center" },
});

export default Notification;
