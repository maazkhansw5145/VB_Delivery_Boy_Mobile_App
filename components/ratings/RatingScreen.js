import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { connect } from "react-redux";
import { AirbnbRating } from "react-native-ratings";
import url from "../../constants/url";
function RatingScreen(props) {
  const [ratings, setRatings] = useState(3);
  const [error, setError] = useState(null);

  const submitReview = async () => {
    let user = await AsyncStorage.getItem("persist:auth");
    let token = JSON.parse(user).token;
    fetch(`${url}/buyer/rate/${props.deliveryboyId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rateBy: props.deliveryboyId,
        ratings,
      }),
    }).then((res) => {
      props.navigation.navigate("OrderList");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate buyer, how was his/her behaviour?</Text>
      <View style={{ marginVertical: 30 }}>
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "Normal", "Good", "Excellent"]}
          defaultRating={3}
          onFinishRating={(rating) => setRatings(rating)}
          size={25}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.submitBtn,
          ratingsObject.length === 0 ? styles.inactve : styles.active,
        ]}
        onPress={() => {
          submitReview();
          Alert.alert(
            "Thanks For Review",
            "It would really help us to improve",
            [
              {
                text: "OK",
                onPress: () => props.navigation.navigate("OrderList"),
              },
            ]
          );
        }}
      >
        <Text style={{ color: "white" }}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  submitBtn: {
    width: 160,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginVertical: 25,
    color: "white",
  },
  active: {
    backgroundColor: "#0064C3",
  },
  inactve: {
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontStyle: "italic",
  },
});

const mapStateToProps = (state) => ({
  deliveryboyId: state.auth.deliveryboy.id,
});

export default connect(mapStateToProps)(RatingScreen);
