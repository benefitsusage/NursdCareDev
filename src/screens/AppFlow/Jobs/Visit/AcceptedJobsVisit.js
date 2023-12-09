import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import NewJobCard from "../../Manage/Card/NewJobCard";
import { JobPostingTable } from "../../../../models";
import { DataStore, SortDirection } from "aws-amplify";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const AcceptedJobsVisit = (props) => {
  const [userId, setUserId] = useState(
    props === undefined ? {} : props?.route?.params?.data?.id
  );
  // console.log("AcceptedJobsVisit", userId);

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingBottom, setLoadingBottom] = useState(false);
  const [page, setPage] = useState(0);
  const [dateSort, setDateSort] = useState(null);

  useEffect(() => {
    if (userId !== undefined) {
      getFacilityJobTotal(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userId !== undefined) {
      getFacilityJob(userId, page);
    }
  }, [userId, page]);

  const getFacilityJobTotal = async (id) => {
    try {
      const itemArr = await DataStore.query(JobPostingTable, (item) =>
        item.and((c) => [
          c.jobPostingTableFacilityTableId.eq(id),
          c.jobType.eq("Visit"),
          c.jobStatus.eq("Nurse Assigned"),
        ])
      );
      setDataLength(itemArr.length);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getFacilityJob = async (id, page) => {
    try {
      const itemArr = await DataStore.query(
        JobPostingTable,
        (item) =>
          item.and((c) => [
            c.jobPostingTableFacilityTableId.eq(id),
            c.jobType.eq("Visit"),
            c.jobStatus.eq("Nurse Assigned"),
          ]),
        {
          sort: (s) => s.updatedAt(SortDirection.DESCENDING),
          page: page,
          limit: 10,
        }
      );
      const updatedData = [...data, ...itemArr];
      setData(updatedData);
      setLoading(false);
      setLoadingBottom(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const onJobDetailNavigate = (d) => {
    props.navigation.navigate("JobDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    const subscription = DataStore.observe(JobPostingTable, (item) =>
      item.jobPostingTableFacilityTableId.eq(userId)
    ).subscribe((msg) => {
      if (msg.model === JobPostingTable && msg.opType === "UPDATE") {
        setData([]);
        setLoading(true);
        setDataLength([]);
        setPage(0);
        getFacilityJob(userId, page);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  if (dateSort) {
    data?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  } else {
    data?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  const handleScrollEnd = () => {
    if (dataLength !== data?.length) {
      setLoadingBottom(true);
      setPage((prevPage) => prevPage + 1);
    }
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          nScrollEndDrag={handleScrollEnd}
        >
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
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginHorizontal: 20,
                  marginTop: 5,
                }}
                onPress={() => setDateSort(!dateSort)}
                activeOpacity={0.5}
              >
                <Text>Date Sort</Text>

                <MaterialCommunityIcons name="sort" size={22} color="#595959" />
              </TouchableOpacity>
              {data
                ?.filter(
                  (element, index, self) =>
                    self.findIndex((e) => e.id === element.id) === index
                )
                ?.map((element, index) => {
                  return (
                    <NewJobCard
                      key={index}
                      element={element}
                      onJobDetailNavigate={onJobDetailNavigate}
                      userId={userId}
                    />
                  );
                })}
              {loadingBottom && (
                <ActivityIndicator
                  style={{ marginTop: 10 }}
                  size={30}
                  color={"#888"}
                />
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default AcceptedJobsVisit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
