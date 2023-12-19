import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";
import { DataStore, Storage } from "aws-amplify";
import { FacilityTable } from "../../../models";
import CalendarView from "./CalenderView";
import ShiftView from "../Home/Shift";
import VisitView from "../Home/Visit";
import { S3Image } from "aws-amplify-react-native";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { Platform } from "react-native";

const Profile = (props) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(
    props === undefined ? {} : props?.route?.params?.data?.id
  );
  const [user, setUser] = useState(null);
  const [jobType, setJobType] = useState("Job");
  const [job, setJob] = useState("Shift");

  const checkUser = async (id) => {
    try {
      const nurseData = await DataStore.query(FacilityTable, (item) =>
        item.id.eq(id)
      );
      setUser(nurseData[0]);
      setLoading(false);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (userId === null) {
      return;
    }
    checkUser(userId);
  }, [userId]);

  //FacilityTable Insert
  useEffect(() => {
    const subscription = DataStore.observe(FacilityTable).subscribe((msg) => {
      if (msg.model === FacilityTable && msg.opType === "INSERT") {
        checkUser(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  //FacilityTable Update
  useEffect(() => {
    const subscription = DataStore.observe(FacilityTable).subscribe((msg) => {
      if (msg.model === FacilityTable && msg.opType === "UPDATE") {
        console.log("UserDetails FacilityTable", msg.opType);
        checkUser(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  const [progress, setProgress] = useState(0);

  const progressCallback = (progress) => {
    setProgress(progress.loaded / progress.total);
  };

  const getBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  // Image picker
  const pickImage = async () => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();

        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          if (Platform.OS === "web") {
            alert("Sorry, we need camera roll permissions to make this work!");
          } else {
            Alert.alert(
              "Sorry, we need camera roll permissions to make this work!"
            );
          }
        } else {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });

          if (!result.canceled) {
            // setImage(result.assets[0].uri);
            const blob = await getBlob(result.assets[0].uri);
            console.log("sending", result.assets[0].uri);
            const { key } = await Storage.put(`${uuid.v4()}.png`, blob, {
              progressCallback,
            });
            sendImage(key);
          }
        }
      }
    })();
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      // setImage(result.uri);
    }
  };

  const sendImage = async (key) => {
    await DataStore.save(
      FacilityTable.copyOf(user, (updated) => {
        updated.profileImage = key;
      })
    ).then((res) => {
      setProgress(0);
    });
  };


  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 20,
                marginRight: 10,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "#2775BD",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                width: 65,
                height: 65,
                overflow: "hidden",
              }}
              onPress={() => pickImage()}
            >
              {user?.profileImage ? (
                <View>
                  <S3Image
                    imgKey={user?.profileImage}
                    style={{
                      width: 63,
                      height: 63,
                      borderRadius: 10,
                      // aspectRatio: 4 / 4,
                    }}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <Image
                  source={require("../../../../assets/login/upload-profile.png")}
                  style={{ width: 60, height: 60 }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("NotificationScreenFacility", {
                  data: {
                    id: userId,
                  },
                })
              }
            >
              <Ionicons
                name="ios-notifications-outline"
                color={"#333333"}
                size={24}
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 15,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              {user?.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontWeight: "500", fontSize: 12 }}>
                Employer Information
              </Text>

              <Text style={{ fontWeight: "500", fontSize: 12, marginTop: 5 }}>
                Organization ={" "}
                <Text
                  style={{
                    fontSize: 12,
                    color: "#595959",
                    marginTop: 5,
                  }}
                >
                  {user?.organization}
                </Text>
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 12, marginTop: 5 }}>
                Office ID ={" "}
                <Text
                  style={{
                    fontSize: 12,
                    color: "#595959",
                    marginTop: 5,
                  }}
                >
                  {user?.location_id}
                </Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 3,
              backgroundColor: "#f2f2f2",
              marginVertical: 10,
            }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <View>
                <Text style={{ fontWeight: "500", fontSize: 12 }}>Email</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#595959",
                    marginTop: 5,
                  }}
                >
                  {user?.emailId}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <View>
                <Text style={{ fontWeight: "500", fontSize: 12 }}>
                  Phone Number
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#595959",
                    marginTop: 5,
                  }}
                >
                  {user?.phoneNumber}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginBottom: 25,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: jobType === "Job" ? "#006002" : "#fff",
                  width: "40%",
                  alignItems: "center",
                  paddingVertical: 5,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: jobType === "Job" ? "#006002" : "#000",
                }}
                activeOpacity={0.5}
                onPress={() => setJobType("Job")}
              >
                <Text style={{ color: jobType === "Job" ? "#fff" : "#000" }}>
                  Job View
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: jobType === "Calender" ? "#006002" : "#fff",
                  width: "40%",
                  alignItems: "center",
                  paddingVertical: 5,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: jobType === "Calender" ? "#006002" : "#000",
                }}
                activeOpacity={0.5}
                onPress={() => setJobType("Calender")}
              >
                <Text
                  style={{ color: jobType === "Calender" ? "#fff" : "#000" }}
                >
                  Calender View
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 3,
                backgroundColor: "#f2f2f2",
                marginVertical: 10,
              }}
            />

            {jobType === "Job" ? (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: job === "Shift" ? "#000" : "#fff",
                      width: "40%",
                      alignItems: "center",
                      paddingVertical: 5,
                      borderRadius: 5,
                      borderWidth: 0.5,
                    }}
                    activeOpacity={0.5}
                    onPress={() => setJob("Shift")}
                  >
                    <Text style={{ color: job === "Shift" ? "#fff" : "#000" }}>
                      Shift Jobs
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: job === "Visit" ? "#000" : "#fff",
                      width: "40%",
                      alignItems: "center",
                      paddingVertical: 5,
                      borderRadius: 5,
                      borderWidth: 0.5,
                    }}
                    activeOpacity={0.5}
                    onPress={() => setJob("Visit")}
                  >
                    <Text
                      style={{
                        color: job === "Visit" ? "#fff" : "#000",
                      }}
                    >
                      Visit Jobs
                    </Text>
                  </TouchableOpacity>
                </View>
                {job === "Shift" ? (
                  <ShiftView props={props} userId={userId} />
                ) : (
                  <VisitView props={props} userId={userId} />
                )}
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 20,
                  }}
                >
                  <Text style={{ fontWeight: "500", fontSize: 12 }}>
                    Calendar & Availability
                  </Text>
                </View>
                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 20,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 20,
                      marginTop: 10,
                    }}
                  >
                    <Entypo name="dot-single" size={24} color={"#2775BD"} />
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 12,
                        color: "#2775BD",
                      }}
                    >
                      Shift
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 20,
                      marginTop: 10,
                    }}
                  >
                    <Entypo name="dot-single" size={24} color={"green"} />
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 12,
                        color: "green",
                      }}
                    >
                      Visit
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 20,
                      marginTop: 10,
                    }}
                  >
                    <Entypo name="dot-single" size={24} color={"red"} />
                    <Text
                      style={{ fontWeight: "500", fontSize: 12, color: "red" }}
                    >
                      Time Off
                    </Text>
                  </View>
                </View> */}
                <CalendarView userID={userId} />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
