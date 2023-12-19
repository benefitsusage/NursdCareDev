import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import UserCard from "./Card/UserCard";
import { FacilityTable, NurseTable } from "../../../models";
import { DataStore } from "aws-amplify";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageUser = (props) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(undefined);
  const [facilityData, setFacilityData] = useState(undefined);

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

  const onUserDetailNavigate = (d) => {
    props.navigation.navigate("UserDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    if (userId !== undefined) {
      getFacilityDetail(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (facilityData !== undefined) {
      getNurseList(facilityData?.organization, facilityData?.location_id);
    }
  }, [facilityData]);

  //Facility Detail
  const getFacilityDetail = async (id) => {
    try {
      const facilityData = await DataStore.query(FacilityTable, (item) =>
        item.id.eq(id)
      );
      setFacilityData(facilityData[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getNurseList = async (id, location) => {
    try {
      const nurseList = await DataStore.query(
        NurseTable,
        (item) => item.organization.eq(id) && item.location_id.eq(location)
      );
      setData(nurseList);
    } catch (error) {
      console.log(error);
    }
  };

  // const onJobDetailNavigate = (d) => {
  //   props.navigation.navigate("JobDetailsScreen", {
  //     data: d,
  //   });
  // };

  //NurseTable Insert
  useEffect(() => {
    const subscription = DataStore.observe(NurseTable).subscribe((msg) => {
      if (msg.model === NurseTable && msg.opType === "INSERT") {
        if (facilityData !== undefined) {
          getNurseList(facilityData?.organization, facilityData?.location_id);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [facilityData]);

  //NurseTable Update
  useEffect(() => {
    const subscription = DataStore.observe(NurseTable).subscribe((msg) => {
      if (msg.model === NurseTable && msg.opType === "UPDATE") {
        console.log("ManageUser NurseTable", msg.opType);
        if (facilityData !== undefined) {
          getNurseList(facilityData?.organization, facilityData?.location_id);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [facilityData]);

  const updateUser = async (data, value) => {
    await DataStore.save(
      NurseTable.copyOf(data, (updated) => {
        updated.nurseLoginControl = value;
      })
    );
  };

  const updateUserSuspend = async (data, value) => {
    await DataStore.save(
      NurseTable.copyOf(data, (updated) => {
        updated.nurseAppAccessControl = value;
      })
    );
  };

  const onChatRoomNavigate = (d) => {
    props?.navigation.navigate("ChatRoomScreen", {
      data: d,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: Platform.OS === "ios" ? 30 : 50,
            }}
          >
            {data?.map((element, index) => {
              return (
                <UserCard
                  key={element?.id}
                  element={element}
                  updateUser={updateUser}
                  onUserDetailNavigate={onUserDetailNavigate}
                  onChatRoomNavigate={onChatRoomNavigate}
                  userId={userId}
                  updateUserSuspend={updateUserSuspend}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ManageUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
