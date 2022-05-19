import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import Loading from "../Loading";
import List from "../List";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import url from '../../constants/url';

export function HistoryScreen(props) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  async function fetchHistory() {
    let user = await AsyncStorage.getItem("persist:auth");
    let token = JSON.parse(user).token;
    fetch(`${url}/history/${props.deliveryboyId}/?skip=${history.length}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((history) => {
        if (history.length === 0) {
          setLoading(false);
          setAllLoaded(true);
          setLoadingMore(false);
        } else {
          setHistory(history);
          setLoading(false);
        }
      })
      .catch((e) => {
        setError("Failed to fetch");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return <Loading />;
  }
  // if (error) {
  //   return (
  //     <View>
  //       <Text>
  //         <NetworkError />
  //       </Text>
  //     </View>
  //   );
  // }
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>History</Text>
      <View style={styles.line} />
      {history.length === 0 ? (
        <TouchableOpacity
          style={styles.noHistoryContainer}
          onPress={() => props.navigation.navigate("OrderList")}
        >
          <>
            <LottieView
              source={require("../../assets/animations/nothing-found.json")}
              autoPlay
              loop
              style={{ height: 200, width: 200 }}
            />
            <Text style={styles.noHistoryText}>
              You Have Not Completed Any Order Yet
            </Text>
            <Text style={styles.noHistoryText}>
              Wait for your seller to assign you an order 
            </Text>
          </>
        </TouchableOpacity>
      ) : (
        <View style={{ marginHorizontal: 15 }}>
          <FlatList
            data={history}
            renderItem={(item) => (
              <List data={item.item} parent={"historyscreen"} {...props} />
            )}
            keyExtractor={(item) => item._id}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              !allLoaded && fetchHistory();
            }}
            ListFooterComponent={() =>
              loadingMore ? <Loading /> : <View style={styles.dot} />
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: "serif",
    marginBottom: 15,
    color: "#785895",
    marginLeft: 30,
    marginTop: 10,
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  noHistoryText: {
    fontSize: 16,
    marginTop: 10,
    color: "gray",
    fontFamily: "serif",
    fontStyle: "italic",
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
  deliveryboyId: state.auth.deliveryboy.id,
});

export default connect(mapStateToProps)(HistoryScreen);
