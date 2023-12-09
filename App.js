import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import config from "./src/aws-exports";
import { Amplify, Auth, Hub, DataStore } from "aws-amplify";
import { Text, View } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Organisation } from "./src/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppFacilityContainer from "./src/navigation/facilityNavigation";
import AppAuthContainer from "./src/navigation/authnavigation";
import { useNetInfo } from "@react-native-community/netinfo";
import { Feather } from "@expo/vector-icons";
import "@azure/core-asynciterator-polyfill";

Amplify.configure(config);

export default function App() {
  const [user, setUser] = useState(undefined);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const netInfo = useNetInfo();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (authUser) {
        const organisationData = await DataStore.query(Organisation, (item) =>
          item.emailId.eq(authUser?.attributes?.email)
        );
        await AsyncStorage.setItem("userId", organisationData[0]?.id);
        setUser(organisationData[0]);
        setLoadingScreen(false);
      }
    } catch (error) {
      setUser(undefined);
      setLoadingScreen(false);
    }
  };

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };
    Hub.listen("auth", listener);
    return () => {
      Hub.remove("auth", listener);
    };
  }, []);

  console.log("App.js", user?.mobileId, user?.emailId);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="default" />
      {netInfo.isConnected ? (
        <ActionSheetProvider>
          {loadingScreen ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#fff",
                alignItems: "center",
              }}
            >
              <Text>Loading...</Text>
            </View>
          ) : user !== undefined ? (
            <AppFacilityContainer userId={user?.id} />
          ) : (
            <AppAuthContainer />
          )}
        </ActionSheetProvider>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="wifi-off" size={24} color="black" />
          <Text>Your are Offline</Text>
          <Text>check your connection</Text>
        </View>
      )}
    </SafeAreaProvider>
  );
}

// AppRegistry.registerComponent("MyApp", () => App);
