import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { deliveringOrder } from "../redux/actions/deliveryboyActions";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const List = (props) => {
  const order = props.order;
  console.log(order);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image source={{ uri: order.buyer.image }} style={styles.image} />
          </View>
          <View>
            <View style={styles.itemsContainer}>
              {/* <Text>Maaz Khan</Text> */}
              <Text>{order.buyer.name}</Text>
            </View>
            {/* <Text>12.42343234234, 41.123123132</Text>/ */}
            <Text style={styles.location}>{order.address}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.deliveringOrder(order._id);
            props.navigation.navigate("MapView", {
              order: order,
              deliveryboyId: props.auth.deliveryboy.id,
            });
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 50,
            borderRadius: 15,
            backgroundColor: "limegreen",
          }}
        >
          <Ionicons name="checkmark-sharp" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "lightgray",
    padding: 25,
    margin: 15,
  },
  itemsContainer: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 20,
  },
  location: {
    width: "85%",
    fontStyle: "italic",
    color: "cornflowerblue",
    marginVertical: 10,
  },
  highlightedText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  order: state.server.order,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deliveringOrder,
})(List);
