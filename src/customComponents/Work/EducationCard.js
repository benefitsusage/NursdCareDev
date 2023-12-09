import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import CustomDropdown from "../DropDown/CustomDropdown";
import { useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";

const EducationCard = ({
  index,
  item,
  length,
  handleUpdateEducation,
  handleRemoveEducation,
  options,
  DateString,
}) => {
  const [showCertification, setShowCertification] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#e6e6e6",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#e6e6e6",
            backgroundColor: "#f2f2f2",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginRight: 10,
          }}
          onPress={() => setShowCertification(true)}
        >
          <Text style={{ fontSize: 12 }}>{item?.educationType}</Text>
          <MaterialIcons
            name={"keyboard-arrow-down"}
            size={24}
            color="#b3b3b3"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={() => {
            length === 1
              ? Alert.alert("At least add one certification")
              : handleRemoveEducation(index);
          }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={25}
            color="#808080"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        style={{
          flex: 1,
          height: 40,
          borderWidth: 1,
          borderColor: "#e6e6e6",
          backgroundColor: "#f2f2f2",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 12 }}>
          {DateString(item.educationDate)}
        </Text>
        <AntDesign name="calendar" size={20} color="#808080" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCertification}
        onRequestClose={() => setShowCertification(false)}
      >
        <View
          style={{
            height: height,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              justifyContent: "center",
              elevation: 5,
              height: 280,
              width: width / 1.5,
              paddingHorizontal: 10,
              borderRadius: 15,
              borderColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text style={{ fontSize: 12, marginBottom: 10 }}>
              Select Education Type
            </Text>
            <CustomDropdown
              options={options}
              selectedValue={item?.educationType}
              onValueChange={(value) =>
                handleUpdateEducation(index, value, item?.educationDate)
              }
            />

            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => setShowCertification(false)}
                style={{
                  backgroundColor: "#2775BD",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCalendar}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View
          style={{
            height: height,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 20,
              justifyContent: "center",
              elevation: 5,
              borderRadius: 15,
              borderColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <CalendarPicker
              onDateChange={(date) =>
                handleUpdateEducation(index, item?.educationType, date)
              }
              selectedDayColor="#006002"
              selectedDayTextColor="#FFFFFF"
              initialDate={new Date()}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => setShowCalendar(false)}
                style={{
                  backgroundColor: "#2775BD",
                  marginHorizontal: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  Select
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EducationCard;
