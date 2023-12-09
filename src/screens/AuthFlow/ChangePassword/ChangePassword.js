import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  BackHandler,
  Alert,
} from "react-native";
import AuthButton from "../../../customComponents/Button/AuthButton";
import CustomInput from "../../../customComponents/Input/CustomInput";
import TitleText from "../../../customComponents/Text/TitleText";
import { MaterialIcons } from "@expo/vector-icons";

const ChangePassword = ({ setContainerScreen }) => {
  const [state, setState] = useState({
    password: "",
    passwordFocus: false,
    confirmPassword: "",
    confirmPasswordFocus: false,
  });
  const { width, height } = Dimensions.get("window");

  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(false);
    setContainerScreen("");
  };

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
    <View
      style={{
        ...styles.container,
        backgroundColor: modalVisible ? "#666666" : "#fff",
        opacity: modalVisible ? 0.5 : 1,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <TitleText text={"Reset Password"} />
        <Text
          style={{
            fontSize: 13,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 20,
            width: width / 1.3,
          }}
        >
          At least 6 character, with uppercase and lowercase letters.
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
            value={state.password}
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
            value={state.confirmPassword}
            placeholder="Enter Confirm Password"
            keyboardType={"default"}
            onChangeText={(text) =>
              setState({ ...state, confirmPassword: text })
            }
            clearValue={() => setState({ ...state, confirmPassword: "" })}
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
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <AuthButton
          name={"Submit"}
          onPress={() => setModalVisible(true)}
          color={"#006002"}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            height: height,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={{ ...styles.modalContainer, width: width / 1.2 }}>
            <MaterialIcons
              name="done"
              size={40}
              color="white"
              style={{
                backgroundColor: "#006002",
                padding: 10,
                borderRadius: 100,
              }}
            />

            <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30 }}>
              Password Changed !
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Your password has been changed successfully.
            </Text>
            <TouchableOpacity onPress={() => handlePress()}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingVertical: 50,
    justifyContent: "center",
    elevation: 5,
    alignItems: "center",
    borderRadius: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
