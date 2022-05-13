import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  LogBox,
} from "react-native";
import { connect } from "react-redux";
import {
  updateProfileName,
  updateProfileImage,
} from "../../redux/actions/authActions";
import { clearMessage } from "../../redux/actions/deliveryboyActions";
import * as ImagePicker from "expo-image-picker";

// Ignoring timer warning
LogBox.ignoreLogs(["Setting a timer"]);

const ProfileScreen = (props) => {
  const { user } = props;
  const [image, setImage] = useState(user.image);
  const [newName, setNewName] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const pickImage = async () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.65,
            base64: true,
          });
          if (!result.cancelled) {
            setNewImage(true);
            setImage(result.uri);
          }
        }
      }
    })();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        {image ? (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>{user.name}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.changeImageButton}
          onPress={async () => {
            if (!newImage) {
              pickImage();
            } else {
              const img = await fetch(image);
              const IMAGE = await img.blob();
              props.updateProfileImage(props.user.id, IMAGE);
              props.navigation.navigate("OrderList");
            }
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {newImage ? "Done" : image ? "Change Profile Picture" : "Add Image"}
          </Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Name</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {newName === null ? (
              <Text style={styles.info}>{user.name}</Text>
            ) : (
              <TextInput
                style={styles.input}
                onChangeText={setNewName}
                value={newName}
                placeholder="Enter New Name Here"
                placeholderTextColor="white"
              />
            )}
            {newName && newName.length > 3 ? (
              <Text
                style={{ fontStyle: "italic", color: "blue" }}
                onPress={() => {
                  props.updateProfileName(props.user.id, newName);
                  props.navigation.goBack();
                }}
              >
                Done
              </Text>
            ) : newName !== null? 
            (
              <Text
                style={{ fontStyle: "italic", color: "blue" }}
                onPress={() => setNewName(null)}
              >
                Cancel
              </Text>
            ) :
            (
              <Text
                style={{ fontStyle: "italic", color: "blue" }}
                onPress={() => setNewName("")}
              >
                Edit
              </Text>
            )}
          </View>
        </View>
        {user.phoneNumber ? (
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Contact Number</Text>
            <Text style={styles.info}>{user.phoneNumber}</Text>
          </View>
        ) : (
          <View style={styles.inputWrapper}>
            <Text
              style={{ color: "blue" }}
              onPress={() =>
                props.navigation.navigate("PhoneAuthentication", {
                  for: "addPhoneNumber",
                  loginId: user.loginId,
                })
              }
            >
              Add Phone Number
            </Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Login Id</Text>
          <Text style={styles.info}>{user.loginId}</Text>
        </View>
        {/* {user.contact && (
          <TouchableOpacity
            style={styles.changePassword}
            onPress={() =>
              props.navigation.navigate("ForgotPassword", {
                phoneNumber: user.contact,
              })
            }
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Change Password
            </Text>
          </TouchableOpacity>
        )} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
    marginVertical: 10,
  },
  input: {
    borderRadius: 2,
    borderBottomWidth: 1,
    color: "cornflowerblue",
  },
  inputWrapper: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  imageContainer: {
    width: "100%",
  },
  changePassword: {
    backgroundColor: "cornflowerblue",
    width: "100%",
    bottom: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 10,
  },
  update: {
    width: 202,
    marginHorizontal: "auto",
    alignItems: "center",
    padding: 15,
    backgroundColor: "deepskyblue",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderRadius: 15,
    marginTop: 15,
  },
  noImageContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: 250,
    color: "black",
    backgroundColor: "#B95291",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 30,
    color:'white',
    top:'40%'
  },
  cameraIcon: {
    marginTop: "auto",
    marginLeft: "auto",
  },
  changeImageButton: {
    padding: 10,
    backgroundColor: "cornflowerblue",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "black",
    fontSize: 16,
  },
  info: {
    color: "cornflowerblue",
    fontSize: 18,
    fontFamily:'serif'
  },
  line: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginVertical: 15,
    width: "90%",
    alignSelf: "center",
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.deliveryboy,
  msg: state.auth.msg,
});

export default connect(mapStateToProps, {
  updateProfileName,
  clearMessage,
  updateProfileImage,
})(ProfileScreen);
