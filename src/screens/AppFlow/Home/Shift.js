import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { JobPostingTable } from "../../../models";
import { DataStore } from "aws-amplify";
import { useEffect } from "react";
import { RefreshControl } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRef } from "react";

const ShiftScreen = ({ props, userId }) => {
  console.log("ShiftScreen", userId);

  const [data, setData] = useState([]);

  const [openedJobs, setOpenedJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [pendingAssignment, setPendingAssignment] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [unFullFiled, setUnFullFiled] = useState([]);
  const [noShowJobs, setNoShowJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [noShowJobsActive, setNoShowJobsActive] = useState([]);
  const [pendingJobsActive, setPendingJobsActive] = useState([]);
  const [pendingReview, setPendingReview] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshingView, setRefreshingView] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const handleRefresh = () => {
    getFacilityJob(userId);
  };

  useEffect(() => {
    getFacilityJob(userId);
  }, [userId]);

  //Get Jobs List in Particular Facility
  const getFacilityJob = async (id) => {
    console.log("Shift Screen getFacilityJob Calling", id);
    const itemArr = await DataStore.query(JobPostingTable, (item) =>
      item.and((c) => [
        c.jobPostingTableFacilityTableId.eq(id),
        c.jobType.eq("Shift"),
      ])
    );

    setCompletedJobs(
      itemArr.filter((item) => {
        return item.jobStatus === "Completed";
      }).length
    );
    setAcceptedJobs(
      itemArr.filter((item) => {
        return item.jobStatus === "Nurse Assigned";
      }).length
    );
    setUnFullFiled(
      itemArr.filter((item) => {
        return item.jobStatus === "Unfulfilled";
      }).length
    );
    setPendingAssignment(
      itemArr.filter((item) => {
        return item.jobStatus === "Pending Assignment";
      }).length
    );
    setOpenedJobs(
      itemArr.filter((item) => {
        return item.jobStatus === "Open";
      }).length
    );
    setInProgress(
      itemArr.filter((item) => {
        return item.jobStatus === "In-Progress";
      }).length
    );
    setNoShowJobs(
      itemArr.filter((item) => {
        return item.jobStatus === "Missed";
      }).length
    );
    setNoShowJobsActive(
      itemArr.filter((item) => {
        return (
          item.jobStatus === "Missed" &&
          item.noShowReason !== null &&
          item.pendingOrNoShowFacilityDecideMessage === null
        );
      }).length
    );
    setPendingJobs(
      itemArr.filter((item) => {
        return item.jobStatus === "Pending Clock Out";
      }).length
    );
    setPendingJobsActive(
      itemArr.filter((item) => {
        return (
          item.jobStatus === "Pending Clock Out" &&
          item.neverCheckOutReason !== null &&
          item.pendingOrNoShowFacilityDecideMessage === null
        );
      }).length
    );
    setPendingReview(
      itemArr.filter((item) => {
        return item.jobStatus === "Pending Approval";
      }).length
    );

    setData(itemArr.length);
    setLoading(false);
    setRefreshing(false);
    setRefreshingView(false);
  };

  useEffect(() => {
    const subscription = DataStore.observe(JobPostingTable, (item) =>
      item.and((c) => [
        c.jobPostingTableFacilityTableId.eq(userId),
        c.jobType.eq("Shift"),
      ])
    ).subscribe((msg) => {
      if (msg.model === JobPostingTable && msg.opType === "INSERT") {
        console.log("FacilityJob INSERT");
        getFacilityJob(userId);
      }
      if (msg.model === JobPostingTable && msg.opType === "UPDATE") {
        console.log("FacilityJob UPDATE");
        setRefreshingView(true);
      }
      if (msg.model === JobPostingTable && msg.opType === "DELETE") {
        console.log("FacilityJob DELETE");
        getFacilityJob(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (refreshingView) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [refreshingView, animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {refreshingView && (
            <Animated.Text
              style={{
                textAlign: "center",
                fontSize: 10,
                marginTop: 10,
                transform: [{ translateY: translateY }],
              }}
            >
              Pull down <AntDesign name="arrowdown" size={10} color="black" />
            </Animated.Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "700" }}>My Task</Text>
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("ManageJobShift", {
                  data: { id: userId },
                })
              }
              style={{
                marginBottom: 0,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                Posted Shifts
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  color: "#00b359",
                }}
              >
                {" "}
                {data}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("PendingReview", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
                backgroundColor: "#f1f1f1",
                padding: 20,
                marginRight: 10,
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
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Pending Approvals
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {pendingReview}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("PendingAssignment", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
                backgroundColor: "#f1f1f1",
                padding: 20,
                borderRadius: 15,
                marginLeft: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Pending Assignment
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {pendingAssignment}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("NoShowShift", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
                backgroundColor: "#f1f1f1",
                marginRight: 10,
                padding: 20,
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  Missed Shifts
                </Text>
                {noShowJobsActive !== 0 && (
                  <View
                    style={{
                      marginLeft: 10,
                      backgroundColor: "#00b359",
                      height: 25,
                      width: 25,
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {noShowJobsActive}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {noShowJobs}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("PendingJobs", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
                backgroundColor: "#f1f1f1",
                marginLeft: 10,
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
                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  Pending Clock Out
                </Text>
                {pendingJobsActive !== 0 && (
                  <View
                    style={{
                      marginLeft: 10,
                      backgroundColor: "#00b359",
                      height: 25,
                      width: 25,
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {pendingJobsActive}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {pendingJobs}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "700" }}>My Dashboard</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("OpenJobs", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
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
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Open Shifts
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {openedJobs}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("AcceptedJobs", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
                backgroundColor: "#f1f1f1",
                marginRight: 10,
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
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Assigned Shifts
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {acceptedJobs}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("InProgress", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
                backgroundColor: "#f1f1f1",
                marginLeft: 10,
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
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  In-Progress
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {inProgress}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("CompletedJobs", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
                backgroundColor: "#f1f1f1",
                marginRight: 10,
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
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Completed Shifts
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {completedJobs}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("UnFullFiled", {
                  data: { id: userId },
                })
              }
              style={{
                flex: 1,
                backgroundColor: "#f1f1f1",
                marginLeft: 10,
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
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Unfulfilled Shifts
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "#00b359",
                }}
              >
                {unFullFiled}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ShiftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
