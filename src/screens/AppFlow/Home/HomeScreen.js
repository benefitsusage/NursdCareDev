import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Pressable
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  OrganisationNotificationTable,
  Organisation,
  FacilityTable,
  NurseTable,
} from "../../../models";
import { DataStore, SortDirection } from "aws-amplify";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";
import OrganizationCard from "./Card/OrganizationCard";

const HomeScreen = (props) => {
  console.log("HomeScreen", props?.userId);
  const [userId, setUserId] = useState(props?.userId);
  const [loading, setLoading] = useState(undefined);
  const [organisationData, setOrganisationData] = useState(undefined);
  const [notificationData, setNotificationData] = useState(undefined);
  const responseListener = useRef();
  const [token, setToken] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const onJobDetailNavigate = (d) => {
    props?.navigation?.navigate("JobDetailsScreen", {
      data: d,
    });
  };

  const onChatRoomNavigate = (d) => {
    props?.navigation?.navigate("ChatRoomScreen", {
      data: d,
    });
  };

  const onNavigateScreen = (d) => {
    props?.navigation?.navigate(d);
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      if (existingStatus === "denied") {
        console.log("existingStatus", existingStatus);
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === "denied") {
          setNotificationStatus(existingStatus);
          console.log("finalStatus", existingStatus);
          Alert.alert("Failed to get push token for push notification!");
          return;
        }
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response.notification.request.content.data) {
          const screen = response.notification.request.content.data?.screen;
          if (screen === "JobDetailScreen") {
            const id = response.notification.request.content.data;
            onJobDetailNavigate({ id: id?.jobId });
          } else if (screen === "ChatRoomScreen") {
            const id = response.notification.request.content.data;
            onChatRoomNavigate({
              nurseId: id?.nurseId,
              facilityId: id?.facilityId,
            });
          } else {
            onNavigateScreen(screen?.toString());
          }
        }
      });
    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //Organisation Detail
  const getOrganisationDetail = async (id) => {
    try {
      const organisationData = await DataStore.query(Organisation, (item) =>
        item.id.eq(id)
      );
      setOrganisationData(organisationData[0]);
      setLoadingScreen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrganisationNotification = async (id) => {
    try {
      const organisationData = await DataStore.query(
        OrganisationNotificationTable,
        (item) => item.organisationTableID.eq(id), {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
        page: 0,
        limit: 10,
      }
      );
      setNotificationData(organisationData?.filter((item) => !item.visited).length);
    } catch (error) {
      console.log("data save error:", error);
    }
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: "#FFF",
        borderBottomWidth: 0,
      },
      headerTitleAlign: "center",
      headerLeft: () => (
        <Image
          source={require("../../../../assets/login/NURSD-Flow.png")}
          style={{
            marginLeft: 0,
            width: 82,
            marginBottom: 0,
            height: 32,
          }}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("NotificationScreen")}
        >
          {notificationData > 0 && (

            <View
              style={{
                backgroundColor: "#006002",
                borderRadius: 100,
                width: 10,
                height: 10,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                zIndex: 1,
                right: 22,
                bottom: 15,
              }}
            />

          )}
          <Ionicons
            name="ios-notifications-outline"
            color={"#333333"}
            size={24}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
      headerTitle: (props) => (
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Organization Hub
          </Text>
        </View>
      ),
    });
  });

  useEffect(() => {
    if (userId !== undefined) {
      getOrganisationDetail(userId);
      getOrganisationNotification(userId);
      registerForPushNotificationsAsync().then((token) => setToken(token));
    }
  }, [userId]);

  const updateNotification = async () => {
    if (notificationStatus === "denied") {
      Alert.alert(
        "Give permission and Restart the app.",
        "Open app setting and turn on notification."
      );
    } else {
      setLoadingBtn(true);
      try {
        const res = await DataStore.save(
          Organisation.copyOf(organisationData, (updatedItem) => {
            updatedItem.mobileId = token;
          })
        );
        console.log(res);
        if (res.mobileId === token) {
          setLoading(false);
          setLoadingBtn(false);
          setLoadingScreen(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (organisationData !== undefined && token !== "") {
      if (
        organisationData?.mobileId === "" ||
        organisationData?.mobileId === null ||
        organisationData?.mobileId === undefined
      ) {
        // console.log(organisationData?.mobileId);
        setLoading(true);
      } else if (organisationData?.mobileId !== token) {
        // console.log(organisationData?.mobileId, token);
        setLoading(true);
      } else if (organisationData?.mobileId === token) {
        // console.log(organisationData?.mobileId, token);
        setLoading(false);
      }
    }
  }, [organisationData, token]);

  useEffect(() => {
    const subscription = DataStore.observe(Organisation).subscribe((msg) => {
      if (msg.model === Organisation && msg.opType === "UPDATE") {
        console.log("HomeScreen Organisation", msg.opType);
        getOrganisationDetail(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  useEffect(() => {
    const subscription = DataStore.observe(NurseTable).subscribe((msg) => {
      if (userId !== undefined) {
        if (msg.model === NurseTable && msg.opType === "INSERT") {
          getOrganisationDetail(userId);
        }
        if (msg.model === NurseTable && msg.opType === "UPDATE") {
          console.log("HomeScreen NurseTable", msg.opType);
          getOrganisationDetail(userId);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  useEffect(() => {
    const subscription = DataStore.observe(FacilityTable).subscribe((msg) => {
      if (userId !== undefined) {
        if (msg.model === FacilityTable && msg.opType === "INSERT") {
          getOrganisationDetail(userId);
        }
        if (msg.model === FacilityTable && msg.opType === "UPDATE") {
          console.log("HomeScreen FacilityTable", msg.opType);
          getOrganisationDetail(userId);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  useEffect(() => {
    const subscription = DataStore.observe(
      OrganisationNotificationTable,
      (item) => item.organisationTableID.eq(userId)
    ).subscribe((msg) => {
      if (
        msg.model === OrganisationNotificationTable &&
        msg.opType === "INSERT"
      ) {
        console.log("OrganisationNotificationTable", msg.opType);
        getOrganisationNotification(userId);
      }
      if (
        msg.model === OrganisationNotificationTable &&
        msg.opType === "UPDATE"
      ) {
        console.log("HomeScreen OrganisationNotificationTable", msg.opType);
        getOrganisationNotification(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  const onNavigate = (d) => {
    props?.navigation?.navigate("OrganizationDetailsScreen", {
      data: d,
    });
  };

  return (
    <View style={styles.container}>
      {loadingScreen ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : loading === undefined ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15 }}>
            Sync Notifications to receive updates
          </Text>

          <Pressable
            style={{
              backgroundColor: "#006002",
              borderRadius: 5,
              height: 30,
              width: 100,
              marginTop: 10,
              justifyContent: "center",
            }}
            onPress={() => updateNotification()}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                fontSize: 15,
                color: "#fff",
              }}
            >
              {loadingBtn ? "Loading..." : "Update now"}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 18, color: "#006002" }}>
              Welcome Back{" "}
              <Text style={{ fontWeight: "700", fontSize: 12, color: "#000" }}>
                {organisationData?.organisationName}
              </Text>
            </Text>
          </View>

          {organisationData?.locations?.map((item, index) => {
            return (
              <OrganizationCard
                key={index}
                item={item}
                organisationData={organisationData}
                onNavigate={onNavigate}
                organisationName={organisationData?.organisationName}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});



