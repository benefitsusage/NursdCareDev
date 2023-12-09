import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ManageShift from "./Shift";
import ManageVisit from "./Visit";

const MyPayments = (props) => {
  const [type, setType] = useState("shift");

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
              backgroundColor: type === "shift" ? "#000" : "#fff",
              width: "40%",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            activeOpacity={0.5}
            onPress={() => setType("shift")}
          >
            <Text style={{ color: type === "shift" ? "#fff" : "#000" }}>
              Shift{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: type === "visit" ? "#000" : "#fff",
              width: "40%",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            activeOpacity={0.5}
            onPress={() => setType("visit")}
          >
            <Text style={{ color: type === "visit" ? "#fff" : "#000" }}>
              Visit{" "}
            </Text>
          </TouchableOpacity>
        </View>
        {type === "shift" ? (
          <ManageShift props={props} />
        ) : (
          <ManageVisit props={props} />
        )}
      </View>
    </View>
  );
};

export default MyPayments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
