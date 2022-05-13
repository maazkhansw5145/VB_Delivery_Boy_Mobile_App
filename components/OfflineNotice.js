import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const OfflineNotice = () => {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const unSub = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });
    return unSub;
  }, []);

  return (
    <>
      {!connected && (
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#d80e0e",
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 14, color: "white" }}>
            No Internet Connection
          </Text>
        </View>
      )}
    </>
  );
};

export default OfflineNotice;
