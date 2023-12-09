import { Auth, DataStore } from "aws-amplify";
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
import { FacilityTable, UserTable } from "../../../models";
import OTPInput from "../VerifyOTP/OTPInput";

function ConfirmCodeFacility({
  setContainerScreen,
  facilityState,
  setFacilityState,
}) {
  const { width, height } = Dimensions.get("window");
  const SCREEN_WIDTH = width < height ? width : height;
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Confirm SignUP
  const confirmSignUp = async (email, authCode) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.confirmSignUp(email, authCode);
      if (response === "SUCCESS") {
        const userData = await DataStore.query(UserTable, (item) =>
          item.email.eq(email)
        );
        if (userData[0]?.roll === "Facility") {
          const facilityData = await DataStore.query(FacilityTable, (item) =>
            item.emailId.eq(userData[0]?.email)
          );
          await DataStore.save(
            FacilityTable.copyOf(facilityData[0], (updateFacilityData) => {
              updateFacilityData.emailVerified = true;
            })
          );
        }
        await Auth.signIn(facilityState.emailId, facilityState.password);
        setFacilityState({
          name: "",
          emailId: "",
          password: "",
        });
      }
    } catch (error) {
      console.log("error confirm :", error);
    }
    setLoading(false);
  };

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
          onPress={() =>
            confirmSignUp(facilityState?.emailId, otpCode.toString())
          }
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
        style={{ textAlign: "center", color: "#006002", marginTop: 10 }}
      >
        Re-send code
      </Text>
    </View>
  );
}

export default ConfirmCodeFacility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
