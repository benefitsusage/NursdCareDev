import { View, Text, ImageBackground } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Linking } from "react-native";
import { jobUniqueId } from "../../../../utils/function";
import moment from "moment";

const colorHospital = "#006002";

const CalendarCard = ({ element, onJobDetailNavigate, userId }) => {
  const openMap = async (from) => {
    const url = `https://maps.google.com/?q=${from}`;
    // const url = `https://maps.google.com/?saddr=${from},&daddr=${to}}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      throw new Error("Couldn't open the map.");
    }
  };

  return (
    <View key={element?.id}>
      {element?.shiftTitle !== undefined ? (
        <TouchableOpacity
          key={element?.id}
          activeOpacity={0.5}
          onPress={() =>
            onJobDetailNavigate({
              id: element?.id,
            })
          }
          style={{
            display: "flex",
            marginHorizontal: 15,
            marginTop: 10,
            marginBottom: 10,
            padding: 8,
            backgroundColor:
              element?.jobFinalSelectionNurseId === null ||
              element?.jobFinalSelectionNurseId === ""
                ? "#fff"
                : "#e6ffee",
            borderRadius: 10,
            elevation: 1,
            shadowColor: colorHospital,
            shadowOpacity: 0.2,
            shadowRadius: 3.5,
            shadowOffset: {
              width: 0,
              height: 2,
            },
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Entypo name="dot-single" size={24} color={colorHospital} />
            <Text
              style={{
                fontWeight: "800",
                fontSize: 12,
                color: colorHospital,
              }}
            >
              {jobUniqueId(element?.createdAt, element?.jobType)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                overflow: "hidden",
                borderColor: colorHospital,
              }}
            >
              <TouchableOpacity onPress={() => openMap(element?.fullAddress)}>
                <ImageBackground
                  source={require("../../../../../assets/images/maps-icon.png")}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: colorHospital,
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "600",
                      paddingVertical: 2,
                      color: "#fff",
                      opacity: 0.7,
                    }}
                  >
                    view
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 5,
                  color: "#1a1a1a",
                  fontWeight: "600",
                  marginLeft: 5,
                }}
              >
                {element?.shiftTitle}
              </Text>
              <View>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {element?.licenseType?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginVertical: 1,
                          marginHorizontal: 5,
                        }}
                      >
                        <Text style={{ fontSize: 10, color: "#595959" }}>
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "flex-end",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: colorHospital,
                      textDecorationLine: "underline",
                    }}
                  >
                    {element?.jobType === "Shift"
                      ? "Shift Details"
                      : "Visit Details"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: "#000",
                marginLeft: 5,
                fontWeight: "700",
              }}
            >
              {element?.jobTiming}{" "}
              {element?.jobTiming === "Morning" ? (
                <Feather name="sun" size={12} color="black" />
              ) : element?.jobTiming === "Afternoon" ? (
                <Ionicons name="sunny-sharp" size={12} color="black" />
              ) : element?.jobTiming === "Evening" ? (
                <Ionicons name="partly-sunny-outline" size={12} color="black" />
              ) : (
                <Feather name="moon" size={12} color="black" />
              )}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"clock-outline"}
                color={"#666"}
                size={15}
                style={{
                  marginLeft: 5,
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  marginVertical: 5,
                  fontSize: 10,
                  marginLeft: 2,
                  color: "#595959",
                }}
              >
                {moment(new Date(element?.startTime)).format("hh:mma")}-
                {moment(new Date(element?.endTime)).format("hh:mma")}
              </Text>
            </View>
            {/* <Text
              style={{
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 11,
                marginLeft: 3,
                color: "#00cc00",
              }}
            >
              $ {element?.baseRate} / hr
            </Text> */}
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            display: "flex",
            marginHorizontal: 15,
            marginTop: 10,
            padding: 8,
            height: 70,
            backgroundColor: "#fef3f3",
            borderRadius: 10,
            elevation: 1,
            shadowColor: colorHospital,
            shadowOpacity: 0.2,
            shadowRadius: 3.5,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              color: "#1a1a1a",
              fontWeight: "600",
              marginLeft: 5,
            }}
          >
            You are Out of office at this time
          </Text>
        </View>
      )}
    </View>
  );
};

export default CalendarCard;
