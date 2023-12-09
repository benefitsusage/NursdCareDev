import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import React from "react";
import { S3Image } from "aws-amplify-react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const UserJobCard = ({
  element,
  jobFinalSelectionNurseId,
  setJobFinalSelectionNurseId,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        element?.availableTime
          ? jobFinalSelectionNurseId === element?.id
            ? setJobFinalSelectionNurseId("")
            : setJobFinalSelectionNurseId(element?.id)
          : Platform.OS === "web"
          ? alert("Nurse is not available")
          : Alert.alert("Nurse is not available")
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor:
            jobFinalSelectionNurseId === element?.id
              ? "#e6ffe6"
              : element?.availableTime
              ? "#fff"
              : "#ffcccc",
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
            width: 40,
            height: 40,
            overflow: "hidden",
          }}
        >
          {element?.profile !== null ||
          element?.profile !== undefined ||
          element?.profile !== "" ? (
            <S3Image
              imgKey={element?.profile}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                // aspectRatio: 4 / 3,
              }}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("../../../../assets/images/icon.jpg")}
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
            <Text style={{ fontSize: 12 }}>{element?.name}</Text>
            <Text style={{ color: "#8d8d8d", fontWeight: "600", fontSize: 10 }}>
              {element?.license}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: element?.availableTime ? "green" : "red",
                fontWeight:
                  jobFinalSelectionNurseId === element?.id ? "700" : "400",
              }}
            >
              {jobFinalSelectionNurseId === element?.id
                ? "Selected"
                : element?.availableTime
                ? "Available"
                : "Not Available"}
            </Text>
          </View>
        </View>
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

export default UserJobCard;
