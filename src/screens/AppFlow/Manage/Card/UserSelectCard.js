import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { S3Image } from "aws-amplify-react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const UserSelectCard = ({
  element,
  onUserDetailNavigate,
  handleValueChange,
}) => {
  return (
    <TouchableOpacity onPress={() => handleValueChange(element)}>
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
          <TouchableOpacity
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onPress={() =>
              onUserDetailNavigate({
                id: element?.id,
              })
            }
          >
            <Text style={{ color: "#006002", fontWeight: "600", fontSize: 12 }}>
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserSelectCard;
