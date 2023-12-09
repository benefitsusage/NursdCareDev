import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FacilityScreen from "./Facility";
import NurseScreen from "./Nurse";
import CustomerScreen from "./Customer";

const OrganizationDetails = (props) => {
  const location_id =
    props !== undefined && props?.route?.params?.data?.location_id;
  const organization = props !== undefined && props?.route?.params?.data?.organization;
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
          {/* <TouchableOpacity
            style={{
              backgroundColor: jobType === "Customer" ? "#000" : "#fff",
              width: "32%",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            activeOpacity={0.5}
            onPress={() => setJobType("Customer")}
          >
            <Text style={{ color: jobType === "Customer" ? "#fff" : "#000" }}>
              Customer
            </Text>
          </TouchableOpacity> */}
        </View>
        {/* {jobType === "Facility" ? (
          <FacilityScreen props={props} location_id={location_id} organization={organization} />
        ) : jobType === "Nurse" ? (
          <NurseScreen props={props} location_id={location_id} organization={organization} />
        ) : (
          <CustomerScreen props={props} location_id={location_id} />
        )} */}

        {jobType === "Facility" ? (
          <FacilityScreen props={props} location_id={location_id} organization={organization} />
        ) : (
          <NurseScreen props={props} location_id={location_id} organization={organization} />
        )}
      </View>
    </View>
  );
};

export default OrganizationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
