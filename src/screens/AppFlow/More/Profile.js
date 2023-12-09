import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Organisation } from "../../../models";
import { DataStore } from "aws-amplify";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrganizationCard from "../Home/Card/OrganizationCard";
import { SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = (props) => {
  const [userId, setUserId] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [organisationData, setOrganisationData] = useState(undefined);

  //Get User ID
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        AsyncStorage.getItem("userId").then((resp) => {
          if (resp !== null) {
            setUserId(resp);
          }
        });
        return () => {
          isActive = false;
        };
      }
    }, [])
  );

  //Organisation Detail
  const getOrganisationDetail = async (id) => {
    try {
      const organisationData = await DataStore.query(Organisation, (item) =>
        item.id.eq(id)
      );
      setOrganisationData(organisationData[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId !== undefined) {
      getOrganisationDetail(userId);
    }
  }, [userId]);

  useEffect(() => {
    const subscription = DataStore.observe(Organisation).subscribe((msg) => {
      if (msg.model === Organisation && msg.opType === "UPDATE") {
        console.log("Profile Organisation", msg.opType);
        getOrganisationDetail(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  const onNavigate = (d) => {
    props?.navigation?.navigate("OrganizationDetailsScreen", {
      data: d,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 15,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              {organisationData?.organisationName}
            </Text>
          </View>

          <View
            style={{
              height: 3,
              backgroundColor: "#f2f2f2",
              marginVertical: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                props.navigation.navigate("EditProfileForm", {
                  data: organisationData,
                })
              }
            >
              <SimpleLineIcons name="pencil" size={15} color="#000" />
            </TouchableOpacity>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <View>
                <Text style={{ fontWeight: "500", fontSize: 12 }}>Email</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#595959",
                    marginTop: 5,
                  }}
                >
                  {organisationData?.emailId}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <View>
                <Text style={{ fontWeight: "500", fontSize: 12 }}>
                  Phone Number
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#595959",
                    marginTop: 5,
                  }}
                >
                  {organisationData?.phoneNumber}
                </Text>
              </View>
            </View>
          </View>
          {organisationData?.locations?.map((item, index) => {
            return (
              <OrganizationCard
                key={item?.id}
                item={item}
                organisationData={organisationData}
                onNavigate={onNavigate}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
