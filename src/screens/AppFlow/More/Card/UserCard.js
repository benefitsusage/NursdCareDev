import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { S3Image } from "aws-amplify-react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendNewPushNotification } from "../../../../utils/notification";
import { NurseNotificationTable } from "../../../../models";
import { DataStore } from "aws-amplify";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const UserCard = ({
  element,
  onUserDetailNavigate,
  onChatRoomNavigate,
  userId,
  onSelectPress,
  selectedCards,
  selected,
}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureCategory, setTemperatureCategory] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationURL, setNotificationURL] = useState("");

  const API_KEY = "60e15448320d2913356dc3e37fd4abf4";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${element?.primaryState}&appid=${API_KEY}`;

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.log(err));
  }, [URL]);

  const useLoopingAnimation = (screenWidth, duration) => {
    const fromValue = screenWidth;
    const toValue = -screenWidth;
    const animatedValue = useRef(new Animated.Value(fromValue)).current;

    useEffect(() => {
      const loopAnimation = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: fromValue,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };

      loopAnimation();

      return () => {
        animatedValue.stopAnimation();
      };
    }, [animatedValue, duration, fromValue, toValue]);

    return animatedValue;
  };

  useEffect(() => {
    const temperatureInKelvin = weatherData?.main?.temp;
    const temperatureInCelsius = (temperatureInKelvin - 273.15).toFixed(1);

    if (temperatureInCelsius < 0) {
      setTemperatureCategory("extremely cold");
    } else if (temperatureInCelsius < 10) {
      setTemperatureCategory("very cold");
    } else if (temperatureInCelsius < 20) {
      setTemperatureCategory("cold");
    } else if (temperatureInCelsius < 25) {
      setTemperatureCategory("cool");
    } else if (temperatureInCelsius < 30) {
      setTemperatureCategory("mild");
    } else if (temperatureInCelsius < 35) {
      setTemperatureCategory("warm");
    } else {
      setTemperatureCategory("hot");
    }
  }, [weatherData]);

  const animatedTextPosition = useLoopingAnimation(width, 40000);

  const isSelected = selectedCards?.some((item) => item?.id === element?.id);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          selected
            ? onSelectPress()
            : onUserDetailNavigate({
              id: element?.id,
            })
        }
        style={{
          backgroundColor: isSelected ? "#f2f2f2" : "#fff",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#2775BD",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              width: 45,
              height: 45,
              overflow: "hidden",
            }}
          >
            {element?.profileImage ? (
              <S3Image
                imgKey={element?.profileImage}
                style={{
                  width: 43,
                  height: 43,
                  borderRadius: 10,
                  // aspectRatio: 4 / 3,
                }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../../../../../assets/images/icon.jpg")}
                style={{ width: 80, height: 80 }}
              />
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                marginLeft: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text>
                {element?.firstName} {element?.lastName}
              </Text>
              <Text
                style={{ color: "#8d8d8d", fontWeight: "600", fontSize: 12 }}
              >
                {element?.primaryState}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* <TouchableOpacity
            onPress={() =>
              onChatRoomNavigate({
                chatRoomId: "",
                nurseId: element?.id,
                facilityId: userId,
              })
            }
            style={{
              backgroundColor: "#ddd",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: "#000", fontWeight: "600", fontSize: 12 }}>
              Message
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setViewModel(true)}
            style={{
              backgroundColor: "#006002",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
              Announcement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setViewModel(true);
              setNotificationTitle("Weather Alert");
            }}
            style={{
              backgroundColor: "red",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
              Weather Alert
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            margin: 10,
          }}
        >
          {weatherData !== undefined && (
            <View style={{ flexDirection: "row", width: width + 500 }}>
              <Animated.View
                style={{ transform: [{ translateX: animatedTextPosition }] }}
              >
                <Text
                  style={{
                    color: "#8d8d8d",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Temperature: {temperatureCategory}(
                  {((weatherData?.main?.temp - 273.15) * 1.8 + 32).toFixed(1)}
                  °F) , Humidity: {weatherData?.main?.humidity} , Description:{" "}
                  {weatherData?.weather[0].description}
                </Text>
              </Animated.View>
            </View>
          )}
        </View>
        <View
          style={{
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: "lightgray",
            marginHorizontal: 5,
          }}
        />
      </TouchableOpacity>
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
                      await DataStore.save(
                        new NurseNotificationTable({
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
                          nursetableID: element?.id,
                          url: notificationURL,
                        })
                      );
                      await sendNewPushNotification({
                        expoPushToken: element?.mobileId,
                        job: notificationTitle,
                        typeMessage: notificationContent,
                        screen: "NotificationScreen",
                      });
                      setViewModel(false);
                      setNotificationTitle("");
                      setNotificationContent("");
                      setNotificationURL("");
                      setLoadingBtn(true);
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

export default UserCard;
