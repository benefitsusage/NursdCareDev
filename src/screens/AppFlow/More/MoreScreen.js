import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth, DataStore } from "aws-amplify";
import { Organisation } from "../../../models";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import { useCallback } from "react";

const MoreScreen = (props) => {
  const List = [
    // {
    //   name: "Profile",
    //   route: "ProfileScreen",
    // },
    // {
    //   name: "My Payments",
    //   route: "MyPaymentsScreen",
    // },
    // {
    //   name: "Time Off",
    //   route: "TimeOffScreen",
    // },
    // {
    //   name: "Settings",
    //   route: "SettingScreen",
    // },
    {
      name: "Contact",
      route: "ContactScreen",
    },
    {
      name: "Terms & Conditions",
      route: "TermsAndConditionsScreen",
    },
    {
      name: "Privacy Policy",
      route: "PrivacyPolicyScreen",
    },
  ];

  console.log("MoreScreen", props?.userId);
  const [userId, setUserId] = useState(props?.userId);
  //Get User ID
  // useFocusEffect(
  //   useCallback(() => {
  //     let isActive = true;
  //     if (isActive) {
  //       AsyncStorage.getItem("userId").then((resp) => {
  //         if (resp !== null) {
  //           setUserId(resp);
  //         }
  //       });
  //       return () => {
  //         isActive = false;
  //       };
  //     }
  //   }, [])
  // );

  //Update Notification Id in Organisation Table
  const upDateNotificationFacilityId = async (id) => {
    const facilityData = await DataStore.query(Organisation, (item) =>
      item.id.eq(id)
    );
    console.log(facilityData[0]);
    const res = await DataStore.save(
      Organisation.copyOf(facilityData[0], (updatedItem) => {
        updatedItem.mobileId = "";
      })
    );
    console.log("More Screen:", res);
    if (
      res.mobileId === "" ||
      res.mobileId === undefined ||
      res.mobileId === nulll
    ) {
      await AsyncStorage.removeItem("userId");
      Auth.signOut();
    }
  };

  const logOut = async (id) => {
    // await AsyncStorage.removeItem("userId");
    upDateNotificationFacilityId(id);
    // Auth.signOut();
  };

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
              onPress={() => props?.navigation?.navigate(item.route)}
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
      <View
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
          onPress={() =>
            userId !== undefined &&
            Alert.alert("Are you sure want to Logout?", "", [
              {
                text: "Yes",
                onPress: () => logOut(userId),
              },
              {
                text: "No",
                style: "cancel",
              },
            ])
          }
          activeOpacity={0.5}
        >
          <Text style={{ color: "#595959", fontSize: 12 }}>Log Out</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#808080"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
