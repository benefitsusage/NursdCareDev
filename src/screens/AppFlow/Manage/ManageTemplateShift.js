import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import TemplateCard from "./Card/TemplateCard";
import { FacilityTable, JobTemplate } from "../../../models";
import { DataStore } from "aws-amplify";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageTemplateShift = ({ props }) => {
  const [userId, setUserId] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  console.log("ManageTemplateShift ", props);
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

  useEffect(() => {
    if (userId !== undefined) {
      getFacilityJob(userId);
    }
  }, [userId]);

  //Get Jobs List in Particular Facility
  const getFacilityJob = async (id) => {
    const itemArr = await DataStore.query(
      JobTemplate,
      (item) =>
        item.jobPostingTableFacilityTableId.eq(id) && item.jobType.eq("Shift")
    );
    setData(
      itemArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
    setLoading(false);
  };

  const onJobDetailNavigate = (d) => {
    props.navigation.navigate("TemplateDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    const subscription = DataStore.observe(JobTemplate).subscribe((msg) => {
      if (msg.model === JobTemplate && msg.opType === "UPDATE") {
        console.log("ManageTempShift JobTemplate", msg.opType);
        setLoading(true);
        getFacilityJob(userId);
      }
      if (msg.model === JobTemplate && msg.opType === "DELETE") {
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
              <Text>No Template</Text>
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
                  <TemplateCard
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

export default ManageTemplateShift;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
