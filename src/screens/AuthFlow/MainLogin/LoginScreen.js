import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import VerifyOTP from "../VerifyOTP/VerifyOTP";
import ChangePassword from "../ChangePassword/ChangePassword";
import ConfirmCode from "../ConfirmCode/ConfirmCode";

const LoginScreen = (props) => {
  const [containerScreen, setContainerScreen] = useState("");

  const [state, setState] = useState({
    email: "",
    emailFocus: false,
    password: "",
    passwordFocus: false,
  });

  return (
    <View style={styles.container}>
      {containerScreen === "ForgotPassword" ? (
        <ForgotPassword setContainerScreen={setContainerScreen} />
      ) : containerScreen === "VerifyOTP" ? (
        <VerifyOTP setContainerScreen={setContainerScreen} />
      ) : containerScreen === "ChangePassword" ? (
        <ChangePassword setContainerScreen={setContainerScreen} />
      ) : containerScreen === "ConfirmCode" ? (
        <ConfirmCode
          setContainerScreen={setContainerScreen}
          state={state}
          setState={setState}
          props={props}
        />
      ) : (
        <Login
          setContainerScreen={setContainerScreen}
          state={state}
          setState={setState}
          props={props}
        />
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
