import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import AuthButton from "../../../customComponents/Button/AuthButton";
import CustomInput from "../../../customComponents/Input/CustomInput";
import TitleText from "../../../customComponents/Text/TitleText";
import ChangePassword from "../ChangePassword/ChangePassword";

const ForgotPassword = ({ setContainerScreen }) => {
  const [state, setState] = useState({
    email: "",
    emailFocus: false,
  });
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
        <TitleText text={"Forgot Password"} />
        <Text
          style={{
            fontSize: 13,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 20,
            width: width / 1.3,
          }}
        >
          Please enter your register email address , we will send OTP.
        </Text>
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
      </View>

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <AuthButton
          name={"Send OPT"}
          onPress={() => setContainerScreen("VerifyOTP")}
          color={"#006002"}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
