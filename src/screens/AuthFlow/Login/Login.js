import { Auth, DataStore } from "aws-amplify";
import React, { useState } from "react";
import { useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import AuthButton from "../../../customComponents/Button/AuthButton";
import CustomInput from "../../../customComponents/Input/CustomInput";
import TitleText from "../../../customComponents/Text/TitleText";
import { Organisation } from "../../../models";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const Login = ({ setContainerScreen, state, setState, props }) => {
  // const [state, setState] = useState({
  //   email: "",
  //   emailFocus: false,
  //   password: "",
  //   passwordFocus: false,
  // });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { width, height } = Dimensions.get("window");
  const SCREEN_WIDTH = width < height ? width : height;

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // const [expoPushToken, setExpoPushToken] = useState("");

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );
  // }, []);

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       Alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //   } else {
  //     Alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   return token;
  // }

  // Login
  const signIn = async (email, password) => {
    console.log("Login page : loading...");
    if (state.email === "" && state.password === "") {
      Alert.alert("Enter the fields");
    } else {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        const response = await Auth.signIn(email, password);
        setError("");
        console.log("Login page : ", response?.attributes?.email);

        if (response) {
          const organisationData = await DataStore.query(Organisation, (item) =>
            item.emailId.eq(response?.attributes?.email)
          );
          console.log("App", organisationData[0]);
          // await DataStore.save(
          //   Organisation.copyOf(organisationData[0], (updatedItem) => {
          //     updatedItem.mobileId = expoPushToken;
          //   })
          // );
        }
      } catch (error) {
        setError(
          error.message === "User is not confirmed."
            ? "Verification is pending,"
            : "Incorrect Email or Password"
        );
        console.log("error signing in", error?.message);
      }
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#006002", fontWeight: "bold", fontSize: 20 }}>
          Welcome to NURSD
        </Text>
        <TitleText text={"Sign In"} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <CustomInput
            value={state.email}
            placeholder="Email"
            keyboardType={"email-address"}
            onChangeText={(text) => setState({ ...state, email: text })}
            clearValue={() => setState({ ...state, email: "" })}
            viewStyle={{
              height: 40,
              backgroundColor: "#f2f2f2",
              borderRadius: 10,
              elevation: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: "#e6e6e6",
              paddingRight: 10,
              justifyContent: "space-between",
              marginTop: 0,
            }}
            textInputStyle={{
              height: 40,
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 5,
              fontSize: 12,
            }}
            iconStyle={{
              height: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <CustomInput
            value={state.password}
            placeholder="Password"
            keyboardType={"default"}
            onChangeText={(text) => setState({ ...state, password: text })}
            clearValue={() => setState({ ...state, password: "" })}
            viewStyle={{
              height: 40,
              backgroundColor: "#f2f2f2",
              borderRadius: 10,
              elevation: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: "#e6e6e6",
              paddingRight: 10,
              justifyContent: "space-between",
              marginTop: -5,
            }}
            textInputStyle={{
              height: 40,
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 5,
              fontSize: 12,
            }}
            iconStyle={{
              height: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          />
        </View>
      </View>
      {/* // <Text
      //   style={{
      //     fontSize: 12,
      //     textAlign: "right",
      //     width: width / 1.05,
      //     marginTop: 10,
      //   }}
      //   onPress={() => setContainerScreen("ForgotPassword")}
      // >
      //   Forgot Password ?
      // </Text> */}
      {error !== "" && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            {error}
          </Text>
          {error === "User is not confirmed." && (
            <TouchableOpacity onPress={() => setContainerScreen("ConfirmCode")}>
              <Text style={{ color: "#000" }}> Click here to verify.</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <AuthButton
          name={loading ? "Loading..." : "Login"}
          onPress={() => signIn(state.email, state.password)}
          color={"#006002"}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
