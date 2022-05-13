import { Dimensions } from "react-native";

const screenWidth = () => {
  const deviceScreenWidth = Dimensions.get("window").width;
  if (deviceScreenWidth < 359) {
    return 1;
  }
  if (deviceScreenWidth < 540) {
    return 2;
  }
  if (deviceScreenWidth < 726) {
    return 3;
  }
  if (deviceScreenWidth < 910) {
    return 4;
  }
  if (deviceScreenWidth < 1096) {
    return 5;
  }
  if (deviceScreenWidth < 1190) {
    return 6;
  } else {
    return 7;
  }
};

export default screenWidth;
