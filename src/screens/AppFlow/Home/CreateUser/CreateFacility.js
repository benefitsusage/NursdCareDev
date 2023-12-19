import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useState } from "react";
import CustomInput from "../../../../customComponents/Input/CustomInput";
import AuthButton from "../../../../customComponents/Button/AuthButton";
import { Auth, DataStore } from "aws-amplify";
import { FacilityTable } from "../../../../models";

const FormScreen = (props) => {
  const { width, height } = Dimensions.get("window");

  const [loading, setLoading] = useState(false);

  const [facilityState, setFacilityState] = useState({
    name: "",
    emailId: "",
    password: "",
  });

  //Register
  const signUp = async (username, password) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signUp({ username, password });

      await DataStore.save(
        new FacilityTable({
          name: facilityState.name,
          emailId: facilityState.emailId,
          phoneNumber: "",
          mobileId: "",
          emailVerified: true,
          fullAddress: "",
          latitude: "",
          longitude: "",
          facilityVerified: true,
          profileImage: "",
          organization: props?.route?.params?.data?.organization,
          location_id: props?.route?.params?.data?.location_id,
          password: password,
          facilityLoginControl: true,
          facilityAppAccessControl: false
        })
      );

      Alert.alert("Success", "Register successfully.");
      props.navigation.goBack();
    } catch (error) {
      console.log("error signing up", error);
    }
    setLoading(false);
  };

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
              label={"Name"}
              required={true}
              value={facilityState.name}
              placeholder="Enter name"
              keyboardType={"default"}
              onChangeText={(text) =>
                setFacilityState({ ...facilityState, name: text })
              }
              clearValue={() =>
                setFacilityState({ ...facilityState, name: "" })
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
                : facilityState.name === "" ||
                  facilityState.emailId === "" ||
                  facilityState.password === ""
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
