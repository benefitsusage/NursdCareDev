import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { S3Image } from "aws-amplify-react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const UserCard = ({
  element,
  updateUser,
  onUserDetailNavigate,
  onChatRoomNavigate,
  userId,
  updateUserSuspend,
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
            <Text style={{ color: "#8d8d8d", fontWeight: "600", fontSize: 12 }}>
              {element?.primaryLicenseType}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
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
                borderRadius: 10,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ color: "#000", fontWeight: "600", fontSize: 12 }}>
                Message
              </Text>
            </TouchableOpacity> */}
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
          marginHorizontal: 10,
          marginBottom: 10,
          marginTop: -5,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            element?.nurseAppAccessControl
              ? updateUserSuspend(element, false)
              : updateUserSuspend(element, true)
          }
          style={{
            backgroundColor: element?.nurseAppAccessControl ? "#006002" : "red",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
            {element?.nurseAppAccessControl ? "Un-Suspend" : "Suspend"}
          </Text>
        </TouchableOpacity>
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

export default UserCard;
