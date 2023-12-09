import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ImageBackground,
  Platform,
} from "react-native";
import React from "react";
import { DataStore } from "aws-amplify";
import { useState } from "react";
import { FacilityTable, JobTemplate } from "../../../models";
import { useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { DateString, openMap } from "../../../utils/function";
import moment from "moment";

const TemplateDetailsScreen = (props) => {
  const jobId = props !== undefined && props?.route?.params?.data?.id;
  const [userId, setUserId] = useState(props?.userId);

  const [pageLoading, setPageLoading] = useState(true);

  const [job, setJob] = useState(undefined);

  useEffect(() => {
    if (jobId !== undefined) {
      getUpdatedJob(jobId);
    }
  }, [jobId]);

  //Get Jobs List in Particular Facility
  const getUpdatedJob = async (id) => {
    const itemArr = await DataStore.query(JobTemplate, (item) =>
      item.id.eq(id)
    );
    setJob(itemArr[0]);
    setPageLoading(false);
  };

  //JobTemplate Update
  useEffect(() => {
    const subscription = DataStore.observe(JobTemplate, jobId).subscribe(
      (msg) => {
        if (msg.model === JobTemplate && msg.opType === "UPDATE") {
          if (jobId !== undefined) {
            getUpdatedJob(jobId);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [jobId]);

  const getFacilityDetail = async (id) => {
    try {
      const nurseData = await DataStore.query(FacilityTable, (item) =>
        item.id.eq(id)
      );
      return nurseData;
    } catch (error) {
      console.log("data save error:", error);
    }
  };

  const onEditJobNavigate = (d) => {
    props?.navigation.navigate("EditTemplateScreen", {
      data: d,
    });
  };

  return (
    <View style={styles.container}>
      {pageLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                borderColor: "#e6e6e6",
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                elevation: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}
              onPress={() =>
                job?.jobPostingTableFacilityTableId !== userId
                  ? Platform.OS === "web"
                    ? alert("You Can't edit this template.")
                    : Alert.alert("You Can't edit this template.")
                  : onEditJobNavigate(job)
              }
            >
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#000",
                  },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Template Name
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              {job?.jobTemplateName}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Template Type
            </Text>
            <Text style={{ color: "#00b359", fontSize: 12, marginTop: 5 }}>
              {job?.jobType}
            </Text>
          </View>

          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              License Type
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {job?.licenseType?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                      marginHorizontal: 5,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#595959" }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Shift Title
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              {job?.shiftTitle}
            </Text>
          </View>
          {/* <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Specialty{" "}
              {job?.specialtyRequired && (
                <Text style={{ color: "red" }}>*</Text>
              )}
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              {job?.specialty}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Certification{" "}
              {job?.certificationRequired && (
                <Text style={{ color: "red" }}>*</Text>
              )}
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {job?.certification?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                      marginHorizontal: 5,
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Experience Level{" "}
              {job?.experienceRequired && (
                <Text style={{ color: "red" }}>*</Text>
              )}
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              {job?.yearOfExperience}
            </Text>
          </View>
          {job?.EMRorEHRExperience !== null && (
            <View
              style={{
                marginVertical: 5,
                justifyContent: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 1.5,
                borderBottomColor: "#f2f2f2",
              }}
            >
              <Text
                style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
              >
                EMR or EHR Experience
                {job?.emrehrRequired && <Text style={{ color: "red" }}>*</Text>}
              </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {job?.EMRorEHRExperience?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                        marginHorizontal: 5,
                      }}
                    >
                      <Text style={{ fontSize: 12 }}>{item}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )} */}
          {/* <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Job Expiration
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              Before{" "}
              <Text style={{ fontWeight: "500" }}>{job?.expiration}</Text> hours
            </Text>
          </View> */}
          {job?.jobTiming !== null ? (
            <View
              style={{
                marginVertical: 5,
                justifyContent: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 1.5,
                borderBottomColor: "#f2f2f2",
              }}
            >
              <Text
                style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
              >
                Shift Times
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 10, color: "#000", marginRight: 5 }}>
                  {job?.jobTiming === "Morning" ? (
                    <Feather name="sun" size={12} color="black" />
                  ) : job?.jobTiming === "Afternoon" ? (
                    <Ionicons name="sunny-sharp" size={12} color="black" />
                  ) : job?.jobTiming === "Evening" ? (
                    <Ionicons
                      name="partly-sunny-outline"
                      size={12}
                      color="black"
                    />
                  ) : (
                    <Feather name="moon" size={12} color="black" />
                  )}
                </Text>
                <Text
                  style={{
                    color: "#595959",
                    fontSize: 12,
                  }}
                >
                  {job?.jobTiming}
                </Text>
              </View>
            </View>
          ) : null}
          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Shift Date
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              Start Date : {DateString(job?.startDate)} - End Date :{" "}
              {DateString(job?.endDate)}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Shift Time
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              Start Time : {moment(new Date(job?.startTime)).format("hh:mma")} -
              End Time : {moment(new Date(job?.endTime)).format("hh:mma")}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Break
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              {job?.break === "NA" ? "No Break" : job?.break}
            </Text>
          </View>

          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Customer Name{" "}
              {job?.customerVisibility && (
                <Text style={{ color: "red" }}>*</Text>
              )}
            </Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#595959",
                  fontSize: 12,
                  marginTop: 5,
                  flex: 1,
                }}
              >
                {job?.selectCustomer}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Address
            </Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#595959",
                  fontSize: 12,
                  marginTop: 5,
                  flex: 1,
                }}
              >
                {job?.fullAddress}
              </Text>

              <TouchableOpacity onPress={() => openMap(job?.fullAddress)}>
                <ImageBackground
                  source={require("../../../../assets/images/maps-icon.png")}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: "#00b359",
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
          </View>

          {job?.unit && (
            <View
              style={{
                marginVertical: 5,
                justifyContent: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 1.5,
                borderBottomColor: "#f2f2f2",
              }}
            >
              <Text
                style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
              >
                Unit / Floor
              </Text>
              <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                {job?.unit} - {job?.floor}
              </Text>
            </View>
          )}

          {/* <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Current Rate
            </Text>
            <Text style={{ color: "#00b359", fontSize: 12, marginTop: 5 }}>
              $ {job?.baseRate} / hr
            </Text>
          </View> */}

          {/* <View
            style={{
              marginVertical: 5,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}>
              Duration
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              {job?.jobDuration}
            </Text>
          </View> */}

          {job?.enableBid && job?.maxBidAmount && (
            <View
              style={{
                marginVertical: 5,
                justifyContent: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 1.5,
                borderBottomColor: "#f2f2f2",
              }}
            >
              <Text
                style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
              >
                Max Bid Amount
              </Text>
              <Text style={{ color: "#00b359", fontSize: 12, marginTop: 5 }}>
                $ {job?.maxBidAmount} / hr
              </Text>
            </View>
          )}

          {job?.notes !== null && job?.notes !== "" ? (
            <View
              style={{
                marginVertical: 5,
                justifyContent: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 1.5,
                borderBottomColor: "#f2f2f2",
              }}
            >
              <Text
                style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
              >
                Notes
              </Text>
              <Text
                style={{
                  color: "#595959",
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                {job?.notes}
              </Text>
            </View>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};

export default TemplateDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
