import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";

const CustomInput = ({
  keyboardType,
  placeholder,
  value,
  onChangeText,
  clearValue,
  label,
  required,
  viewStyle,
  textInputStyle,
  iconStyle,
  labelStyle,
  editable,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <View style={{ flex: 1 }}>
      {label !== "" && (
        <Text
          style={[
            {
              marginBottom: 5,
              fontSize: 12,
              color: "#737373",
            },
            labelStyle,
          ]}
        >
          {label}
          {required && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}

      <View style={viewStyle}>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          autoCapitalize="none"
          placeholderTextColor="#b3b3b3"
          placeholder={placeholder}
          style={{ ...textInputStyle, color: "#737373", flex: 1 }}
          secureTextEntry={
            placeholder?.includes("Password") ? passwordVisible : false
          }
          editable={editable}
        />
        <View style={iconStyle}>
          {placeholder?.includes("Password") && (
            <Ionicons
              size={20}
              color="#808080"
              name={passwordVisible ? "eye" : "eye-off"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          )}
          {value ? (
            <TouchableOpacity
              onPress={editable ? clearValue : null}
              style={{ marginLeft: 3 }}
            >
              <Ionicons name="close-sharp" size={20} color="#808080" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default CustomInput;
