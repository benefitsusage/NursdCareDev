import { View, Text } from "react-native";
import React from "react";

const TitleText = ({ text }) => {
  return (
    <View>
      <Text style={{ color: "#000", fontWeight: "bold", fontSize: 25 }}>
        {text}
      </Text>
    </View>
  );
};

export default TitleText;
