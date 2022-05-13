import React, { useEffect, useState } from "react";
import { View, Image, Text, FlatList } from "react-native";
import Loading from "./Loading";
import { connect } from "react-redux";
import { getOrder } from "../redux/actions/deliveryboyActions";
import screenWidth from "../constants/screenWidth";
import List from "./List";
import { Ionicons } from "@expo/vector-icons";
import RNEventSource from "react-native-event-source";
function OrderList(props) {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [listening, setListening] = useState(false);
  useEffect(() => {
    var source;
    source = new RNEventSource("http://192.168.43.15:6060/stream");
    if (!listening) {
      source.addEventListener(
        "open",
        function (e) {
          console.log("CONNECTED TO SERVER");
          setListening(true);
        },
        false
      );
    }

    source.addEventListener(
      `order-assignment-${props.auth.deliveryboy.id}`,
      function (e) {
        console.log("get order")
        props.getOrder(props.auth.deliveryboy.id);
      },
      false
    );

    source.addEventListener(
      "error",
      function (error) {
        console.log("on error");
        console.log(error);
      },
      false
    );
    return () => source && source.close();
  }, []);

  useEffect(() => {
    props.getOrder(props.auth.deliveryboy.id);
    if (props.order !== null) {
      setOrder(props.order);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setOrder(props.order);
    setLoading(false);
  }, [props.order]);

  if (loading) {
    return <Loading />;
  }

  if (!props.auth.deliveryboy.available) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          <View
            style={{ display: "flex", alignItems: "center", marginBottom: 50 }}
          >
            <Ionicons name="cloud-offline" size={80} color="cornflowerblue" />
          </View>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 15,
              fontSize: 17,
              marginHorizontal: 8,
              fontStyle: "italic",
              color: "cornflowerblue",
            }}
          >
            You are not availible for receieving orders.
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              marginHorizontal: 10,
              fontStyle: "italic",
              color: "cornflowerblue",
            }}
          >
            Click on the top left button and then click on unavailable, to
            available yourself for orders.
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "black",
          paddingLeft: 30,
          margin: 10,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/delivery.png")}
          style={{ margin: 10, height: 50, width: 50 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            marginLeft: 50,
          }}
        >
          New Order
        </Text>
      </View>
      {order === null ? (
        <View>
          <View
            style={{
              height: "100%",
              alignItems: "center",
              marginTop: 160,
            }}
          >
            <Ionicons
              name="hourglass-outline"
              size={60}
              color="cornflowerblue"
            />
            <Text
              style={{
                fontSize: 18,
                color: "cornflowerblue",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              No Order Yet. Chill out!
            </Text>
          </View>
        </View>
      ) : (
        // <FlatList
        //   data={order.order}
        //   numColumns={screenWidth()}
        //   renderItem={(item) => <List item={item} navigation={props.navigation} />}
        //   keyExtractor={(item) => item.item._id}
        // />
        <View style={{ flexDirection: "row" }}>
          <List order={order} navigation={props.navigation} />
        </View>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  order: state.server.order,
  auth: state.auth,
  server: state.server,
});

export default connect(mapStateToProps, {
  getOrder,
})(OrderList);
