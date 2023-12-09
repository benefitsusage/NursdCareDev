import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import NewJobCard from "../Manage/Card/NewJobCard";
import { JobPostingTable } from "../../../models";
import { DataStore } from "aws-amplify";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageJobShift = ({ props }) => {
  const [userId, setUserId] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  console.log("ManageJobShift", props);

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

  //Get Jobs List in Particular Facility
  const getFacilityJob = async (id) => {
    const itemArr = await DataStore.query(JobPostingTable, (item) =>
      item.jobPostingTableFacilityTableId.eq(id)
    );
    setData(
      itemArr
        .filter((item) => item.jobType === "Shift")
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    );
    setLoading(false);
  };

  useEffect(() => {
    if (userId !== undefined) {
      getFacilityJob(userId);
    }
  }, [userId]);

  const onJobDetailNavigate = (d) => {
    props.navigation.navigate("JobDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    const subscription = DataStore.observe(JobPostingTable).subscribe((msg) => {
      if (msg.model === JobPostingTable && msg.opType === "UPDATE") {
        console.log("ManageJobShift JobPostingTable", msg.opType);
        setLoading(true);
        getFacilityJob(userId);
      }
      if (msg.model === JobPostingTable && msg.opType === "DELETE") {
        getFacilityJob(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

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
          {data?.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text>No Jobs</Text>
            </View>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: Platform.OS === "ios" ? 30 : 50,
              }}
            >
              {data?.map((element, index) => {
                return (
                  <NewJobCard
                    key={element?.id}
                    element={element}
                    onJobDetailNavigate={onJobDetailNavigate}
                    userId={userId}
                  />
                );
              })}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ManageJobShift;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
