import { View, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import FormScreen from "./FormScreen";
import ConfirmCodeFacility from "../ConfirmCode/ConfirmCodeFacility";

const HospitalProfile = (props) => {
  const [containerScreen, setContainerScreen] = useState("");

  const [facilityState, setFacilityState] = useState({
    name: "",
    emailId: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      {containerScreen === "ConfirmCode" ? (
        <ConfirmCodeFacility
          setContainerScreen={setContainerScreen}
          facilityState={facilityState}
          setFacilityState={setFacilityState}
        />
      ) : (
        <FormScreen
          setContainerScreen={setContainerScreen}
          facilityState={facilityState}
          setFacilityState={setFacilityState}
          props={props}
        />
      )}
    </View>
  );
};

export default HospitalProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
