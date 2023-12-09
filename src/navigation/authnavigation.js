import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/AuthFlow//MainLogin/LoginScreen";
import HospitalProfile from "../screens/AuthFlow/HospitalProfile/HospitalProfile";

const Stack = createStackNavigator();

//Other Screen Navigator
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 14,
          textAlign: "center",
          alignSelf: "center",
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#4a7bd0",
        },
        headerRight: () => <View />,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="RegisterScreen" component={HospitalProfile} />
      <Stack.Screen name="HospitalProfileScreen" component={HospitalProfile} />
    </Stack.Navigator>
  );
};

//ios
const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      {/* <Stack.Screen name="Landing" component={LandingNavigator} /> */}
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppAuthContainer = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default AppAuthContainer;
