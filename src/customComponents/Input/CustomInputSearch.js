import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, Dimensions, TouchableOpacity } from "react-native";

const CustomInputSearch = ({
  keyboardType,
  placeholder,
  value,
  onChangeText,
  clearValue,
}) => {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        height: 40,
        flex: 1,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        elevation: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#e6e6e6",
        paddingRight: 10,
        justifyContent: "space-between",
        marginTop: 0,

      }}
    >
      <TextInput
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize="sentences"
        placeholderTextColor="#b3b3b3"
        placeholder={placeholder}
        style={{
          flex: 1,
          height: 40,
          borderRadius: 10,
          paddingLeft: 10,
          paddingRight: 5,
          fontSize: 12,
        }}
      />
      <View
        style={{
          height: 40,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {value ? (
          <TouchableOpacity onPress={clearValue}>
            <Ionicons name="close-sharp" size={22} color="#808080" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>

  );
};

export default CustomInputSearch;
