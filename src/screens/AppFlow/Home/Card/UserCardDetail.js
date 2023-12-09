import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { S3Image } from "aws-amplify-react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const UserCardDetail = ({
  element,
  updateUser,
  onUserDetailNavigate,
  updateUserSuspend,
  updateNurseVerifiedUser,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        onUserDetailNavigate({
          id: element?.id,
        })
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          paddingHorizontal: 10,
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>
                {element?.firstName} {element?.lastName}
              </Text>
              {element?.nurseVerified && (
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                    borderWidth: 1,
                    marginLeft: 4,
                    backgroundColor: "#006002",
                    borderColor: "#006002",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcons name="done" size={12} color="#fff" />
                </View>
              )}
            </View>

            <Text style={{ color: "#8d8d8d", fontWeight: "600", fontSize: 12 }}>
              {element?.primaryLicenseType}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                element?.nurseAppAcceControl
                  ? updateUserSuspend(element, false)
                  : updateUserSuspend(element, true)
              }
              style={{
                backgroundColor: element?.nurseAppAcceControl
                  ? "#006002"
                  : "red",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                marginRight: 5,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
                {element?.nurseAppAcceControl ? "Un-Suspend" : "Suspend"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                element?.nurseLoginControl
                  ? updateUser(element, false)
                  : updateUser(element, true)
              }
              style={{
                backgroundColor: element?.nurseLoginControl ? "red" : "#006002",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
                {element?.nurseLoginControl ? "DeActivate" : "Activate"}
                {/* {element?.nurseLoginControl ? "Suspend" : "Un-Suspend"} */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: element?.emailVerified ? "#00b359" : "red",
            fontWeight: "600",
            fontSize: 10,
            marginRight: 2,
          }}
        >
          {element?.emailVerified
            ? "Email confirmed"
            : "Waiting for nurse confirmation"}
        </Text>
        {!element?.nurseVerified && (
          <TouchableOpacity
            onPress={() => updateNurseVerifiedUser(element, true)}
            style={{
              backgroundColor: "#2775BD",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
              Verify
            </Text>
          </TouchableOpacity>
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
  );
};

export default UserCardDetail;
