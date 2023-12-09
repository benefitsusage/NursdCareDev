import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ManageTemplateShift from "./ManageTemplateShift";
import ManageTemplateVisit from "./ManageTemplateVisit";

const ManageTemplate = (props) => {
  const [jobType, setJobType] = useState("shift");

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
              backgroundColor: jobType === "shift" ? "#000" : "#fff",
              width: "40%",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            activeOpacity={0.5}
            onPress={() => setJobType("shift")}
          >
            <Text style={{ color: jobType === "shift" ? "#fff" : "#000" }}>
              Shift{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: jobType === "visit" ? "#000" : "#fff",
              width: "40%",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            activeOpacity={0.5}
            onPress={() => setJobType("visit")}
          >
            <Text style={{ color: jobType === "visit" ? "#fff" : "#000" }}>
              Visit{" "}
            </Text>
          </TouchableOpacity>
        </View>
        {jobType === "shift" ? (
          <ManageTemplateShift props={props} />
        ) : (
          <ManageTemplateVisit props={props} />
        )}
      </View>
    </View>
  );
};

export default ManageTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
