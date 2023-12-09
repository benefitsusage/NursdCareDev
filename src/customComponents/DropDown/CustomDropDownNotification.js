import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomDropDownNotification = ({
  container,
  options,
  selectedValue,
  onValueChange,
}) => {
  const [dropdownValue, setDropdownValue] = useState(selectedValue);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleValueChange = (value) => {
    setDropdownValue(value);
    onValueChange(value);
    toggleDropdown();
  };

  return (
    <View
      style={[
        { ...styles.container, height: showDropdown ? 200 : 50 },
        container,
      ]}
    >
      <TouchableOpacity
        style={styles.selectedValueContainer}
        onPress={toggleDropdown}
      >
        <Text style={styles.selectedValueText}>
          {dropdownValue ? dropdownValue : "Select Type"}
        </Text>
        <MaterialIcons
          name={showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#808080"
        />
      </TouchableOpacity>
      {showDropdown && (
        <ScrollView style={styles.optionsContainer} scrollEnabled={true}>
          {options.map((option, item) => (
            <TouchableOpacity
              key={option}
              style={{
                ...styles.optionContainer,
                marginBottom: options.length - 1 === item ? 15 : 0,
              }}
              onPress={() => handleValueChange(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
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
  optionsContainer: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#f2f2f2",
    marginTop: 2,
    borderRadius: 10,
    height: 120,
    overflow: "scroll",
  },
  optionContainer: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 12,
  },
});

export default CustomDropDownNotification;
