// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { KeyboardAvoidingView, Platform } from "react-native";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import AuthButton from "../../../../customComponents/Button/AuthButton";
// import CustomInput from "../../../../customComponents/Input/CustomInput";

// const ContactUs = () => {
//   const [state, setState] = useState({
//     name: "",
//     email: "",
//     phoneNum: "",
//     message: "",
//   });
//   const { width, height } = Dimensions.get("window");

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <View
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           marginTop: 10,
//           marginHorizontal: 20,
//         }}
//       >
//         <CustomInput
//           value={state.name}
//           label={"Name"}
//           placeholder="Enter Name"
//           keyboardType={"default"}
//           onChangeText={(text) => setState({ ...state, name: text })}
//           clearValue={() => setState({ ...state, name: "" })}
//           viewStyle={{
//             height: 40,
//             backgroundColor: "#f2f2f2",
//             borderRadius: 10,
//             elevation: 1,
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             borderWidth: 0.5,
//             borderColor: "#e6e6e6",
//             paddingRight: 10,
//             justifyContent: "space-between",
//             marginTop: 0,
//           }}
//           textInputStyle={{
//             height: 40,
//             borderRadius: 10,
//             paddingLeft: 10,
//             paddingRight: 5,
//             fontSize: 12,
//           }}
//           iconStyle={{
//             height: 40,
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         />
//       </View>
//       <View
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           marginTop: 10,
//           marginHorizontal: 20,
//         }}
//       >
//         <CustomInput
//           value={state.email}
//           label="Email"
//           placeholder="Email"
//           keyboardType={"email-address"}
//           onChangeText={(text) => setState({ ...state, email: text })}
//           clearValue={() => setState({ ...state, email: "" })}
//           viewStyle={{
//             height: 40,
//             backgroundColor: "#f2f2f2",
//             borderRadius: 10,
//             elevation: 1,
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             borderWidth: 0.5,
//             borderColor: "#e6e6e6",
//             paddingRight: 10,
//             justifyContent: "space-between",
//             marginTop: 0,
//           }}
//           textInputStyle={{
//             height: 40,
//             borderRadius: 10,
//             paddingLeft: 10,
//             paddingRight: 5,
//             fontSize: 12,
//           }}
//           iconStyle={{
//             height: 40,
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         />
//       </View>
//       <View
//         style={{
//           marginTop: 10,
//           marginHorizontal: 20,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 12,
//             color: "#737373",
//           }}
//         >
//           Phone Number
//         </Text>
//         <View
//           style={{
//             height: 40,
//             backgroundColor: "#f2f2f2",
//             borderRadius: 10,
//             elevation: 1,
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             borderWidth: 0.5,
//             borderColor: "#e6e6e6",
//             paddingRight: 10,
//             justifyContent: "space-between",
//             marginTop: 10,
//           }}
//         >
//           <Text
//             style={{
//               marginLeft: 5,
//               paddingHorizontal: 5,
//               borderRightWidth: 1,
//               borderColor: "#d9d9d9",
//               color: "#737373",
//             }}
//           >
//             +1
//           </Text>
//           <TextInput
//             onChangeText={(text) => setState({ ...state, phoneNum: text })}
//             value={state.phoneNum}
//             keyboardType={"decimal-pad"}
//             autoCapitalize="none"
//             placeholderTextColor="#b3b3b3"
//             placeholder={"Enter Phone Number"}
//             style={{
//               flex: 1,
//               height: 40,
//               borderRadius: 10,
//               paddingLeft: 10,
//               paddingRight: 5,
//               fontSize: 12,
//             }}
//           />
//           <View
//             style={{
//               height: 40,
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center",
//             }}
//           >
//             {state.phoneNum ? (
//               <TouchableOpacity
//                 onPress={() => setState({ ...state, phoneNum: "" })}
//               >
//                 <Ionicons name="close-sharp" size={22} color="#808080" />
//               </TouchableOpacity>
//             ) : null}
//           </View>
//         </View>
//       </View>

//       <View style={{ marginTop: 10 }}>
//         <Text
//           style={{
//             marginBottom: 5,
//             fontSize: 12,
//             color: "#737373",
//             marginHorizontal: 20,
//           }}
//         >
//           Message
//         </Text>

//         <View
//           style={{
//             backgroundColor: "#f2f2f2",
//             borderRadius: 10,
//             elevation: 1,
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             borderWidth: 0.5,
//             borderColor: "#e6e6e6",
//             marginHorizontal: 20,
//             paddingRight: 10,
//             justifyContent: "space-between",
//           }}
//         >
//           <TextInput
//             style={{
//               width: "90%",
//               padding: 2,
//               paddingLeft: 5,
//               fontSize: 12,
//               color: "#737373",
//             }}
//             multiline
//             onChangeText={(text) => setState({ ...state, message: text })}
//             value={state.message}
//             keyboardType={"default"}
//             autoCapitalize="sentences"
//             placeholderTextColor="#b3b3b3"
//             placeholder={"Add Message"}
//           />
//           <View
//             style={{
//               height: 40,
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center",
//             }}
//           >
//             {state.message ? (
//               <TouchableOpacity
//                 onPress={() => setState({ ...state, message: "" })}
//                 style={{ marginLeft: 3 }}
//               >
//                 <Ionicons name="close-sharp" size={22} color="#808080" />
//               </TouchableOpacity>
//             ) : null}
//           </View>
//         </View>
//       </View>

//       <View style={{ alignItems: "center", marginTop: 10 }}>
//         <AuthButton name={"Send"} color={"#006002"} />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default ContactUs;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

import { View, Text, StyleSheet, Image, Linking } from "react-native";
import React from "react";

const ContactUs = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../../assets/images/tech-support.jpg")}
        style={{
          width: 250,
          height: 250,
          marginTop: 80,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          fontSize: 15,
          color: "#737373",
          textAlign: "center",
        }}
      >
        Email to{" "}
        <Text
          style={{
            fontSize: 15,
            color: "#2775BD",
          }}
          onPress={() =>
            Linking.openURL(
              "mailto:support@nursdhealth.com?subject=Technical Support"
            )
          }
        >
          support@nursdhealth.com.
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: "#737373",
          textAlign: "center",
        }}
      >
        Someone will respond to you within next 24 hours.
      </Text>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
