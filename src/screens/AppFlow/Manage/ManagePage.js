import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ManageScreen = (props) => {
  const List = [
    {
      name: "Create Announcement",
      route: "AnnouncementScreen",
    },
    // {
    //   name: "Manage Templates",
    //   route: "ManageTemplate",
    //   type: "Template",
    // }, 
    // {
    //   name: "Manage Jobs",
    //   route: "ManageJob",
    //   type: "Job",
    // },
  ];

  return (
    <View style={styles.container}>
      {List.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              height: 40,
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              activeOpacity={0.5}
              onPress={() =>
                props?.navigation?.navigate(item.route, {
                  data: item.type,
                })
              }
            >
              <Text style={{ color: "#595959", fontSize: 12 }}>
                {item.name}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#808080"
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
