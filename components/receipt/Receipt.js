import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Loading from "../Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Receipt(props) {
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    setReceipt(props.route.params.order);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  const { sendAt, order, seller,buyer } = receipt;
  console.log(receipt)
  let date = new Date(sendAt).toLocaleDateString();
  let time = new Date(sendAt).toLocaleTimeString();
  var totalQuantity = 0;
  var subTotalPrice = 0;
  return (
    <View style={{ backgroundColor: "lightgray", flex: 1 }}>
      <View style={styles.container}>
        <View>
          
          <Text style={styles.title}>Receipt</Text>
        </View>

        <View style={styles.line} />
        <View>
          <View>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.bold]}>Ordered By</Text>
              <Text style={[styles.cell, styles.italic]}>{buyer.name}</Text>
              <View style={styles.cell}></View>
            </View>
          </View>
          <View>
          <View style={{flexDirection:'row',marginBottom:15}}>
              <Text style={[styles.cell, styles.bold]}>Contact Number</Text>
              <Text style={[styles.italic,{alignSelf:'center'}]}>{buyer.contact}</Text>
            </View>
          </View>

          <View style={{flexDirection:'row',marginBottom:15}}>
            <Text style={[styles.cell, styles.bold, { alignSelf: "center" }]}>
              Time
            </Text>
            <Text
              style={[styles.italic, { color: "cornflowerblue" }]}
            >
              {date} --- {time}
            </Text>
            <Text style={styles.cell}></Text>
          </View>
        </View>

        <View>
          <View style={[styles.tableTitle, styles.row]}>
            <Text style={[styles.cell, styles.bold]}>Items</Text>
            <Text style={[styles.cell, styles.bold]}>Quantity</Text>
            <Text style={[styles.cell, styles.bold]}>Price</Text>
          </View>
          {order.map((order, i) => {
            {
              totalQuantity = totalQuantity + order.quantity;
            }
            {
              subTotalPrice = subTotalPrice + order.item.price;
            }
            return (
              <View style={[styles.orderItems, styles.row]} key={i}>
                <Text style={[styles.cell, styles.italic]}>
                  {order.item.name}
                </Text>
                <Text style={[styles.cell, styles.italic]}>
                  {order.quantity}
                </Text>
                <Text style={[styles.cell, styles.italic]}>
                  {order.item.price}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={[styles.subTotal, styles.row]}>
          <Text style={[styles.cell, styles.bold]}>SubTotal</Text>
          <Text style={[styles.cell, styles.italic]}>{totalQuantity}</Text>
          <Text style={[styles.cell, styles.italic]}>{subTotalPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Delivery</Text>
          <Text style={styles.cell} />
          <Text style={[styles.cell, styles.bold]}>Fee</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}></View>
          <Text style={styles.cell} />
          <Text style={[styles.cell, styles.italic]}>150</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold, { fontFamily: "serif" }]}>
            Total
          </Text>
          <View style={styles.cell}></View>
          <Text
            style={[
              styles.cell,
              { color: "orangered", fontWeight: "bold", fontSize: 16 },
            ]}
          >
            {subTotalPrice + 150}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            padding: 12,
            elevation: 2,
            backgroundColor: "orangered",
          }}
          onPress={() => {
            props.navigation.navigate("OrderList");
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize:18,
              textAlign:'center'
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 10,
  },
  cell: {
    width: 100,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "serif",
    color: "#785895",
    marginLeft: 10,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 16,
  },
  italic: { fontStyle: "italic", fontSize: 16 },
  tableTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  orderItems: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Receipt;
