import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import UserCard from "../Card/UserCardFacility";
import {
  FacilityNotificationTable,
  FacilityTable,
  NurseNotificationTable,
  NurseTable,
  Organisation,
} from "../../../../models";
import { DataStore } from "aws-amplify";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendNewPushNotification } from "../../../../utils/notification";

const Facility = ({ props }) => {
  const { width, height } = Dimensions.get("window");
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(props?.userId);
  const [facilityData, setFacilityData] = useState(undefined);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [viewModel, setViewModel] = useState(false);
  const [viewModelAll, setViewModelAll] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationURL, setNotificationURL] = useState("");

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

  const onUserDetailNavigate = (d) => {
    props.navigation.navigate("FacilityDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    if (userId !== undefined) {
      getFacilityDetail(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (facilityData !== undefined) {
      getNurseList(facilityData?.organisationName);
    }
  }, [facilityData]);

  //Facility Detail
  const getFacilityDetail = async (id) => {
    try {
      const facilityData = await DataStore.query(Organisation, (item) =>
        item.id.eq(id)
      );
      setFacilityData(facilityData[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getNurseList = async (id) => {
    try {
      const nurseList = await DataStore.query(FacilityTable, (item) =>
        item.organization.eq(id)
      );
      setData(nurseList);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const onJobDetailNavigate = (d) => {
  //   props.navigation.navigate("JobDetailsScreen", {
  //     data: d,
  //   });
  // };

  // useEffect(() => {
  //   const subscription = DataStore.observe(NurseTable).subscribe((msg) => {
  //     if (facilityData !== undefined) {
  //       if (msg.model === NurseTable && msg.opType === "INSERT") {
  //         getNurseList(facilityData?.organization);
  //       }
  //       if (msg.model === NurseTable && msg.opType === "UPDATE") {
  //         getNurseList(facilityData?.organization);
  //       }
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [facilityData]);

  const updateUser = async (data, value) => {
    await DataStore.save(
      NurseTable.copyOf(data, (updated) => {
        updated.nurseLoginControl = value;
      })
    );
  };

  const onChatRoomNavigate = (d) => {
    props?.navigation.navigate("ChatRoomScreen", {
      data: d,
    });
  };

  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCardsAll, setSelectedCardsAll] = useState([]);
  const [selected, setSelected] = useState(false);

  const handleCardPress = (selectedElement) => {
    setSelectedCards((prevSelectedCards) => {
      const isSelected = prevSelectedCards.some(
        (card) => card.id === selectedElement.id
      );
      if (isSelected) {
        // Remove the card from the selected cards list
        return prevSelectedCards.filter(
          (card) => card.id !== selectedElement.id
        );
      } else {
        // Add the card to the selected cards list
        return [...prevSelectedCards, selectedElement];
      }
    });
  };

  useEffect(() => {
    if (!selected) {
      setSelectedCards([]);
    }
  }, [selected]);

  const AnnouncementsAll = () => {
    setSelectedCardsAll(data);
    setViewModelAll(true);
  };
  const WeatherAll = () => {
    setSelectedCardsAll(data);
    setNotificationTitle("Weather Alert");
    setViewModelAll(true);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Loading...</Text>
        </View>
      ) : data?.length === 0 ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Currently no manager.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: Platform.OS === "ios" ? 30 : 50,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => {
                  setSelected(!selected);
                }}
                style={{
                  marginRight: 10,
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  backgroundColor: selected ? "#ccc" : "#2775BD",
                  borderRadius: 5,
                  elevation: 1,
                  shadowOpacity: 0.2,
                  shadowRadius: 3.5,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                }}
              >
                <Text style={{ color: "#fff" }}>
                  {selected ? "Cancel" : "Select"}
                </Text>
              </TouchableOpacity>
              {selectedCards.length !== 0 && (
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    Alert.alert("Type of Announcement", "", [
                      {
                        text: "Announcement",
                        onPress: () => setViewModel(true),
                      },
                      {
                        text: "Weather Alert",
                        onPress: () => {
                          setViewModel(true),
                            setNotificationTitle("Weather Alert");
                        },
                      },
                      {
                        text: "Close",
                        style: "cancel",
                      },
                    ]);
                  }}
                  style={{
                    marginRight: 10,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                    backgroundColor: "#006002",
                    borderRadius: 5,
                    elevation: 1,
                    shadowOpacity: 0.2,
                    shadowRadius: 3.5,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                  }}
                >
                  <Text style={{ color: "#fff" }}>Announcement</Text>
                </TouchableOpacity>
              )}
              {!selected && (
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    Alert.alert("Type of Announcement", "", [
                      {
                        text: "Announcement",
                        onPress: () => AnnouncementsAll(),
                      },
                      {
                        text: "Weather Alert",
                        onPress: () => WeatherAll(),
                      },
                      {
                        text: "Close",
                        style: "cancel",
                      },
                    ]);
                  }}
                  style={{
                    marginRight: 1,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                    backgroundColor: "#006002",
                    borderRadius: 5,
                    elevation: 1,
                    shadowOpacity: 0.2,
                    shadowRadius: 3.5,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                  }}
                >
                  <Text style={{ color: "#fff" }}>All</Text>
                </TouchableOpacity>
              )}
            </View>
            {data?.map((element, index) => {
              return (
                <UserCard
                  key={element?.id}
                  element={element}
                  onUserDetailNavigate={onUserDetailNavigate}
                  onChatRoomNavigate={onChatRoomNavigate}
                  userId={userId}
                  onSelectPress={() => handleCardPress(element)}
                  selectedCards={selectedCards}
                  selected={selected}
                  organizationData={facilityData}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={viewModel}
        onRequestClose={() => setViewModel(false)}
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
                Send Notification
              </Text>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Title <Text style={{ color: "red" }}>*</Text>
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
                  onChangeText={(text) => setNotificationTitle(text)}
                  value={notificationTitle}
                  keyboardType={"default"}
                  autoCapitalize="sentences"
                  placeholderTextColor="#b3b3b3"
                  placeholder={"Title"}
                />
                <View
                  style={{
                    height: 40,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {notificationTitle ? (
                    <TouchableOpacity
                      onPress={() => setNotificationTitle("")}
                      style={{ marginLeft: 3 }}
                    >
                      <Ionicons name="close-sharp" size={22} color="#808080" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Message <Text style={{ color: "red" }}>*</Text>
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
                  onChangeText={(text) => setNotificationContent(text)}
                  value={notificationContent}
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
                  {notificationContent ? (
                    <TouchableOpacity
                      onPress={() => setNotificationContent("")}
                      style={{ marginLeft: 3 }}
                    >
                      <Ionicons name="close-sharp" size={22} color="#808080" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                URL
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
                  onChangeText={(text) => setNotificationURL(text)}
                  value={notificationURL}
                  keyboardType={"default"}
                  autoCapitalize="sentences"
                  placeholderTextColor="#b3b3b3"
                  placeholder={"start with https://"}
                />
                <View
                  style={{
                    height: 40,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {notificationURL ? (
                    <TouchableOpacity
                      onPress={() => setNotificationURL("")}
                      style={{ marginLeft: 3 }}
                    >
                      <Ionicons name="close-sharp" size={22} color="#808080" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>

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
                  setViewModel(false);
                  setNotificationTitle("");
                  setNotificationContent("");
                  setNotificationURL("");
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
              <TouchableOpacity
                onPress={async () => {
                  if (!loadingBtn) {
                    if (
                      notificationTitle === "" &&
                      notificationContent === ""
                    ) {
                      Alert.alert("Please fill the title and content!");
                    } else if (
                      notificationTitle !== "" &&
                      notificationContent === ""
                    ) {
                      Alert.alert("Please fill the content!");
                    } else if (
                      notificationTitle === "" &&
                      notificationContent !== ""
                    ) {
                      Alert.alert("Please fill the title!");
                    } else {
                      setLoadingBtn(true);
                      for (let i = 0; i < selectedCards.length; i++) {
                        await DataStore.save(
                          new FacilityNotificationTable({
                            imageURL: "",
                            title: notificationTitle,
                            content: notificationContent,
                            navigationScreen: "NotificationScreen",
                            navigationData: {
                              id: "",
                            },
                            visited: false,
                            visitNotification: false,
                            notificationDotTypeColor: "blue",
                            facilityTableID: selectedCards[i]?.id,
                            url: notificationURL,
                          })
                        );
                        await sendNewPushNotification({
                          expoPushToken: selectedCards[i]?.mobileId,
                          job: notificationTitle,
                          typeMessage: notificationContent,
                          screen: "NotificationScreen",
                        });
                      }
                      setViewModel(false);
                      setNotificationTitle("");
                      setNotificationContent("");
                      setNotificationURL("");
                      setSelected(false);
                      setSelectedCards([]);
                      setLoadingBtn(false);
                    }
                  }
                }}
                style={{
                  backgroundColor: "#006002",
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
                  {loadingBtn ? "Loading" : "Send"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={viewModelAll}
        onRequestClose={() => setViewModelAll(false)}
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
                Send Notification
              </Text>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Title <Text style={{ color: "red" }}>*</Text>
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
                  onChangeText={(text) => setNotificationTitle(text)}
                  value={notificationTitle}
                  keyboardType={"default"}
                  autoCapitalize="sentences"
                  placeholderTextColor="#b3b3b3"
                  placeholder={"Title"}
                />
                <View
                  style={{
                    height: 40,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {notificationTitle ? (
                    <TouchableOpacity
                      onPress={() => setNotificationTitle("")}
                      style={{ marginLeft: 3 }}
                    >
                      <Ionicons name="close-sharp" size={22} color="#808080" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Message <Text style={{ color: "red" }}>*</Text>
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
                  onChangeText={(text) => setNotificationContent(text)}
                  value={notificationContent}
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
                  {notificationContent ? (
                    <TouchableOpacity
                      onPress={() => setNotificationContent("")}
                      style={{ marginLeft: 3 }}
                    >
                      <Ionicons name="close-sharp" size={22} color="#808080" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                URL
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
                  onChangeText={(text) => setNotificationURL(text)}
                  value={notificationURL}
                  keyboardType={"default"}
                  autoCapitalize="sentences"
                  placeholderTextColor="#b3b3b3"
                  placeholder={"start with https://"}
                />
                <View
                  style={{
                    height: 40,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {notificationURL ? (
                    <TouchableOpacity
                      onPress={() => setNotificationURL("")}
                      style={{ marginLeft: 3 }}
                    >
                      <Ionicons name="close-sharp" size={22} color="#808080" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>

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
                  setViewModelAll(false);
                  setNotificationTitle("");
                  setNotificationContent("");
                  setSelectedCardsAll([]);
                  setNotificationURL("");
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
              <TouchableOpacity
                onPress={async () => {
                  if (!loadingBtn) {
                    if (
                      notificationTitle === "" &&
                      notificationContent === ""
                    ) {
                      Alert.alert("Please fill the title and content!");
                    } else if (
                      notificationTitle !== "" &&
                      notificationContent === ""
                    ) {
                      Alert.alert("Please fill the content!");
                    } else if (
                      notificationTitle === "" &&
                      notificationContent !== ""
                    ) {
                      Alert.alert("Please fill the title!");
                    } else {
                      setLoadingBtn(true);
                      for (let i = 0; i < selectedCardsAll.length; i++) {
                        await DataStore.save(
                          new FacilityNotificationTable({
                            imageURL: "",
                            title: notificationTitle,
                            content: notificationContent,
                            navigationScreen: "NotificationScreen",
                            navigationData: {
                              id: "",
                            },
                            visited: false,
                            visitNotification: false,
                            notificationDotTypeColor: "blue",
                            facilityTableID: selectedCardsAll[i]?.id,
                            url: notificationURL,
                          })
                        );
                        await sendNewPushNotification({
                          expoPushToken: selectedCardsAll[i]?.mobileId,
                          job: notificationTitle,
                          typeMessage: notificationContent,
                          screen: "NotificationScreen",
                        });
                      }
                      setViewModelAll(false);
                      setNotificationTitle("");
                      setNotificationContent("");
                      setNotificationURL("");
                      setSelectedCardsAll([]);
                      setLoadingBtn(false);
                    }
                  }
                }}
                style={{
                  backgroundColor: "#006002",
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
                  {loadingBtn ? "Loading" : "Send"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Facility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
