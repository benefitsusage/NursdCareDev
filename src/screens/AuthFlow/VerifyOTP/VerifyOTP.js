import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import AuthButton from "../../../customComponents/Button/AuthButton";
import TitleText from "../../../customComponents/Text/TitleText";
import OTPInput from "./OTPInput";

function VerifyOTP({ setContainerScreen }) {
  const { width, height } = Dimensions.get("window");

  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => setContainerScreen("") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TitleText text={"Verify the OTP"} />
        <Text
          style={{
            fontSize: 13,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 20,
            width: width / 1.3,
          }}
        >
          Please enter 6 digit verification code we just sent you on your email
        </Text>
        <OTPInput otpCode={otpCode} setOtpCode={setOtpCode} />
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <AuthButton
          name={"Verify"}
          onPress={() => setContainerScreen("ChangePassword")}
          color={"#006002"}
        />
      </View>
      <Text
        style={{
          fontSize: 13,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Didn't receive any code?
      </Text>
      <Text
        onPress={() => console.log("first")}
        style={{ textAlign: "center", color: "#2775BD", marginTop: 10 }}
      >
        Re-send code
      </Text>
    </View>
  );
}

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
