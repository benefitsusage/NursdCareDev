import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Setting = (props) => {
  const List = [
    {
      name: "Notifications",
      route: "SettingNotification",
    },
    // {
    //   name: "Preferences",
    //   route: "SettingPreferences",
    // },
    {
      name: "Change Password",
      route: "SettingChangePassword",
    },
  ];

  return (
    <View style={styles.container}>
      {List.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              height: 40,
              // backgroundColor: "#f3f3f3",
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", justifyContent: "space-between" }}
              activeOpacity={0.5}
              onPress={() => props?.navigation?.navigate(item.route)}
            >
              <Text style={{ color: "#595959" }}>{item.name}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#595959"
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
