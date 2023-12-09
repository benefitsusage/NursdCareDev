import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { FacilityTable, NurseTable } from "../../../../models";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { DataStore } from "aws-amplify";
import { openMap } from "../../../../utils/function";

const OrganizationCard = ({
  item,
  organisationData,
  onNavigate,
  organisationName,
}) => {
  const [facility, setFacility] = useState(0);
  const [nurse, setNurse] = useState(0);

  useEffect(() => {
    getFacility(item?.location_id, organisationName);
    getNurse(item?.location_id, organisationName);
  }, [item]);

  const getFacility = async (location_id, organization) => {
    const item = await DataStore.query(FacilityTable, (item) =>
      item.organization.eq(organization)
    );
    const itemArr = item.filter((item) => item.location_id === location_id);
    setFacility(itemArr?.length);
  };

  const getNurse = async (location_id, organization) => {
    const item = await DataStore.query(NurseTable, (item) =>
      item.organization.eq(organization)
    );
    const itemArr = item.filter((item) => item.location_id === location_id);
    setNurse(itemArr?.length);
  };

  return (
    <View
      key={item?.id}
      style={{
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: "#f1f1f1",
        padding: 20,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            onNavigate({
              location_id: item?.location_id,
              organization: organisationName,
            })
          }
          style={{ flex: 1, marginRight: 20 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              {item?.location_city}{" "}
              <Text style={{ fontSize: 10, fontWeight: "600" }}>
                {item?.location_state}
              </Text>
            </Text>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 10,
              fontWeight: "600",
              color: "#006002",
            }}
          >
            {item?.location_fullAddress}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: 10,
                fontSize: 16,
                fontWeight: "600",
                color: "#006002",
              }}
            >
              Managers = {facility}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 16,
                fontWeight: "600",
                color: "#006002",
              }}
            >
              Nurses = {nurse}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openMap(item?.location_fullAddress)}>
          <ImageBackground
            source={require("../../../../../assets/images/maps-icon.png")}
            resizeMode="cover"
            style={{
              width: 60,
              height: 80,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                backgroundColor: "#006002",
                fontSize: 12,
                textAlign: "center",
                fontWeight: "600",
                paddingVertical: 3,
                color: "#fff",
                opacity: 0.7,
              }}
            >
              view
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrganizationCard;
