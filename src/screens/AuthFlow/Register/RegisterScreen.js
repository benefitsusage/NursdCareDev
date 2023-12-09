import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import AuthButton from "../../../customComponents/Button/AuthButton";

const RegisterScreen = (props) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => props?.navigation.navigate("LoginScreen"),
        },
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
        <Image source={require("../../../../assets/login/NURSD-Nurse.png")} />
        <Text style={{ color: "#2775BD", fontWeight: "bold", fontSize: 20 }}>
          Start your journey NURSD
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <AuthButton
          name={"Nurse"}
          onPress={() => props?.navigation.navigate("NurseProfileScreen")}
        />
        <AuthButton
          name={"Register"}
          onPress={() => props?.navigation.navigate("HospitalProfileScreen")}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
