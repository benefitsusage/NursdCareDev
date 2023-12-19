import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import CustomInput from "../../../../customComponents/Input/CustomInput";
import AuthButton from "../../../../customComponents/Button/AuthButton";
import CustomDropdown from "../../../../customComponents/DropDown/CustomDropdown";
import CustomDropdownObj from "../../../../customComponents/DropDown/CustomDropdownObj";
import { Auth, DataStore } from "aws-amplify";
import { NurseTable } from "../../../../models";
import AutoFillAddress from "./AutoFillAddress";
import {
  specialty,
  primaryLicenseType,
  USAState,
} from "../../../../utils/defaultData";
import moment from "moment";
import { DateString } from "../../../../utils/function";

const CreateNurse = (props) => {
  const { width, height } = Dimensions.get("window");
  const SCREEN_WIDTH = width < height ? width : height;

  const [nurseState, setNurseState] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    gender: "Male",
    dateOfBirth: new Date(),
    primaryState: "",
    primaryLicenseType: "",
    primaryLicenseMultiPrivilege: false,
    clinicalLicenseNumber: "",
    clinicalLicenseExpirationDate: new Date(),
    registeredWithAn: "Employer",
    employeeId: "",
    employeeName: "",
    profileImage: "",
    password: "",
  });
  const [specialtyArr, setSpecialtyArr] = useState([]);
  const [showCalendarDOB, setShowCalendarDOB] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullAddress: "",
    latitude: "",
    longitude: "",
  });
  const [showAddress, setShowAddress] = useState(false);
  const [showPrimaryLicenseState, setShowPrimaryLicenseState] = useState(false);
  const [showSpecialty, setShowSpecialty] = useState(false);
  const [showPrimaryLicenseType, setShowPrimaryLicenseType] = useState(false);

  const handleAddSpecialty = (item) => {
    setSpecialtyArr([...specialtyArr, item]);
  };

  const handleRemoveSpecialty = (index) => {
    const updatedSpecialty = [...specialtyArr];
    updatedSpecialty.splice(index, 1);
    setSpecialtyArr(updatedSpecialty);
  };

  //Register
  const signUp = async (username, password) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signUp({ username, password });

      await DataStore.save(
        new NurseTable({
          firstName: nurseState.firstName,
          lastName: nurseState.lastName,
          emailId: nurseState.emailId,
          phoneNumber: nurseState.phoneNumber,
          gender: nurseState.gender,
          dateOfBirth: nurseState.dateOfBirth.toString(),
          primaryState: nurseState.primaryState,
          primaryLicenseType: nurseState.primaryLicenseType,
          primaryLicenseMultiPrivilege: nurseState.primaryLicenseMultiPrivilege,
          clinicalLicenseNumber: nurseState.clinicalLicenseNumber,
          clinicalLicenseExpirationDate:
            nurseState.clinicalLicenseExpirationDate.toString(),
          specialty: specialtyArr,
          registeredWithAn: nurseState.registeredWithAn,
          employeeId: nurseState.employeeId,
          employeeName: nurseState.employeeName,
          certificationDetails: [],
          educationDetails: [],
          skills: [],
          fullAddress: address.fullAddress,
          latitude: address.latitude.toString(),
          longitude: address.longitude.toString(),
          currentLatitude: "",
          currentLongitude: "",
          EMRorEHRExperience: [],
          workExperienceDetails: [],
          uploadDocuments: [],
          jobPreferences: {
            days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            duration: [],
            timing: ["Morning", "Afternoon", "Evening", "Night"],
            minDistance: "1",
            maxDistance: "100",
            minRate: "1",
            maxRate: "100",
            notLicensedStateHideJobs: true,
            showJobs: "Both",
            preferenceOption: true,
          },
          profileImage: nurseState.profileImage,
          emailVerified: true,
          mobileId: "",
          nurseVerified: false,
          nurseLoginControl: true,
          organization: props?.route?.params?.data?.organization,
          location_id: props?.route?.params?.data?.location_id,
          nurseAppAccessControl: false,
          password: password
        })
      );

      Alert.alert("Success", "Register successfully.");
      props.navigation.goBack();
    } catch (error) {
      console.log("error signing up", error);
    }
    setLoading(false);
  };

  const currentDate = moment();

  const isPastDate = (date) => {
    return date.isBefore(currentDate, "day");
  };

  const disabledDates = (date) => {
    return isPastDate(date);
  };

  const disabledDatesTextStyle = { color: "#CCCCCC" };

  const disabledDatesDOB = (date) => {
    return !isPastDate(date);
  };

  const disabledDatesTextStyleDOB = { color: "#CCCCCC" };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginHorizontal: 10,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "#2775BD",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                width: 100,
                height: 100,
              }}
            >
              <Image
                source={require("../../../../../assets/login/upload-profile.png")}
                style={{ width: 85, height: 85 }}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <CustomInput
              label={"First Name"}
              required={true}
              onChangeText={(text) =>
                setNurseState({ ...nurseState, firstName: text })
              }
              keyboardType={"default"}
              placeholder={"First Name"}
              value={nurseState.firstName}
              clearValue={() => setNurseState({ ...nurseState, firstName: "" })}
              labelStyle={{
                marginHorizontal: 10,
              }}
              viewStyle={{
                width: width / 2.3,
                height: 40,
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
              textInputStyle={{
                width: width / 2.9,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 12,
              }}
              iconStyle={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
            <CustomInput
              label={"Last Name"}
              required={true}
              onChangeText={(text) =>
                setNurseState({ ...nurseState, lastName: text })
              }
              keyboardType={"default"}
              placeholder={"Last Name"}
              value={nurseState.lastName}
              clearValue={() => setNurseState({ ...nurseState, lastName: "" })}
              labelStyle={{
                marginHorizontal: 10,
              }}
              viewStyle={{
                width: width / 2.3,
                height: 40,
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
              textInputStyle={{
                width: width / 2.9,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 12,
              }}
              iconStyle={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <CustomInput
              label={"Email ID"}
              required={true}
              onChangeText={(text) =>
                setNurseState({ ...nurseState, emailId: text })
              }
              keyboardType={"email-address"}
              placeholder={"Email"}
              value={nurseState.emailId}
              clearValue={() => setNurseState({ ...nurseState, emailId: "" })}
              labelStyle={{
                marginHorizontal: 10,
              }}
              viewStyle={{
                width: width / 2.3,
                height: 40,
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
              textInputStyle={{
                width: width / 2.9,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 12,
              }}
              iconStyle={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
            <CustomInput
              label={"Phone Number"}
              required={true}
              onChangeText={(text) =>
                setNurseState({ ...nurseState, phoneNumber: text })
              }
              keyboardType={"number-pad"}
              placeholder={"Phone Number"}
              value={nurseState.phoneNumber}
              clearValue={() =>
                setNurseState({ ...nurseState, phoneNumber: "" })
              }
              labelStyle={{
                marginHorizontal: 10,
              }}
              viewStyle={{
                width: width / 2.3,
                height: 40,
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
              textInputStyle={{
                width: width / 2.9,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 12,
              }}
              iconStyle={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
              flex: 1,
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 12,
                  color: "#737373",
                }}
              >
                Gender
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 10,
                  elevation: 1,
                  height: 40,
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    backgroundColor: "#f2f2f2",
                    borderRadius: 10,
                    height: 40,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                  onPress={() => setShowGender(true)}
                >
                  <Text style={{ fontSize: 13, color: "#737373" }}>
                    {nurseState.gender}
                  </Text>
                  <MaterialIcons
                    name={"keyboard-arrow-down"}
                    size={24}
                    color="#808080"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginLeft: 20,
                flex: 1,
              }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 12,
                  color: "#737373",
                }}
              >
                DOB
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 10,
                  flex: 1,
                  elevation: 1,
                  height: 40,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
                onPress={() => setShowCalendarDOB(!showCalendarDOB)}
              >
                <Text style={{ textAlign: "center", color: "#737373" }}>
                  {DateString(nurseState.dateOfBirth)}
                </Text>
                <Ionicons name="calendar" size={24} color="#808080" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 10, flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#737373",
                }}
              >
                Primary State <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderColor: "#e6e6e6",
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
              onPress={() => setShowPrimaryLicenseState(true)}
            >
              <Text style={{ fontSize: 12, color: "#737373" }}>
                {nurseState?.primaryState === ""
                  ? "Select State"
                  : nurseState?.primaryState}
              </Text>
              <MaterialIcons
                name={"keyboard-arrow-down"}
                size={24}
                color="#b3b3b3"
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 10, flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#737373",
                }}
              >
                Primary License Type <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderColor: "#e6e6e6",
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
              onPress={() => setShowPrimaryLicenseType(true)}
            >
              <Text style={{ fontSize: 12, color: "#737373" }}>
                {nurseState?.primaryLicenseType === ""
                  ? "Select LicenseType"
                  : nurseState?.primaryLicenseType}
              </Text>
              <MaterialIcons
                name={"keyboard-arrow-down"}
                size={24}
                color="#b3b3b3"
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 18, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#737373",
                  },
                ]}
              >
                Address
              </Text>
              <Text style={{ color: "red" }}>*</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 10,
                  elevation: 1,
                  height: 40,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
                onPress={() => setShowAddress(true)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#737373",
                  }}
                >
                  {address.fullAddress !== ""
                    ? address.fullAddress
                    : "Enter Address"}
                </Text>
                <MaterialIcons name={"add"} size={24} color="#808080" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                width: width / 1.1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
                paddingRight: 5,
              }}
            >
              <Text>Primary License has multistate privilege</Text>
              <TouchableOpacity
                onPress={() =>
                  setNurseState({
                    ...nurseState,
                    primaryLicenseMultiPrivilege:
                      !nurseState.primaryLicenseMultiPrivilege,
                  })
                }
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: nurseState.primaryLicenseMultiPrivilege
                    ? "#000"
                    : "#b3b3b3",
                  alignItems: "center",
                  marginRight: 5,
                  justifyContent: "center",
                  backgroundColor: nurseState.primaryLicenseMultiPrivilege
                    ? "#2775BD"
                    : "#00000000",
                }}
              >
                {nurseState.primaryLicenseMultiPrivilege ? (
                  <MaterialIcons name="done" size={15} color={"#fff"} />
                ) : (
                  <View style={{ height: 0, width: 0 }} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              marginTop: 10,
            }}
          >
            <CustomInput
              label={"Clinical License Information"}
              onChangeText={(text) =>
                setNurseState({ ...nurseState, clinicalLicenseNumber: text })
              }
              keyboardType={"default"}
              placeholder={"Enter License Number"}
              value={nurseState.clinicalLicenseNumber}
              clearValue={() =>
                setNurseState({ ...nurseState, clinicalLicenseNumber: "" })
              }
              labelStyle={{
                marginHorizontal: 10,
              }}
              viewStyle={{
                width: width / 2.3,
                height: 40,
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
              textInputStyle={{
                width: width / 2.9,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 12,
              }}
              iconStyle={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
            <View>
              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 10,
                  marginHorizontal: 10,
                  elevation: 1,
                  height: 40,
                  width: width / 2.3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
                onPress={() => setShowCalendar(!showCalendar)}
              >
                <Text style={{ textAlign: "center", color: "#737373" }}>
                  {moment(new Date()).format("MM-DD-YYYY") ===
                    moment(
                      new Date(nurseState.clinicalLicenseExpirationDate)
                    ).format("MM-DD-YYYY")
                    ? "Expiration Date"
                    : moment(
                      new Date(nurseState.clinicalLicenseExpirationDate)
                    ).format("MM-DD-YYYY")}
                </Text>
                <Ionicons name="calendar" size={24} color="#808080" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 10, flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#737373",
                }}
              >
                Specialty
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderColor: "#e6e6e6",
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
              onPress={() => setShowSpecialty(true)}
            >
              <Text style={{ fontSize: 12, color: "#737373" }}>
                Add Specialty
              </Text>
              <MaterialIcons
                name={"keyboard-arrow-down"}
                size={24}
                color="#b3b3b3"
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {specialtyArr?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      borderWidth: 1,
                      borderColor: "#e6e6e6",
                      backgroundColor: "#f2f2f2",
                      borderRadius: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#737373" }}>
                      {item}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveSpecialty(index)}
                    >
                      <MaterialIcons
                        name={"delete-outline"}
                        size={24}
                        color="#999"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>

          {/* <View
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  marginHorizontal: 20,
                  marginBottom: 5,
                  fontSize: 12,
                  color: "#737373",
                }}
              >
                Are you Registered with an ?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 10,
                  elevation: 1,
                  height: 40,
                  marginHorizontal: 20,
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20,
                  }}
                  onPress={() =>
                    nurseState.registeredWithAn === "Employer"
                      ? setNurseState({
                          ...nurseState,
                          registeredWithAn: "",
                        })
                      : setNurseState({
                          ...nurseState,
                          registeredWithAn: "Employer",
                        })
                  }
                >
                  <TouchableOpacity
                    onPress={() =>
                      nurseState.registeredWithAn === "Employer"
                        ? setNurseState({
                            ...nurseState,
                            registeredWithAn: "",
                          })
                        : setNurseState({
                            ...nurseState,
                            registeredWithAn: "Employer",
                          })
                    }
                    style={{
                      height: 18,
                      width: 18,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor:
                        nurseState.registeredWithAn === "Employer"
                          ? "#000"
                          : "#b3b3b3",
                      alignItems: "center",
                      marginRight: 5,
                      justifyContent: "center",
                      backgroundColor:
                        nurseState.registeredWithAn === "Employer"
                          ? "#2775BD"
                          : "#00000000",
                    }}
                  >
                    {nurseState.registeredWithAn === "Employer" ? (
                      <MaterialIcons name="done" size={15} color={"#fff"} />
                    ) : (
                      <View style={{ height: 0, width: 0 }} />
                    )}
                  </TouchableOpacity>
  
                  <Text style={{ color: "#737373", fontSize: 14 }}>Employer</Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() =>
                    nurseState.registeredWithAn === "Independent"
                      ? setNurseState({
                          ...nurseState,
                          registeredWithAn: "",
                        })
                      : setNurseState({
                          ...nurseState,
                          registeredWithAn: "Independent",
                        })
                  }
                >
                  <TouchableOpacity
                    onPress={() =>
                      nurseState.registeredWithAn === "Independent"
                        ? setNurseState({
                            ...nurseState,
                            registeredWithAn: "",
                          })
                        : setNurseState({
                            ...nurseState,
                            registeredWithAn: "Independent",
                          })
                    }
                    style={{
                      height: 18,
                      width: 18,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor:
                        nurseState.registeredWithAn === "Independent"
                          ? "#000"
                          : "#b3b3b3",
                      alignItems: "center",
                      marginRight: 5,
                      justifyContent: "center",
                      backgroundColor:
                        nurseState.registeredWithAn === "Independent"
                          ? "#2775BD"
                          : "#00000000",
                    }}
                  >
                    {nurseState.registeredWithAn === "Independent" ? (
                      <MaterialIcons name="done" size={15} color={"#fff"} />
                    ) : (
                      <View style={{ height: 0, width: 0 }} />
                    )}
                  </TouchableOpacity>
  
                  <Text style={{ color: "#737373", fontSize: 14 }}>
                    Independent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
  
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                marginTop: 10,
              }}
            >
              <CustomInput
                label={"Employer Information"}
                required={false}
                onChangeText={(text) =>
                  setNurseState({ ...nurseState, employeeId: text })
                }
                keyboardType={"default"}
                placeholder={"Employee ID"}
                value={nurseState.employeeId}
                clearValue={() =>
                  setNurseState({ ...nurseState, employeeId: "" })
                }
                labelStyle={{
                  marginHorizontal: 10,
                }}
                viewStyle={{
                  width: width / 2.3,
                  height: 40,
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
                textInputStyle={{
                  width: width / 2.9,
                  height: 40,
                  borderRadius: 10,
                  paddingLeft: 10,
                  fontSize: 12,
                }}
                iconStyle={{
                  height: 40,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              />
              <CustomInput
                onChangeText={(text) =>
                  setNurseState({ ...nurseState, employeeName: text })
                }
                keyboardType={"default"}
                placeholder={"Employee Name"}
                value={nurseState.employeeName}
                clearValue={() =>
                  setNurseState({ ...nurseState, employeeName: "" })
                }
                labelStyle={{
                  marginHorizontal: 10,
                }}
                viewStyle={{
                  width: width / 2.3,
                  height: 40,
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
                textInputStyle={{
                  width: width / 2.9,
                  height: 40,
                  borderRadius: 10,
                  paddingLeft: 10,
                  fontSize: 12,
                }}
                iconStyle={{
                  height: 40,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              />
            </View> */}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <CustomInput
              label={"Password"}
              required={true}
              value={nurseState.password}
              placeholder="Password"
              keyboardType={"default"}
              onChangeText={(text) =>
                setNurseState({ ...nurseState, password: text })
              }
              clearValue={() => setNurseState({ ...nurseState, password: "" })}
              labelStyle={{
                marginHorizontal: 0,
              }}
              viewStyle={{
                width: width / 1.1,
                height: 40,
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                elevation: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 0.5,
                borderColor: "#e6e6e6",
                paddingRight: 10,
                justifyContent: "space-between",
                marginTop: 0,
              }}
              textInputStyle={{
                width: width / 1.28,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 5,
                fontSize: 12,
              }}
              iconStyle={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 25,
          }}
        >
          <AuthButton
            name={loading ? "Loading..." : "Submit"}
            onPress={() =>
              loading
                ? null
                : nurseState.firstName === "" ||
                  nurseState.lastName === "" ||
                  nurseState.emailId === "" ||
                  nurseState.gender === "" ||
                  nurseState.phoneNumber === "" ||
                  nurseState.dateOfBirth.toString() === "" ||
                  nurseState.primaryState === "" ||
                  nurseState.primaryLicenseType === "" ||
                  nurseState.password === "" ||
                  address.fullAddress === ""
                  ? Alert.alert("Fill all required fields first")
                  : nurseState?.password?.length < 8
                    ? Alert.alert("At least enter 8 character")
                    : signUp(nurseState.emailId, nurseState.password)
            }
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showCalendarDOB}
          onRequestClose={() => setShowCalendarDOB(false)}
        >
          <View
            style={{
              height: height,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 20,
                justifyContent: "center",
                elevation: 5,
                borderRadius: 15,
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <CalendarPicker
                onDateChange={(date) =>
                  setNurseState({ ...nurseState, dateOfBirth: date })
                }
                selectedDayColor="#2775BD"
                selectedDayTextColor="#FFFFFF"
                initialDate={new Date()}
                disabledDates={disabledDatesDOB}
                disabledDatesTextStyle={disabledDatesTextStyleDOB}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowCalendarDOB(false)}
                  style={{
                    backgroundColor: "#2775BD",
                    marginHorizontal: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showCalendar}
          onRequestClose={() => setShowCalendar(false)}
        >
          <View
            style={{
              height: height,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 20,
                justifyContent: "center",
                elevation: 5,
                borderRadius: 15,
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <CalendarPicker
                onDateChange={(date) =>
                  setNurseState({
                    ...nurseState,
                    clinicalLicenseExpirationDate: date,
                  })
                }
                selectedDayColor="#2775BD"
                selectedDayTextColor="#FFFFFF"
                initialDate={nurseState.clinicalLicenseExpirationDate}
                disabledDates={disabledDates}
                disabledDatesTextStyle={disabledDatesTextStyle}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2775BD",
                    marginHorizontal: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => setShowCalendar(false)}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showGender}
          onRequestClose={() => setShowGender(false)}
        >
          <View
            style={{
              height: height,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 20,
                justifyContent: "center",
                elevation: 5,
                borderRadius: 15,
                borderColor: "rgba(0, 0, 0, 0.1)",
                paddingHorizontal: 50,
              }}
            >
              <CustomDropdown
                selectedValue={nurseState.gender}
                onValueChange={(itemValue) =>
                  setNurseState({ ...nurseState, gender: itemValue })
                }
                options={["Male", "Female", "Other"]}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2775BD",
                    marginHorizontal: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => setShowGender(false)}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showSpecialty}
          onRequestClose={() => setShowSpecialty(false)}
        >
          <View
            style={{
              height: height,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                height: 280,
                justifyContent: "center",
                elevation: 5,
                width: width / 1.5,
                paddingHorizontal: 10,
                borderRadius: 15,
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text style={{ fontSize: 12, marginBottom: 10 }}>
                Select Specialty
              </Text>
              <CustomDropdown
                options={specialty}
                selectedValue={
                  // jobState.specialty === ""
                  // ? "Select Specialty"
                  // : jobState.specialty
                  "Select Specialty"
                }
                onValueChange={(value) => handleAddSpecialty(value)}
              />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowSpecialty(false)}
                  style={{
                    backgroundColor: "#2775BD",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={showPrimaryLicenseState}
          onRequestClose={() => setShowPrimaryLicenseState(false)}
        >
          <View
            style={{
              height: height,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                height: 280,
                justifyContent: "center",
                elevation: 5,
                width: width / 1.5,
                paddingHorizontal: 10,
                borderRadius: 15,
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text style={{ fontSize: 12, marginBottom: 10 }}>
                Select Primary State
              </Text>

              <CustomDropdown
                options={USAState}
                selectedValue={
                  nurseState.primaryState === ""
                    ? "Select License Type"
                    : nurseState.primaryState
                }
                container={{ flex: 1 }}
                onValueChange={(value) =>
                  setNurseState({ ...nurseState, primaryState: value })
                }
              />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowPrimaryLicenseState(false)}
                  style={{
                    backgroundColor: "#2775BD",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={showPrimaryLicenseType}
          onRequestClose={() => setShowPrimaryLicenseType(false)}
        >
          <View
            style={{
              height: height,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                height: 280,
                justifyContent: "center",
                elevation: 5,
                width: width / 1.5,
                paddingHorizontal: 10,
                borderRadius: 15,
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text style={{ fontSize: 12, marginBottom: 10 }}>
                Select Primary License Type
              </Text>

              <CustomDropdownObj
                options={primaryLicenseType}
                selectedValue={
                  nurseState.primaryLicenseType === ""
                    ? "Select License Type"
                    : nurseState.primaryLicenseType
                }
                container={{ flex: 1 }}
                onValueChange={(value) =>
                  setNurseState({ ...nurseState, primaryLicenseType: value })
                }
              />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowPrimaryLicenseType(false)}
                  style={{
                    backgroundColor: "#2775BD",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
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
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAddress}
        onRequestClose={() => setShowAddress(false)}
      >
        <AutoFillAddress
          setShowAddress={setShowAddress}
          address={address.fullAddress}
          setAddress={setAddress}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default CreateNurse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
