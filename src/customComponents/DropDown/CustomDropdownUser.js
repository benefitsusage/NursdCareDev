import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import UserSelectCard from "../../screens/AppFlow/Manage/Card/UserSelectCard";

const CustomDropdown = ({
  container,
  options,
  selectedValue,
  onValueChange,
  onUserDetailNavigate,
  setSelectUser,
}) => {
  const [dropdownValue, setDropdownValue] = useState(selectedValue);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleValueChange = (value) => {
    setDropdownValue(value?.firstName);
    onValueChange(value?.id);
    setSelectUser(false);
    toggleDropdown();
  };

  return (
    <View
      style={[
        { ...styles.container, height: showDropdown ? 320 : 50 },
        container,
      ]}
    >
      <TouchableOpacity
        style={styles.selectedValueContainer}
        onPress={toggleDropdown}
      >
        <Text style={styles.selectedValueText}>{dropdownValue}</Text>
        <MaterialIcons
          name={showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#808080"
        />
      </TouchableOpacity>
      {showDropdown && (
        <ScrollView
          style={{
            height: 250,
            borderWidth: 1,
            borderColor: "#e6e6e6",
            backgroundColor: "#f2f2f2",
            marginVertical: 10,
            borderRadius: 10,
            overflow: "scroll",
          }}
          scrollEnabled={true}
        >
          {options.map((option) => (
            // <TouchableOpacity
            //   key={option?.id}
            //   style={styles.optionContainer}
            //   onPress={() => handleValueChange(option)}
            // >
            //   <Text style={styles.optionText}>{option?.firstName}</Text>
            // </TouchableOpacity>
            <UserSelectCard
              key={option?.id}
              element={option}
              onUserDetailNavigate={onUserDetailNavigate}
              handleValueChange={handleValueChange}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderRadius: 10,
    // width: "100%",
    // marginRight: 5,
    // paddingHorizontal: 10,
    // marginTop: 10,
  },
  selectedValueContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  selectedValueText: {
    fontSize: 13,
    color: "#737373",
  },
  optionContainer: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 12,
  },
});

export default CustomDropdown;
