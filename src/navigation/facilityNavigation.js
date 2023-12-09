import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
//Icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// Style
import { GlobalStyles } from "../utils/GlobalStyles";
//Screens
import MoreScreen from "../screens/AppFlow/More/MoreScreen";
import HomeScreen from "../screens/AppFlow/Home/HomeScreen";
import NotificationScreen from "../screens/AppFlow/Notification/NotificationScreen";
import NotificationScreenFacility from "../screens/AppFlow/Facility/Notification/NotificationScreen";
import NotificationScreenNurse from "../screens/AppFlow/User/Notification/NotificationScreen";
import ProfileScreen from "../screens/AppFlow/More/Profile";
import SettingScreen from "../screens/AppFlow/More/Setting";
import ContactScreen from "../screens/AppFlow/More/Contact";
import TermsAndConditionsScreen from "../screens/AppFlow/More/TermsAndConditions";
import PrivacyPolicyScreen from "../screens/AppFlow/More/PrivacyPolicy";
import AppInfo from "../screens/AppFlow/More/AppInfo";
import EditProfileForm from "../screens/AppFlow/More/Profile/EditProfileForm";
import SettingNotification from "../screens/AppFlow/More/Setting/Notification";
import SettingChangePassword from "../screens/AppFlow/More/Setting/ChangePassword";
import ContactContactUs from "../screens/AppFlow/More/Contact/ContactUs";
import ContactTechnicalSupport from "../screens/AppFlow/More/Contact/TechnicalSupport";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import JobDetailsScreen from "../screens/AppFlow/JobDetails/JobDetailsScreen";
import UserDetailsScreen from "../screens/AppFlow/User/UserDetails";
import FacilityDetailsScreen from "../screens/AppFlow/Facility/UserDetails";
import TemplateDetailsScreen from "../screens/AppFlow/JobDetails/TemplateDetailsScreen";
import ManagePage from "../screens/AppFlow/Manage/ManagePage";
import ManageUser from "../screens/AppFlow/Manage/ManageUser";
import ManageJob from "../screens/AppFlow/Manage/ManageJob";
import CompletedJobs from "../screens/AppFlow/Jobs/CompletedJobs";
import AcceptedJobs from "../screens/AppFlow/Jobs/AcceptedJobs";
import PendingAssignment from "../screens/AppFlow/Jobs/PendingAssignment";
import OpenJobs from "../screens/AppFlow/Jobs/OpenJobs";
import InProgress from "../screens/AppFlow/Jobs/InProgress";
import UnFullFiled from "../screens/AppFlow/Jobs/UnFullFiled";
import PendingJobs from "../screens/AppFlow/Jobs/PendingJobs";
import PendingReview from "../screens/AppFlow/Jobs/PendingReview";
import ManageJobShift from "../screens/AppFlow/Jobs/ManageJobShift";
import NoShowShift from "../screens/AppFlow/Jobs/NoShowShift";
import CompletedJobsVisit from "../screens/AppFlow/Jobs/Visit/CompletedJobsVisit";
import AcceptedJobsVisit from "../screens/AppFlow/Jobs/Visit/AcceptedJobsVisit";
import PendingAssignmentVisit from "../screens/AppFlow/Jobs/Visit/PendingAssignmentVisit";
import OpenJobsVisit from "../screens/AppFlow/Jobs/Visit/OpenJobsVisit";
import InProgressVisit from "../screens/AppFlow/Jobs/Visit/InProgressVisit";
import UnFullFiledVisit from "../screens/AppFlow/Jobs/Visit/UnFullFiledVisit";
import ManageJobVisit from "../screens/AppFlow/Jobs/Visit/ManageJobVisit";
import NoShowVisit from "../screens/AppFlow/Jobs/Visit/NoShowVisit";
import PendingJobsVisit from "../screens/AppFlow/Jobs/Visit/PendingJobsVisit";
import PendingReviewVisit from "../screens/AppFlow/Jobs/Visit/PendingReviewVisit";
import ManageTemplate from "../screens/AppFlow/Manage/ManageTemplate";
import RegisterApproveScreen from "../screens/AppFlow/Home/RegisterApprove";
import AnnouncementScreen from "../screens/AppFlow/More/Announcement/Announcement";
import MyPaymentsScreen from "../screens/AppFlow/More/MyPayments/MyPayments";
import OrganizationDetailsScreen from "../screens/AppFlow/Home/OrganizationDetails";
import CreateNurseScreen from "../screens/AppFlow/Home/CreateUser/CreateNurse";
import CreateFacilityScreen from "../screens/AppFlow/Home/CreateUser/CreateFacility";
import DocumentScreen from "../screens/AppFlow/User/DocumentScreen";
import ReferenceScreen from "../screens/AppFlow/User/ReferenceScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Get User ID

const MoreScreenStack = (props) => {
  let userId = props?.userId;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MoreScreen">
        {(props) => <MoreScreen {...props} userId={userId} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const HomeScreenStack = (props) => {
  // console.log("HomeScreenStack", props?.userId);
  let userId = props?.userId;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="HomeScreen">
        {(props) => <HomeScreen {...props} userId={userId} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const colorFacility = "#006002";

//Bottom Tab Navigator for both iOS & Android
const TabNavigator = (props) => {
  // console.log("TabNavigator", props?.userId);
  let userId = props?.userId;
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 60,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  marginTop: Platform.OS === "ios" ? 30 : 0,
                  height: 60,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Octicons
                  name="home"
                  size={focused ? 28 : 24}
                  color={focused ? "#000" : "#808080"}
                />
              </View>
            ),
          }}
        >
          {(props) => <HomeScreenStack {...props} userId={userId} />}
        </Tab.Screen>
        <Tab.Screen
          name="ManagePage"
          component={ManagePage}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#FFF",
              borderBottomWidth: 0,
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <Image
                source={require("../../assets/login/NURSD-Flow.png")}
                style={{
                  marginLeft: 0,
                  width: 82,
                  marginBottom: 0,
                  height: 32,
                }}
              />
            ),
            headerTitle: (props) => (
              <View style={GlobalStyles.headerTitleView}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Manage
                </Text>
              </View>
            ),
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  marginTop: Platform.OS === "ios" ? 30 : 0,
                  height: 35,
                  width: 35,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colorFacility,
                  borderRadius: 100,
                }}
              >
                <MaterialIcons name="add" size={30} color={"#fff"} />
              </View>
              // </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen
          name="More"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#FFF",
              borderBottomWidth: 0,
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <Image
                source={require("../../assets/login/NURSD-Flow.png")}
                style={{
                  marginLeft: 0,
                  width: 82,
                  marginBottom: 0,
                  height: 32,
                }}
              />
            ),
            headerTitle: (props) => (
              <View style={GlobalStyles.headerTitleView}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Menu
                </Text>
              </View>
            ),
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  marginTop: Platform.OS === "ios" ? 30 : 0,
                  height: 60,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo
                  name="menu"
                  size={focused ? 28 : 24}
                  color={focused ? "#000" : "#808080"}
                />
              </View>
            ),
          }}
        >
          {(props) => <MoreScreenStack {...props} userId={userId} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

//Other Screen Navigator
const MainNavigator = (props) => {
  // console.log("MainNavigator", props?.userId);
  let userId = props?.userId;
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
      <Stack.Screen name="Nav" options={{ headerShown: false }}>
        {(props) => <TabNavigator {...props} userId={userId} />}
      </Stack.Screen>

      <Stack.Screen
        name="ProfileScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ProfileScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="EditProfileForm"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Edit Details
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <EditProfileForm {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="SettingScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <SettingScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ContactScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Contact
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ContactScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="TermsAndConditionsScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Terms & Conditions
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <TermsAndConditionsScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="PrivacyPolicyScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Privacy Policy
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <PrivacyPolicyScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="AppInfo"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                App Info
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <AppInfo {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="SettingNotification"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Notifications
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <SettingNotification {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="SettingChangePassword"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Change Password
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <SettingChangePassword {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ContactContactUs"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Contact Us
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ContactContactUs {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ContactTechnicalSupport"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Technical Support
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ContactTechnicalSupport {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="NotificationScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Notifications
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <NotificationScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="NotificationScreenFacility"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Notifications
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <NotificationScreenFacility {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="NotificationScreenNurse"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Notifications
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <NotificationScreenNurse {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="JobDetailsScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Job Details
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <JobDetailsScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="UserDetailsScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Employee Details
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <UserDetailsScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="FacilityDetailsScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Manager Dashboard
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <FacilityDetailsScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="TemplateDetailsScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Template Details
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <TemplateDetailsScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ManageUser"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Manage Users
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ManageUser {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ManageJob"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Manage Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ManageJob {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ManageTemplate"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Manage Templates
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ManageTemplate {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ManageJobShift"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Manage Shift Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ManageJobShift {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="NoShowShift"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                No Show
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <NoShowShift {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="CompletedJobs"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Completed Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <CompletedJobs {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="AcceptedJobs"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Assigned Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <AcceptedJobs {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="PendingAssignment"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pending Assignment
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <PendingAssignment {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="OpenJobs"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Open Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <OpenJobs {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="InProgress"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                In-Progress
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <InProgress {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="UnFullFiled"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Unfulfilled Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <UnFullFiled {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="PendingJobs"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pending Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <PendingJobs {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="PendingReview"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pending Approvals
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <PendingReview {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ManageJobVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Manage Visit Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ManageJobVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="CompletedJobsVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Completed Job
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <CompletedJobsVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="AcceptedJobsVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Assigned Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <AcceptedJobsVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="NoShowVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                No Show
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <NoShowVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="PendingJobsVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pending Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <PendingJobsVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="PendingReviewVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pending Approvals
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <PendingReviewVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="PendingAssignmentVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pending Assignments
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <PendingAssignmentVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="OpenJobsVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Open Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <OpenJobsVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="InProgressVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                In-Progress
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <InProgressVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="UnFullFiledVisit"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Unfulfilled Jobs
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <UnFullFiledVisit {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="AnnouncementScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Announcements
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <AnnouncementScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="RegisterApproveScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Approvals
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <RegisterApproveScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="MyPaymentsScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                My Payments
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <MyPaymentsScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="OrganizationDetailsScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Location Hub
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <OrganizationDetailsScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="CreateNurseScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Create Nurse
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <CreateNurseScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="CreateFacilityScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Create Manager
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <CreateFacilityScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="DocumentScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Document
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <DocumentScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="ReferenceScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={28}
                  color="#808080"
                />

                <Image
                  source={require("../../assets/login/NURSD-Flow.png")}
                  style={{
                    marginLeft: 0,
                    width: 82,
                    marginBottom: 0,
                    height: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => (
            <View style={GlobalStyles.headerTitleView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Reference
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <ReferenceScreen {...props} userId={userId} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

//ios
const Navigator = ({ userId }) => {
  // console.log("Navigation", userId);
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" options={{ headerShown: false }}>
        {(props) => <MainNavigator {...props} userId={userId} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AppContainer = ({ userId }) => {
  return (
    <NavigationContainer>
      <Navigator userId={userId} />
    </NavigationContainer>
  );
};

export default AppContainer;
