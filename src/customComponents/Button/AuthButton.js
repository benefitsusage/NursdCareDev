import React from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";

const AuthButton = ({ onPress, name, color }) => {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        width: width / 1.2,
        height: 40,
        marginTop: 10,
        backgroundColor: color ? color : "#006002",
        borderRadius: 10,
        elevation: 3,
      }}
    >
      <TouchableOpacity
        style={{
          width: width / 1.2,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthButton;
