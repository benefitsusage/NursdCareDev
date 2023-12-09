import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Storage, DataStore } from "aws-amplify";
import {
  NurseTable,
} from "../../../../models";
import {
  openMap,
  DateFormat,
  jobUniqueId,
  timeDifferentCard,
} from "../../../../utils/function";
import moment from "moment";

const colorHospital = "#00b359";

const NoShowCard = ({ element, onJobDetailNavigate, userId }) => {
  const { width, height } = Dimensions.get("window");

  const [user, setUser] = useState(undefined);

  async function returnNurseName(id) {
    const itemArr = await DataStore.query(NurseTable, (item) => item.id.eq(id));
    setUser(itemArr[0]);
  }

  useEffect(() => {
    if (
      element?.jobFinalSelectionNurseId !== null ||
      element?.jobFinalSelectionNurseId !== ""
    ) {
      returnNurseName(element?.jobFinalSelectionNurseId);
    }
  }, [element]);

  const [noShowViewModel, setNoShowViewModel] = useState(false);
  const [
    pendingOrNoShowFacilityDecideMessage,
    setPendingOrNoShowFacilityDecideMessage,
  ] = useState("");

  const downloadAndOpenPDF = async (name) => {
    // Download the PDF file to the device's file system

    const response = await Storage.get(name, {
      level: "public/",
    });
    // const localUri = FileSystem.documentDirectory + "filename.pdf";

    // await FileSystem.writeAsStringAsync(localUri, response.Body, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // return localUri;
    Linking.openURL(response.toString());
  };

  return (
    <TouchableOpacity
      key={element?.id}
      style={{
        display: "flex",
        marginHorizontal: 15,
        marginTop: 10,
        padding: 8,
        backgroundColor:
          element?.jobFinalSelectionNurseId !== "" ||
            element?.jobFinalSelectionNurseId !== undefined
            ? "#e6ffee"
            : "#fff",
        borderRadius: 10,
        elevation: 1,
        shadowColor: element?.jobType === "Visit" ? "#00b359" : "#2775BD",
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }}
      activeOpacity={0.5}
      onPress={() =>
        onJobDetailNavigate({
          id: element?.id,
        })
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {user && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 10, color: "#1a75ff", fontWeight: "800" }}
              >
                Nurse : {user?.firstName} {user?.lastName}{" "}
              </Text>
            </View>
          )}
          {element?.selectCustomer && user && (
            <Text style={{ fontSize: 10, color: "#1a75ff", fontWeight: "800" }}>
              -{" "}
            </Text>
          )}
          {element?.selectCustomer && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 10, color: "#1a75ff", fontWeight: "800" }}
              >
                Patient : {element?.selectCustomer}
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Entypo
            name="dot-single"
            size={24}
            color={element?.jobType === "Visit" ? "#00b359" : "#2775BD"}
          />
          <Text
            style={{
              fontWeight: "800",
              fontSize: 10,
              color: element?.jobType === "Visit" ? "#00b359" : "#2775BD",
            }}
          >
            {jobUniqueId(element?.createdAt, element?.jobType)}
          </Text>
        </View>
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

          <Text style={{ fontSize: 10, marginLeft: 5 }}>
            {element?.fullAddress}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{ justifyContent: "space-around", alignItems: "flex-end" }}
          >
            <TouchableOpacity
              onPress={() =>
                onJobDetailNavigate({
                  id: element?.id,
                })
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: element?.jobType === "Visit" ? "#00b359" : "#2775BD",
                  textDecorationLine: "underline",
                }}
              >
                {element?.jobType === "Shift"
                  ? "Shift Details"
                  : "Visit Details"}
              </Text>
            </TouchableOpacity>
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
        {DateFormat(element?.startDate) === DateFormat(element?.endDate) ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name={"ios-calendar"} color={"#666"} size={15} />
            <Text
              style={{
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 10,
                marginLeft: 3,
                color: "#595959",
              }}
            >
              {DateFormat(element?.startDate)}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name={"ios-calendar"} color={"#666"} size={15} />
            <Text
              style={{
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 10,
                marginLeft: 3,
                color: "#595959",
              }}
            >
              {DateFormat(element?.startDate)} -
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 10,
                marginLeft: 3,
                color: "#595959",
              }}
            >
              {DateFormat(element?.endDate)}
            </Text>
          </View>
        )}
        <Text
          style={{
            fontSize: 10,
            marginLeft: 5,
            fontWeight: "bold",
            color: "#595959",
          }}
        >
          {moment(element?.startDate).format("ddd")} - {element?.jobTiming}{" "}
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
            <Entypo name="dot-single" size={13} />
            {timeDifferentCard(element?.startTime, element?.endTime)}
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
      {element?.noShowReason !== null && (
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                element?.pendingOrNoShowFacilityDecideMessage !== null &&
                  !element?.pendingOrNoShowFacilityDecideStatus
                  ? "red"
                  : colorHospital,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
            onPress={() => {
              onJobDetailNavigate({
                id: element?.id,
              });
            }}
          >
            <Text
              style={{
                textAlign: "right",
                fontSize: 12,
                color: "#fff",
              }}
            >
              View Reason
              {element?.pendingOrNoShowFacilityDecideMessage !== null &&
                !element?.pendingOrNoShowFacilityDecideStatus && (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      marginRight: 10,
                    }}
                  >
                    -Not Approved
                  </Text>
                )}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={noShowViewModel}
        onRequestClose={() => setNoShowViewModel(false)}
      >
        <View
          style={{
            height: height,
            // justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 15,
              // height: 150,
              width: 300,
              justifyContent: "center",
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              borderColor: "rgba(0, 0, 0, 0.1)",
              marginTop: 45,
            }}
          >
            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Missed {element?.jobType} Reason
              </Text>
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  borderRadius: 5,
                  elevation: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  marginHorizontal: 10,
                  paddingRight: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#000",
                    marginHorizontal: 10,
                  }}
                >
                  {element?.noShowReason}
                </Text>
              </View>
            </View>

            {element?.noShowReasonAttachment && (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Attachment
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 5,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                  onPress={() =>
                    downloadAndOpenPDF(
                      element?.noShowReasonAttachment?.toString()
                    )
                  }
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 12,
                      color: "#8888",
                      marginHorizontal: 10,
                    }}
                  >
                    Click to view the attachment
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {element?.pendingOrNoShowFacilityDecideMessage !== null &&
              !element?.pendingOrNoShowFacilityDecideStatus ? (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Reviewer Notes
                </Text>
                <View
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 5,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 12,
                      color: "#000",
                      marginHorizontal: 10,
                    }}
                  >
                    {element?.pendingOrNoShowFacilityDecideMessage}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Reviewer Notes <Text style={{ color: "red" }}>*</Text>
                </Text>

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
                    marginHorizontal: 10,
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
                    multiline
                    onChangeText={(text) =>
                      setPendingOrNoShowFacilityDecideMessage(text)
                    }
                    value={pendingOrNoShowFacilityDecideMessage}
                    keyboardType={"default"}
                    autoCapitalize="sentences"
                    placeholderTextColor="#b3b3b3"
                    placeholder={"Message"}
                  />
                  <View
                    style={{
                      height: 40,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {pendingOrNoShowFacilityDecideMessage ? (
                      <TouchableOpacity
                        onPress={() =>
                          setPendingOrNoShowFacilityDecideMessage("")
                        }
                        style={{ marginLeft: 3 }}
                      >
                        <Ionicons
                          name="close-sharp"
                          size={22}
                          color="#808080"
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              </View>
            )}

            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setNoShowViewModel(false);
                  setPendingOrNoShowFacilityDecideMessage("");
                }}
                style={{
                  backgroundColor: "gray",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default NoShowCard;
