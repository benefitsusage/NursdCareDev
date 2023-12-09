import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { DateString } from "../../utils/function";

const ExperienceCard = ({ item }) => {
  function getExperience(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    let output = "";
    if (years > 0) {
      output += years + " years ";
    }
    if (months > 0) {
      output += months + " month";
    }

    return output.trim();
  }

  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 2,
          borderColor: "#1a1a1a",
        }}
      >
        <MaterialCommunityIcons
          name="hospital-building"
          size={30}
          color="#8d8d8d"
        />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={{ fontWeight: "500", fontSize: 13 }}>
          {item?.employerName}-{item.positionTitle}
        </Text>
        <Text style={{ fontSize: 12 }}>{item.positionType}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12 }}>{DateString(item.startDate)}</Text>
          <Entypo name="dot-single" size={24} color="#808080" />

          {item.currentlyWorkingHere ? (
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              Currently work here
            </Text>
          ) : (
            <Text style={{ fontSize: 12 }}>{DateString(item.endDate)}</Text>
          )}
          {!item.currentlyWorkingHere && (
            <Entypo name="dot-single" size={24} color="#808080" />
          )}
          {!item.currentlyWorkingHere && (
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {getExperience(item.startDate, item.endDate)}{" "}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ExperienceCard;
