import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { Organisation } from "../../../models";
import { DataStore, } from "aws-amplify";
import { Alert } from "react-native";

const Contact = (props) => {
  const List = [
    {
      name: "Contact Us",
      route: "ContactContactUs",
    },
    {
      name: "Technical Support",
      route: "ContactTechnicalSupport",
    },
    {
      name: "App info",
      route: "AppInfo",
    },
  ];

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);

  const [userId, setUserId] = useState(props?.userId);
  console.log("Contact", userId);

  const checkUser = async (id) => {
    setLoading(true);
    try {
      const orgData = await DataStore.query(Organisation, (item) =>
        item.id.eq(id)
      );
      setUser(orgData[0]);
      setLoading(false);
    } catch (error) {
      setUser(undefined);
    }
  };

  useEffect(() => {
    if (userId !== undefined) {
      checkUser(userId);
    }
  }, [userId]);

  const emailSend = () => {
    let templateParams = {
      from_name: `${user?.organisationName}`,
      reply_to: `${user?.emailId}`,
      roll: 'Admin',
      organization: `Full Organization`,
      location_id: `Full Location`,
      message: `Account Delete Action!`,
    };

    // console.log('ENVIADOS: ', JSON.stringify(templateParams));
    emailjs
      .send(
        "service_h905st6",
        "template_zo7eo58",
        templateParams,
        "0oklOlBvup9UrB7cd"
      )
      .then(
        function (response) {
          if (Platform.OS === "web") {
            alert("Your request is sent.")
          } else {
            Alert.alert("Your request is sent.")
          }
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  };

  return (
    <View style={styles.container}>
      {
        loading ? (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text> Loading... </Text>
          </View>
        ) :
          (
            <View style={styles.container}>
              {List.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      height: 40,
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
              <View
                style={{
                  height: 40,
                  paddingHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  activeOpacity={0.5}
                  onPress={() => {
                    Platform.OS === "web" ?
                      confirm(
                        "To confirm Deactivation and Deletion Click OK."
                      ).valueOf(true) && emailSend()
                      : Alert.alert("To confirm Deactivation and Deletion Click OK.", "", [
                        {
                          text: "Ok",
                          onPress: () => emailSend(),
                        },
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                      ])
                  }}
                  disabled={user !== undefined ? false : true}
                >
                  <Text style={{ color: "#595959", }}>
                    Deactivation and Deletion
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#808080"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )
      }
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
