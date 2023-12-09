import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import CustomInput from "../../../customComponents/Input/CustomInput";
import AuthButton from "../../../customComponents/Button/AuthButton";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { MaterialIcons } from "@expo/vector-icons";

const FormScreen = ({
  setContainerScreen,
  facilityState,
  setFacilityState,
  props,
}) => {
  const { width, height } = Dimensions.get("window");
  const SCREEN_WIDTH = width < height ? width : height;

  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");

  //Get and Set Notification Id
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  //Register
  const signUp = async (username, password) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signUp({ username, password });

      Alert.alert(
        "Success",
        "Register successfully and verify your email(sometimes the email goes under spam)"
      );
      setContainerScreen("ConfirmCode");
    } catch (error) {
      console.log("error signing up", error);
    }
    setLoading(false);
  };

  React.useLayoutEffect(() => {
    props?.navigation.setOptions({
      title: "Create Profile", //Set Header Title
      headerStyle: {
        backgroundColor: "#fff", //Set Header color
      },
      headerTintColor: "#000", //Set Header text color
      headerTitleStyle: {
        fontWeight: "bold", //Set Header text style
      },
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            activeOpacity={0.5}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={28}
              color="#808080"
            />
            <Image
              source={require("../../../../assets/login/NURSD-Flow.png")}
              style={{
                marginLeft: 0,
                width: 82,
                marginBottom: 0,
                height: 32,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => <View></View>,
    });
  }, [props?.navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <CustomInput
              label={"Email ID"}
              required={true}
              value={facilityState.emailId}
              placeholder="Email"
              keyboardType={"email-address"}
              onChangeText={(text) =>
                setFacilityState({ ...facilityState, emailId: text })
              }
              clearValue={() =>
                setFacilityState({ ...facilityState, emailId: "" })
              }
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
              labelStyle={{
                marginTop: 10,
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <CustomInput
              label={"Password"}
              required={true}
              value={facilityState.password}
              placeholder="Password"
              keyboardType={"default"}
              onChangeText={(text) =>
                setFacilityState({ ...facilityState, password: text })
              }
              clearValue={() =>
                setFacilityState({ ...facilityState, password: "" })
              }
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
              labelStyle={{
                marginTop: 10,
              }}
            />
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 80,
          }}
        >
          <AuthButton
            name={"Submit"}
            onPress={() =>
              loading
                ? null
                : facilityState.emailId === "" || facilityState.password === ""
                ? Alert.alert("Fill all required fields first")
                : facilityState?.password?.length < 8
                ? Alert.alert("At least enter 8 character")
                : signUp(facilityState.emailId, facilityState.password)
            }
            color={"#006002"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
