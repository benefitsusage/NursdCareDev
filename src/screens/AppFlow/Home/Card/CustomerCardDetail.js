import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { S3Image } from "aws-amplify-react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const CustomerCardDetail = ({ element, onUserDetailNavigate, userId }) => {
  return (
    <TouchableOpacity
    // onPress={() =>
    //   onUserDetailNavigate({
    //     id: element?.id,
    //   })
    // }
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
              {element?.patient_first_name}
              {element?.patient_last_name}
            </Text>
            <Text style={{ color: "#8d8d8d", fontWeight: "600", fontSize: 12 }}>
              Address :{" "}
              {element?.patient_address_line_1 +
                "," +
                element?.patient_city +
                "," +
                element?.patient_state +
                "," +
                element?.patient_zip_code}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: element?.patient_address_line_2
            ? "space-between"
            : "flex-end",
        }}
      >
        {element?.patient_address_line_2 && (
          <Text
            style={{
              color: "#8d8d8d",
              fontWeight: "600",
              fontSize: 10,
            }}
          >
            Unit : {element?.patient_address_line_2}
          </Text>
        )}
        <Text
          style={{
            color: "red",
            fontWeight: "600",
            fontSize: 10,
          }}
        >
          {element?.patient_gender}
        </Text>
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

export default CustomerCardDetail;
