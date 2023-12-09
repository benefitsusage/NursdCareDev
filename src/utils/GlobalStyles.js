import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
// const SCREEN_WIDTH = width < height ? width : height;

const nurse = "#7F5DF0";
const admin = "green";
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "white",
  },
  headerStyle: {
    backgroundColor: "#FFF",
    borderBottomWidth: 0,
    elevation: 5,
    shadowColor: nurse,
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  headerTitleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightView: {
    flexDirection: "row",
    alignItems: "center",
  },
  goPremiumText: {
    fontWeight: "bold",
    fontSize: 10,
  },
  headerLeftView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  marketHeaderTet: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
  },

  shadow: {
    elevation: 5,
    shadowColor: nurse,
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});
