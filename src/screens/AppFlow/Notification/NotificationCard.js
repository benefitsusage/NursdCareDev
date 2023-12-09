import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import { DataStore } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native/dist/Storage";
import moment from "moment";
import { FacilityNotificationTable } from "../../../models";
import { Entypo } from "@expo/vector-icons";

const colorFacility = "#006002";

const NotificationCard = ({
  length,
  index,
  element,
  onPress,
  onLongPress,
  selectedCards,
  selected,
}) => {
  const formatDate = (da) => {
    const date = new Date(da);
    const formattedDate = `${date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}`;

    const parts = formattedDate.split("-");
    const formatDate = `${parts[0].padStart(2, "0")}-${parts[1].padStart(
      2,
      "0"
    )}-${parts[2]}`;
    return formatDate;
  };

  let currentDate = formatDate(new Date());

  function isValidDateFormat(dateString) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
  }

  useEffect(() => {
    if (element?.visited === false) {
      setAsRead();
    }
  }, [element]);

  const setAsRead = async () => {
    await DataStore.save(
      FacilityNotificationTable.copyOf(element, (updated) => {
        updated.visited = true;
      })
    );
  };

  const setRead = async () => {
    await DataStore.save(
      FacilityNotificationTable.copyOf(element, (updated) => {
        updated.visitNotification = true;
      })
    );
  };

  const isSelected = selectedCards?.some((item) => item?.id === element?.id);

  const view = () => {
    if (element?.visitNotification) {
      onPress();
    } else {
      setRead();
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      // onLongPress={() => {
      //   // Alert.alert("Are you sure want to delete?", "", [
      //   //   {
      //   //     text: "Yes",
      //   //     onPress: () => deleteNotification(element),
      //   //   },
      //   //   {
      //   //     text: "No",
      //   //     style: "cancel",
      //   //   },
      //   // ]);
      //   onLongPress();
      // }}
      onPress={() => {
        selected ? onLongPress() : view();
      }}
      style={{
        marginHorizontal: 15,
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: isSelected
          ? "#ccc"
          : element?.visitNotification
            ? "#fff"
            : "#f2f2f2",
        borderRadius: 10,
        elevation: 2,
        shadowColor: colorFacility,
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        marginBottom: length - 1 === index ? 100 : 0,
        flexDirection: "row",
      }}
    >
      <View>
        <Entypo
          name="dot-single"
          size={24}
          color={element?.notificationDotTypeColor}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {(element?.imageURL !== null ||
          element?.imageURL !== undefined ||
          element?.imageURL !== "") && (
            <S3Image
              imgKey={element?.imageURL}
              style={{
                width: 43,
                height: 43,
                borderRadius: 10,
                // aspectRatio: 4 / 3,
              }}
              resizeMode="cover"
            />
          )}
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                color: "#1a1a1a",
                fontWeight: "600",
                marginLeft: 5,
              }}
            >
              {element?.title}
            </Text>
            <Text style={{
              flex: 1, color: "#8d8d8d", fontWeight: "600", fontSize: 10, textAlign: "right"
            }}>
              {formatDate(element?.createdAt) === currentDate
                ? moment(element?.createdAt).toNow() === "in a few seconds"
                  ? "few seconds ago"
                  : moment(element?.createdAt).calendar()
                : isValidDateFormat(moment(element?.createdAt).calendar())
                  ? moment(element?.createdAt).calendar() +
                  " " +
                  moment(element?.createdAt).format("hh:mm a")
                  : moment(element?.createdAt).calendar()}
            </Text>
          </View>

          <Text style={{ fontSize: 10, marginLeft: 5, marginTop: 5 }}>
            {element?.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
