import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomDropdown = ({
  container,
  options,
  selectedValue,
  onValueChange,
}) => {
  const [patientSearch, setPatientSearch] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(false);

  const handleValueChange = (value) => {
    onValueChange(value);
    setPatientSearch("");
  };
  const filterCustomerNameSuggestions = (query) => {
    if (query === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = options
        ?.filter((item) => item?.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      setFilteredSuggestions(filtered);
    }
  };

  return (
    <View style={[{ ...styles.container, height: 200 }, container]}>
      <View
        style={{
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
        }}
      >
        <TextInput
          style={{
            width: "90%",
            padding: 2,
            paddingLeft: 5,
            fontSize: 12,
            color: "#737373",
          }}
          onChangeText={(text) => {
            setPatientSearch(text);
            filterCustomerNameSuggestions(text);
          }}
          autoCapitalize="sentences"
          value={patientSearch}
          keyboardType={"default"}
          placeholderTextColor="#b3b3b3"
          placeholder={`Search ${selectedValue}`}
        />
        <View
          style={{
            height: 40,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {patientSearch !== "" ? (
            <TouchableOpacity
              onPress={() => setPatientSearch("")}
              style={{ marginLeft: 3 }}
            >
              <Ionicons name="close-sharp" size={22} color="#808080" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <FlatList
        // style={styles.list}
        data={patientSearch.length === 0 ? options : filteredSuggestions}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.optionContainer}
              onPress={() => handleValueChange(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item?.id}
      />
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
    height: 150,
    overflow: "scroll",
    // marginHorizontal: 10,
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
