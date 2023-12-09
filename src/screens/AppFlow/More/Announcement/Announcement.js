import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FacilityScreen from "./Facility";
import NurseScreen from "./Nurse";

const Announcement = (props) => {
  const [jobType, setJobType] = useState("Facility");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: jobType === "Facility" ? "#000" : "#fff",
              width: "40%",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            activeOpacity={0.5}
            onPress={() => setJobType("Facility")}
          >
            <Text style={{ color: jobType === "Facility" ? "#fff" : "#000" }}>
              Manager
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: jobType === "Nurse" ? "#000" : "#fff",
              width: "40%",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            activeOpacity={0.5}
            onPress={() => setJobType("Nurse")}
          >
            <Text style={{ color: jobType === "Nurse" ? "#fff" : "#000" }}>
              Nurse
            </Text>
          </TouchableOpacity>
        </View>
        {jobType === "Facility" ? (
          <FacilityScreen props={props} />
        ) : (
          <NurseScreen props={props} />
        )}
      </View>
    </View>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
