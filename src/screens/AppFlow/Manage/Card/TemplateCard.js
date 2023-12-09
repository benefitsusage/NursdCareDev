import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { DataStore } from "aws-amplify";
import { openMap, DateFormat } from "../../../../utils/function";
import moment from "moment";
import { FacilityTable } from "../../../../models";

const colorHospital = "#00b359";

const TemplateCard = ({ element, onJobDetailNavigate, userId }) => {

  const [user, setUser] = useState(undefined);

  async function returnFacilityName(id) {
    const itemArr = await DataStore.query(FacilityTable, (item) =>
      item.id.eq(id)
    );
    setUser(itemArr[0]);
  }

  useEffect(() => {
    if (element?.jobPostingTableFacilityTableId) {
      returnFacilityName(element?.jobPostingTableFacilityTableId);
    }
  }, [element]);

  return (
    <TouchableOpacity
      key={element?.id}
      style={{
        display: "flex",
        marginHorizontal: 15,
        marginTop: 10,
        padding: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 1,
        shadowColor: "#ccc",
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }}
      activeOpacity={0.5}
      onPress={() =>
        onJobDetailNavigate({
          id: element?.id,
        })
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {element?.jobPostingTableFacilityTableId !== userId ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 10, color: "#1a75ff", fontWeight: "800" }}>
              Create By : {user?.name}
            </Text>
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 10, color: "#1a75ff", fontWeight: "800" }}>
              Create By : You
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Entypo
            name="dot-single"
            size={24}
            color={element?.jobType === "Visit" ? "#00b359" : "#2775BD"}
          />
          <Text
            style={{
              fontWeight: "800",
              fontSize: 10,
              color: element?.jobType === "Visit" ? "#00b359" : "#2775BD",
            }}
          >
            Created - {moment(new Date(element.createdAt)).format("MM-DD-YYYY")}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            overflow: "hidden",
            borderColor: colorHospital,
          }}
        >
          <TouchableOpacity onPress={() => openMap(element?.fullAddress)}>
            <ImageBackground
              source={require("../../../../../assets/images/maps-icon.png")}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  backgroundColor: colorHospital,
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "600",
                  paddingVertical: 2,
                  color: "#fff",
                  opacity: 0.7,
                }}
              >
                view
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              color: "#1a1a1a",
              fontWeight: "600",
              marginLeft: 5,
            }}
          >
            {element?.jobTemplateName}
          </Text>
          <Text
            style={{
              fontSize: 10,
              marginTop: 5,
              color: "#1a1a1a",
              fontWeight: "600",
              marginLeft: 5,
            }}
          >
            {element?.shiftTitle}
          </Text>
          <View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {element?.licenseType?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 1,
                      marginHorizontal: 5,
                    }}
                  >
                    <Text style={{ fontSize: 10, color: "#595959" }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <Text style={{ fontSize: 10, marginLeft: 5 }}>
            {element?.fullAddress}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{ justifyContent: "space-around", alignItems: "flex-end" }}
          >
            <TouchableOpacity
              onPress={() =>
                onJobDetailNavigate({
                  id: element?.id,
                })
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: colorHospital,
                  textDecorationLine: "underline",
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        {DateFormat(element?.startDate) === DateFormat(element?.endDate) ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name={"ios-calendar"} color={"#666"} size={15} />
            <Text
              style={{
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 10,
                marginLeft: 3,
                color: "#595959",
              }}
            >
              {DateFormat(element?.startDate)}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name={"ios-calendar"} color={"#666"} size={15} />
            <Text
              style={{
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 10,
                marginLeft: 3,
                color: "#595959",
              }}
            >
              {DateFormat(element?.startDate)} -
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 10,
                marginLeft: 3,
                color: "#595959",
              }}
            >
              {DateFormat(element?.endDate)}
            </Text>
          </View>
        )}
        <Text
          style={{
            fontSize: 10,
            marginLeft: 5,
            fontWeight: "bold",
            color: "#595959",
          }}
        >
          {moment(element?.startDate).format("ddd")} - {element?.jobTiming}{" "}
          {element?.jobTiming === "Morning" ? (
            <Feather name="sun" size={12} color="black" />
          ) : element?.jobTiming === "Afternoon" ? (
            <Ionicons name="sunny-sharp" size={12} color="black" />
          ) : element?.jobTiming === "Evening" ? (
            <Ionicons name="partly-sunny-outline" size={12} color="black" />
          ) : (
            <Feather name="moon" size={12} color="black" />
          )}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name={"clock-outline"}
            color={"#666"}
            size={15}
            style={{
              marginLeft: 5,
            }}
          />
          <Text
            style={{
              marginVertical: 5,
              fontSize: 10,
              marginLeft: 2,
              fontWeight: "bold",
              color: "#595959",
            }}
          >
            {moment(new Date(element?.startTime)).format("hh:mma")}-
            {moment(new Date(element?.endTime)).format("hh:mma")}
          </Text>
        </View>
        {/* <Text
          style={{
            fontWeight: "bold",
            marginVertical: 5,
            fontSize: 11,
            marginLeft: 3,
            color: "#00cc00",
          }}
        >
          $ {element?.baseRate} / hr
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default TemplateCard;
