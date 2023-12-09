import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const Repeat = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const { width, height } = Dimensions.get("window");
  const handleDayClick = (day) => {
    const isSelected = selectedDays.includes(day);
    if (isSelected) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const generateDates = (selectedDays) => {
    const dates = [];
    const currentDate = new Date();

    for (let i = 0; i < 28; i++) {
      const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      if (selectedDays.includes(date.getDay())) {
        dates.push(date);
      }
    }

    return dates;
  };
  const dayCount = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <ScrollView>
      <Text>Repeat</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {dayCount.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                width: width / 5,
                flexWrap: "wrap",
                marginVertical: 10,
              }}
              onPress={() => handleDayClick(index)}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#b3b3b3",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedDays.includes(index) ? (
                  <MaterialIcons name="done" size={15} color="#2775BD" />
                ) : (
                  <View style={{ height: 0, width: 0 }} />
                )}
              </View>
              <Text style={{ marginLeft: 5 }}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {selectedDays.length > 0 && (
        <View>
          <Text>
            <Text>
              Upcoming dates for the selected days for 4 weeks after{" "}
              {moment().format("dddd, MMMM Do YYYY")}:{" "}
            </Text>
          </Text>
          <Text>
            <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
              {generateDates(selectedDays)?.map((date, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      borderWidth: 1,
                      borderColor: "#e6e6e6",
                      backgroundColor: "#f2f2f2",
                      borderRadius: 10,
                      flexDirection: "column",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text key={date.getTime()}>
                      {date.toLocaleDateString()}
                      {moment(date).format("dddd")}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
export default Repeat;
