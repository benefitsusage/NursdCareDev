import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import ExperienceCard from "../../../customComponents/Work/ExperienceCard";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import { DataStore, Storage } from "aws-amplify";
import { NurseTable } from "../../../models";
import { S3Image } from "aws-amplify-react-native";
import CalendarView from "./CalenderView";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { DateString } from "../../../utils/function";

const UserDetails = (props) => {
  const [userId, setUserId] = useState(
    props === undefined ? {} : props?.route?.params?.data?.id
  );
  const [user, setUser] = useState(null);
  // const [facilityId, setFacilityId] = useState(null);

  const checkUser = async (id) => {
    try {
      const nurseData = await DataStore.query(NurseTable, (item) =>
        item.id.eq(id)
      );
      setUser(nurseData[0]);
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

  useEffect(() => {
    const subscription = DataStore.observe(NurseTable).subscribe((msg) => {
      if (msg.model === NurseTable && msg.opType === "UPDATE") {
        console.log("UserDetails NurseTable", msg.opType);
        checkUser(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  const primaryLicenseType = [
    {
      name: "Registered Nurse (RN)",
      value: "RN",
    },
    {
      name: "Licensed Practical Nurse (LPN)",
      value: "LPN",
    },
    {
      name: "Licensed Nurse Assistance (LNA)",
      value: "LNA",
    },
    {
      name: "Certified Nurse Assistance (CNA)",
      value: "CNA",
    },
    {
      name: "Geriatric Nurse Assistance (GNA)",
      value: "GNA",
    },
    {
      name: "Home Health Aide (HHA)",
      value: "HHA",
    },
    {
      name: "Home Maker (HMK)",
      value: "HMK",
    },
  ];

  const onChatRoomNavigate = (d) => {
    props?.navigation.navigate("ChatRoomScreen", {
      data: d,
    });
  };

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
      NurseTable.copyOf(user, (updated) => {
        updated.profileImage = key;
      })
    ).then((res) => {
      setProgress(0);
    });
  };

  return (
    <View style={styles.container}>
      {user === null ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text> Loading... </Text>
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
                  style={{ width: 85, height: 85 }}
                />
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() =>
                onChatRoomNavigate({
                  chatRoomId: "",
                  nurseId: userId,
                  facilityId: facilityId,
                })
              }
              style={{
                backgroundColor: "#ddd",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ color: "#000", fontWeight: "600", fontSize: 12 }}>
                Message
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("NotificationScreenNurse", {
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
              {user?.firstName} {user?.lastName}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 5,
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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 5,
            }}
          >
            <View>
              <Text style={{ fontWeight: "500", fontSize: 12 }}>Contact</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#595959",
                  marginTop: 5,
                }}
              >
                {user?.emailId}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#595959",
                }}
              >
                {user?.phoneNumber}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "500", fontSize: 12 }}>DOB</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#595959",
                  marginTop: 5,
                }}
              >
                {DateString(user?.dateOfBirth)}
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
            style={{
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 12 }}>Address</Text>
            <Text
              style={{
                fontSize: 12,
                color: "#595959",
                marginTop: 5,
              }}
            >
              {user?.fullAddress}
            </Text>
          </View>

          <View
            style={{
              height: 3,
              backgroundColor: "#f2f2f2",
              marginVertical: 10,
            }}
          />

          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 12 }}>
              Clinical Information
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500", fontSize: 12 }}>
                  Primary License Type
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginTop: 5 }}>
                  {primaryLicenseType
                    .filter((item) => {
                      return item.value === user?.primaryLicenseType;
                    })
                    .map((filterItem) => filterItem.name)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500", fontSize: 12 }}>
                  Primary License State
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginTop: 5 }}>
                  {user?.primaryState}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500", fontSize: 12 }}>
                  License Number
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginTop: 5 }}>
                  {user?.clinicalLicenseNumber}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500", fontSize: 12 }}>
                  Expiration Date
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginTop: 5 }}>
                  {DateString(user?.clinicalLicenseExpirationDate)}
                </Text>
              </View>
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
            style={{
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: 12 }}>Specialty</Text>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {user?.specialty?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // borderWidth: 1,
                      // borderColor: "#e6e6e6",
                      // backgroundColor: "#f1f1f1",
                      borderRadius: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      // paddingHorizontal: 10,
                      // paddingVertical: 5,
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#595959",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 12 }}>
              Certification Details
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            {user?.certificationDetails?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12 }}>Name</Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>
                      {item?.certificationType}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12 }}>Expiration Date</Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>
                      {DateString(item?.certificationDate)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              height: 3,
              backgroundColor: "#f2f2f2",
              marginVertical: 10,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 12 }}>
              Education Details
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            {user?.educationDetails?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12 }}>Name</Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>
                      {item?.educationType}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12 }}>Graduation Date</Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>
                      {DateString(item?.educationDate)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              height: 3,
              backgroundColor: "#f2f2f2",
              marginVertical: 10,
            }}
          />

          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: 12 }}>Skills</Text>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {user?.skills?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // borderWidth: 1,
                      // borderColor: "#e6e6e6",
                      // backgroundColor: "#f1f1f1",
                      borderRadius: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      // paddingHorizontal: 10,
                      // paddingVertical: 5,
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#595959" }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
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
            style={{
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: 12 }}>
                EMR / EHR Experience
              </Text>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {user?.EMRorEHRExperience?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // borderWidth: 1,
                      // borderColor: "#e6e6e6",
                      // backgroundColor: "#f1f1f1",
                      borderRadius: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      // paddingHorizontal: 10,
                      // paddingVertical: 5,
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#595959" }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 12 }}>
              Work Experience
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            {user?.workExperienceDetails?.map((item, index) => {
              return <ExperienceCard key={index} item={item} />;
            })}
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              // marginVertical: 25,
            }}
          >
            {/* <AuthButton name={"Submit"} /> */}
          </View>

          <View
            style={{
              height: 3,
              backgroundColor: "#f2f2f2",
              marginVertical: 10,
            }}
          />

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
              marginTop: 10,
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
                style={{ fontWeight: "500", fontSize: 12, color: "#2775BD" }}
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
              <Text style={{ fontWeight: "500", fontSize: 12, color: "green" }}>
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
              <Text style={{ fontWeight: "500", fontSize: 12, color: "red" }}>
                Time Off
              </Text>
            </View>
          </View> */}
          <View
            style={{
              marginBottom: 25,
            }}
          >
            <CalendarView userID={userId} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
