import React, { Component } from "react";
import { Image, Text, View } from "react-native";

export class AppInfo extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "800" }}>NursdCare</Text>
        <Text style={{ fontSize: 15, color: "#888" }}> version 1.0.8</Text>
        <Image
          source={require("../../../../assets/login/NURSD-Flow.png")}
          style={{
            width: 150,
            height: 50,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
        <Text style={{ fontSize: 12, color: "#888" }}>© 2023 Nursd LLC.</Text>
      </View>
    );
  }
}

export default AppInfo;
