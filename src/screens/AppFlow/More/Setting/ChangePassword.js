import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import AuthButton from "../../../../customComponents/Button/AuthButton";
import CustomInput from "../../../../customComponents/Input/CustomInput";
import TitleText from "../../../../customComponents/Text/TitleText";

const ChangePassword = () => {
  const [state, setState] = useState({
    oldPassword: "",
    oldPasswordFocus: false,
    password: "",
    passwordFocus: false,
    conPassword: "",
    conPasswordFocus: false,
  });
  const { width, height } = Dimensions.get("window");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ alignItems: "center" }}>
        <TitleText text={"Change Password"} />
        <Text
          style={{
            fontSize: 13,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 20,
            width: width / 1.3,
          }}
        >
          At least 6 character, with uppercase and lowercase letter
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
            value={state.oldPassword}
            label={"Old Password"}
            placeholder="Enter Old Password"
            keyboardType={"default"}
            onChangeText={(text) => setState({ ...state, oldPassword: text })}
            clearValue={() => setState({ ...state, oldPassword: "" })}
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
            label="New Password"
            placeholder="Enter New Password"
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
            value={state.conPassword}
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            keyboardType={"default"}
            onChangeText={(text) => setState({ ...state, conPassword: text })}
            clearValue={() => setState({ ...state, conPassword: "" })}
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
        <AuthButton name={"Submit"} color={"#006002"} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
