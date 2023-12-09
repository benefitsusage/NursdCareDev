import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DataStore, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native";
import {
  FacilityTable,
  JobPostingTable,
  NurseTable,
  JobBitTable,
} from "../../../models";
import { Entypo, Feather, Ionicons, } from "@expo/vector-icons";
import AuthButton from "../../../customComponents/Button/AuthButton";
import {
  openMap,
  jobUniqueId,
  timeDifferent,
} from "../../../utils/function";
import moment from "moment";

const JobDetailsScreen = (props) => {
  const { width, height } = Dimensions.get("window");

  const jobId = props !== undefined && props?.route?.params?.data?.id;

  console.log("JobDetailsScreen", jobId);

  const [userId, setUserId] = useState(props?.userId);

  const [job, setJob] = useState(undefined);
  const [acceptedJobs, setAcceptedJobs] = useState(undefined);
  const [nurses, setNurses] = useState(undefined);
  const [pageLoading, setPageLoading] = useState(true);
  const [pendingNeverCheckOutModel, setPendingNeverCheckOutModel] =
    useState(false);
  const [pendingNeverCheckOutModelAction, setPendingNeverCheckOutModelAction] =
    useState(false);
  const [noShowViewModel, setNoShowViewModel] = useState(false);
  const [noShowViewModelAction, setNoShowViewModelAction] = useState(false);

  const [jobPostedFacilityDetails, setJobPostedFacilityDetails] =
    useState(undefined);
  const [jobApprovedFacilityDetails, setJobApprovedFacilityDetails] =
    useState(undefined);
  const [jobClosedByFacilityDetails, setJobClosedByFacilityDetails] =
    useState(undefined);

  const [
    pendingOrNoShowFacilityDecideMessage,
    setPendingOrNoShowFacilityDecideMessage,
  ] = useState("");

  const geBidDetail = async (id) => {
    try {
      const nurseData = await DataStore.query(JobBitTable, (item) =>
        item.jobBitTableJobPostingTableId.eq(id)
      );
      if (nurseData?.length !== 0) {
        setAcceptedJobs(nurseData);
      } else {
        setAcceptedJobs([]);
      }
    } catch (error) {
      console.log("data save error:", error);
    }
  };

  useEffect(() => {
    if (job?.enableBid) {
      geBidDetail(job?.id);
    }
  }, [job]);

  const getNurseDetail = async (id) => {
    if (id == null) {
      return [];
    } else {
      try {
        const nurseData = await DataStore.query(NurseTable, (item) =>
          item.id.eq(id)
        );
        return nurseData;
      } catch (error) {
        console.log("data save error:", error);
        return [];
      }
    }
  };

  const getNursesDetails = async (data) => {
    const nursePromises = data
      ?.filter((id) => id != null)
      .map((id) => getNurseDetail(id));
    const nursesData = await Promise.all(nursePromises);
    return nursesData;
  };

  useEffect(() => {
    if (job?.jobAcceptedNurses != null && job?.jobAcceptedNurses.length > 0) {
      getNursesDetails(job?.jobAcceptedNurses)
        .then((nursesData) => setNurses(nursesData))
        .catch((error) => console.error(error));
    }
  }, [job]);

  useEffect(() => {
    if (jobId !== undefined) {
      getUpdatedJob(jobId);
    }
  }, [jobId]);

  const downloadAndOpenPDF = async (name) => {
    // Download the PDF file to the device's file system

    const response = await Storage.get(name, {
      level: "public/",
    });
    // const localUri = FileSystem.documentDirectory + "filename.pdf";

    // await FileSystem.writeAsStringAsync(localUri, response.Body, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // return localUri;
    Linking.openURL(response.toString());
  };

  //Get Jobs List in Particular Facility
  const getUpdatedJob = async (id) => {
    const itemArr = await DataStore.query(JobPostingTable, (item) =>
      item.id.eq(id)
    );
    setJob(itemArr[0]);
  };

  //JobPostingTable Update
  useEffect(() => {
    const subscription = DataStore.observe(JobPostingTable, jobId).subscribe(
      (msg) => {
        if (msg.model === JobPostingTable && msg.opType === "UPDATE") {
          if (jobId !== undefined) {
            getUpdatedJob(jobId);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [jobId]);

  const getFacilityDetail = async (id) => {
    // console.log(id);
    try {
      const facilityData = await DataStore.query(FacilityTable, (item) =>
        item.id.eq(id)
      );
      return facilityData[0];
    } catch (error) {
      console.log("data save error:", error);
    }
  };

  const onUserDetailNavigate = (d) => {
    props.navigation.navigate("UserDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    if (job !== undefined) {
      getFacilityDetail(job?.jobPostingTableFacilityTableId).then((res) => {
        setJobPostedFacilityDetails(res);
        setPageLoading(false);
      });
      getFacilityDetail(job?.approved_manager).then((res) => {
        setJobApprovedFacilityDetails(res);
      });
      getFacilityDetail(job?.closed_by).then((res) => {
        setJobClosedByFacilityDetails(res);
      });
    }
  }, [job]);

  return (
    <View style={styles.container}>
      {pageLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          {jobPostedFacilityDetails && (
            <ScrollView showsVerticalScrollIndicator={false}>
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
                  Job ID
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {jobUniqueId(job?.createdAt, job?.jobType)}
                </Text>
                {/* <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              {job?.id}
            </Text> */}
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
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Job Status
                </Text>
                <Text
                  style={{
                    color:
                      job?.jobStatus === "Missed" ||
                        job?.jobStatus === "Pending Clock Out"
                        ? "red"
                        : "#00b359",
                    fontSize: 12,
                    marginTop: 5,
                  }}
                >
                  {/* {job?.jobFinalSelectionNurseId !== "" &&
              job?.checkInTime !== null &&
              job?.checkOutTime !== null
                ? "Completed"
                : job?.jobFinalSelectionNurseId !== "" &&
                  formatDate(job.startDate) >= currentDate &&
                  job?.jobFinalSelectionNurseId !== null &&
                  job?.checkInTime === null &&
                  job?.checkOutTime === null
                ? "Nurse Assigned"
                : formatDate(job?.startDate) < currentDate &&
                  (job.jobFinalSelectionNurseId === "" ||
                    job.jobFinalSelectionNurseId === null) &&
                  job?.checkInTime === null &&
                  job?.checkOutTime === null
                ? "Unfulfilled"
                : formatDate(job?.startDate) >= currentDate &&
                  (job.jobFinalSelectionNurseId === "" ||
                    job.jobFinalSelectionNurseId === null) &&
                  job?.jobAcceptedNurses.length !== 0 &&
                  job?.checkInTime === null &&
                  job?.checkOutTime === null
                ? "Pending Assignment"
                : job?.jobType === "Shift" &&
                  formatDate(job?.startDate) < currentDate &&
                  job?.jobFinalSelectionNurseId !== "" &&
                  job?.jobFinalSelectionNurseId !== null &&
                  job?.checkInTime === null &&
                  job?.checkOutTime === null
                ? "Missed"
                : job?.jobFinalSelectionNurseId !== "" &&
                  job?.jobFinalSelectionNurseId !== null &&
                  job?.checkInTime !== null &&
                  job?.checkInTime !== "" &&
                  job?.checkOutTime === null
                ? "In Progress"
                : "Open"} */}
                  {job?.jobStatus}
                </Text>
              </View>

              {jobPostedFacilityDetails === undefined ? null : (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Posted By
                  </Text>
                  <Text
                    style={{ color: "#595959", fontSize: 12, marginTop: 5 }}
                  >
                    {jobPostedFacilityDetails?.name}
                  </Text>
                </View>
              )}

              {jobApprovedFacilityDetails === undefined ? null : (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Approved By
                  </Text>
                  <Text
                    style={{ color: "#595959", fontSize: 12, marginTop: 5 }}
                  >
                    {jobApprovedFacilityDetails?.name}
                  </Text>
                </View>
              )}

              {job?.jobAcceptedNurses.length !== 0 && (
                <View
                  style={{
                    marginVertical: 5,
                    marginBottom: 20,
                    justifyContent: "center",
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1a1a1a",
                        fontWeight: "500",
                        fontSize: 15,
                      }}
                    >
                      Job Accepted List {job?.enableBid && "- With Bid Rate"}
                    </Text>
                  </View>
                  {nurses
                    ?.filter((i) => i?.id !== job?.jobFinalSelectionNurseId)
                    .flat()
                    .map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            paddingVertical: 10,
                            display: "flex",
                            marginHorizontal: 15,
                            marginTop: 10,
                            padding: 8,
                            backgroundColor:
                              job?.jobFinalSelectionNurseId === item?.id
                                ? "#e6ffee"
                                : "#fff",
                            borderRadius: 10,
                            elevation: 0.5,
                            shadowColor: "#00b359",
                          }}
                        >
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  borderWidth: 2,
                                  borderRadius: 10,
                                  borderColor: "#2775BD",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#fff",
                                  width: 60,
                                  height: 60,
                                  overflow: "hidden",
                                }}
                              >
                                {item?.profileImage ? (
                                  <S3Image
                                    imgKey={item?.profileImage}
                                    style={{
                                      width: 58,
                                      height: 58,
                                      borderRadius: 10,
                                    }}
                                    resizeMode="cover"
                                  />
                                ) : (
                                  <Image
                                    source={require("../../../../assets/images/icon.jpg")}
                                    style={{ width: 120, height: 120 }}
                                  />
                                )}
                              </View>

                              <View style={{ marginLeft: 5, flex: 1 }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Text
                                    style={{ fontSize: 16, fontWeight: "600" }}
                                  >
                                    {item?.firstName} {item?.lastName}
                                  </Text>
                                  {job?.jobFinalSelectionNurseId ===
                                    item?.id && (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Entypo
                                          name="dot-single"
                                          size={24}
                                          color={"#00b359"}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            fontWeight: "600",
                                            color: "#00b359",
                                          }}
                                        >
                                          Selected
                                        </Text>
                                      </View>
                                    )}
                                </View>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontWeight: "400",
                                      marginTop: 5,
                                    }}
                                  >
                                    {item?.primaryLicenseType}
                                  </Text>

                                  {acceptedJobs
                                    ?.filter(
                                      (value) =>
                                        value?.jobBitTableNurseTableId ===
                                        item?.id &&
                                        value?.jobBitTableJobPostingTableId ===
                                        jobId
                                    )
                                    .map((item, index) => (
                                      <Text
                                        key={index}
                                        style={{
                                          fontSize: 12,
                                          fontWeight: "600",
                                          color: "#000",
                                        }}
                                      >
                                        Bid:{" "}
                                        <Text
                                          key={item?.id}
                                          style={{
                                            fontSize: 12,
                                            fontWeight: "600",
                                            color: "#ff3333",
                                          }}
                                        >
                                          ${item?.bitAmount}
                                        </Text>
                                      </Text>
                                    ))}
                                  {/* {acceptedJobs?.map((value) =>
                              value?.jobBitTableNurseTableId === item?.id ? (
                                <Text
                                  key={item?.id}
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "600",
                                    color: "#ff3333",
                                  }}
                                >
                                  $ {value?.bitAmount}
                                </Text>
                              ) : null
                            )} */}
                                  {/* {acceptedJobs?.length === 0 ||
                            acceptedJobs?.length === undefined ? (
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: "600",
                                  color: "#00b359",
                                }}
                              >
                                $ {job?.baseRate}
                              </Text>
                            ) : null} */}
                                </View>
                              </View>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              marginTop: 10,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                backgroundColor: "#2775BD",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 8,
                                marginRight: 10,
                              }}
                              activeOpacity={0.5}
                              onPress={() =>
                                onUserDetailNavigate({
                                  id: item?.id,
                                  facilityId: userId,
                                })
                              }
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: "600",
                                  color: "#fff",
                                }}
                              >
                                View Profile
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                </View>
              )}
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
                  {job?.jobType === "Shift" ? "Shift" : "Visit"} Date
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  Start Date :  {moment(job?.startDate).format("MM-DD-YYYY")} - End Date :{" "}
                  {moment(job?.endDate).format("MM-DD-YYYY")}
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
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  {job?.jobType === "Shift" ? "Shift" : "Visit"} Time
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  Start Time :{" "}
                  {moment(new Date(job?.startTime)).format("hh:mma")} - End Time
                  : {moment(new Date(job?.endTime)).format("hh:mma")}
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
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Duration
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {timeDifferent(job?.startTime, job?.endTime)}
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
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
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
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  {job?.jobType === "Shift" ? "Shift" : "Visit"} Title
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
              Experience Level{" "}
              {job?.experienceRequired && (
                <Text style={{ color: "red" }}>*</Text>
              )}
            </Text>
            <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
              {job?.yearOfExperience}
            </Text>
          </View> */}
              {/* {job?.EMRorEHRExperience !== null && (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    {job?.jobType === "Shift" ? "Shift" : "Visit"} Times
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{ fontSize: 10, color: "#000", marginRight: 5 }}
                    >
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
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Break
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {job?.break === "NA" ? "No Break" : job?.break}
                </Text>
              </View>

              {job?.selectCustomer && (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
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
              )}

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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Unit / Floor
                  </Text>
                  <Text
                    style={{ color: "#595959", fontSize: 12, marginTop: 5 }}
                  >
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
                  Job Type
                </Text>
                <Text style={{ color: "#00b359", fontSize: 12, marginTop: 5 }}>
                  {job?.jobType}
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Max Bid Amount
                  </Text>
                  <Text
                    style={{ color: "#00b359", fontSize: 12, marginTop: 5 }}
                  >
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
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

              {job?.nurseCancelNotes !== null &&
                job?.nurseCancelNotes?.length !== 0 ? (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Nurse cancellation notes
                  </Text>
                  {job?.nurseCancelNotes?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginVertical: 5,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#595959",
                            fontSize: 12,
                          }}
                        >
                          Nurse : {item?.nurseName}
                        </Text>
                        <Text
                          style={{
                            color: "#595959",
                            fontSize: 12,
                            marginTop: 5,
                          }}
                        >
                          Reason : {item?.cancelNote}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              ) : null}

              {job?.nurseSwapNotes && (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Nurse Swap Reason
                  </Text>

                  <Text
                    style={{
                      color: "#595959",
                      fontSize: 12,
                      marginTop: 10,
                    }}
                  >
                    {job?.nurseSwapNotes}
                  </Text>
                </View>
              )}

              {job?.checkInTime !== null && (
                <View>
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
                      style={{
                        color: "#2775BD",
                        fontWeight: "500",
                        fontSize: 20,
                      }}
                    >
                      Clock In Details
                    </Text>
                    <Text
                      style={{ color: "#00b359", fontSize: 15, marginTop: 5 }}
                    >
                      Time ={" "}
                      {moment(new Date(job?.checkInTime)).format("hh:mma")}
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
                          flex: 1,
                        }}
                      >
                        {job?.checkInFullAddress}
                      </Text>

                      <TouchableOpacity
                        onPress={() => openMap(job?.checkInFullAddress)}
                      >
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
                </View>
              )}

              {job?.checkOutTime !== null && (
                <View>
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
                      style={{
                        color: "#2775BD",
                        fontWeight: "500",
                        fontSize: 20,
                      }}
                    >
                      Clock Out Details
                    </Text>
                    <Text
                      style={{ color: "#00b359", fontSize: 15, marginTop: 5 }}
                    >
                      Time ={" "}
                      {moment(new Date(job?.checkOutTime)).format("hh:mma")}
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
                          flex: 1,
                        }}
                      >
                        {job?.checkOutFullAddress}
                      </Text>

                      <TouchableOpacity
                        onPress={() => openMap(job?.checkOutFullAddress)}
                      >
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
                </View>
              )}

              {job?.pendingOrNoShowFacilityDecideMessage !== null &&
                job?.pendingOrNoShowFacilityDecideMessage !== "" ? (
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#1a1a1a",
                        fontWeight: "500",
                        fontSize: 15,
                      }}
                    >
                      Reviewer Notes{" "}
                    </Text>
                    {job?.neverCheckOutReason !== null && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor:
                              job?.pendingOrNoShowFacilityDecideMessage !==
                                null &&
                                !job?.pendingOrNoShowFacilityDecideStatus
                                ? "red"
                                : "#00b359",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 5,
                          }}
                          onPress={() => setPendingNeverCheckOutModel(true)}
                        >
                          <Text
                            style={{
                              textAlign: "right",
                              fontSize: 12,
                              color: "#fff",
                            }}
                          >
                            View Reason
                            {job?.pendingOrNoShowFacilityDecideMessage !==
                              null &&
                              !job?.pendingOrNoShowFacilityDecideStatus && (
                                <Text
                                  style={{
                                    textAlign: "right",
                                    fontSize: 12,
                                    marginRight: 10,
                                  }}
                                >
                                  -Not Approved
                                </Text>
                              )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {job?.noShowReason !== null && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor:
                              job?.pendingOrNoShowFacilityDecideMessage !==
                                null &&
                                !job?.pendingOrNoShowFacilityDecideStatus
                                ? "red"
                                : "#00b359",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 5,
                          }}
                          onPress={() => setNoShowViewModel(true)}
                        >
                          <Text
                            style={{
                              textAlign: "right",
                              fontSize: 12,
                              color: "#fff",
                            }}
                          >
                            View Reason
                            {job?.pendingOrNoShowFacilityDecideMessage !==
                              null &&
                              !job?.pendingOrNoShowFacilityDecideStatus && (
                                <Text
                                  style={{
                                    textAlign: "right",
                                    fontSize: 12,
                                    marginRight: 10,
                                  }}
                                >
                                  -Not Approved
                                </Text>
                              )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <Text
                    style={{
                      color: "#595959",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {job?.pendingOrNoShowFacilityDecideMessage}
                  </Text>
                </View>
              ) : null}

              {job?.pendingOrNoShowFacilityDecideMessage !== null &&
                job?.pendingOrNoShowFacilityDecideMessage !==
                "" ? null : job?.checkOutMessage !== null &&
                  job?.checkOutMessage !== "" ? (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Nurse Clock Out Notes
                  </Text>
                  <Text
                    style={{
                      color: "#595959",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {job?.checkOutMessage}
                  </Text>
                </View>
              ) : null}

              {job?.enableBid && (
                <View
                  style={{
                    marginTop: 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Bid is Enabled
                  </Text>

                  {job?.jobBitFinalAmount !== "" &&
                    job?.jobBitFinalAmount !== null ? (
                    <Text
                      style={{
                        color: "#595959",
                        fontSize: 12,
                        flex: 1,
                      }}
                    >
                      Bid Final Amount = $ {job?.jobBitFinalAmount}
                    </Text>
                  ) : null}
                </View>
              )}

              {jobClosedByFacilityDetails === undefined ? null : (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Closed By
                  </Text>
                  <Text
                    style={{ color: "#595959", fontSize: 12, marginTop: 5 }}
                  >
                    {jobClosedByFacilityDetails?.name}
                  </Text>
                </View>
              )}

              {job?.manager_review_comments && (
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
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Manager Approval Notes
                  </Text>

                  <Text
                    style={{
                      color: "#595959",
                      fontSize: 12,
                      marginTop: 10,
                    }}
                  >
                    {job?.manager_review_comments}
                  </Text>
                </View>
              )}

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
                  style={{
                    color: "#1a1a1a",
                    fontWeight: "500",
                    fontSize: 15,
                  }}
                >
                  Last Updated
                </Text>

                <Text
                  style={{
                    color: "#595959",
                    fontSize: 12,
                    marginTop: 10,
                  }}
                >
                  {moment(job?._lastChangedAt).format("MM-DD-YYYY h:mm a")}
                </Text>
              </View>

              {job?.jobStatus === "Missed" &&
                job?.noShowReason !== null &&
                job?.pendingOrNoShowFacilityDecideMessage === null && (
                  <View
                    style={{
                      marginVertical: 10,
                      marginBottom: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AuthButton
                      name={"View Reason"}
                      onPress={() => setNoShowViewModelAction(true)}
                    />
                  </View>
                )}
              {job?.jobStatus === "Pending Clock Out" &&
                job?.neverCheckOutReason !== null &&
                job?.pendingOrNoShowFacilityDecideMessage === null && (
                  <View
                    style={{
                      marginVertical: 10,
                      marginBottom: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AuthButton
                      name={"View Reason"}
                      onPress={() => setPendingNeverCheckOutModelAction(true)}
                    />
                  </View>
                )}
            </ScrollView>
          )}
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={noShowViewModelAction}
        onRequestClose={() => setNoShowViewModelAction(false)}
      >
        <View
          style={{
            height: height,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 15,
              width: 300,
              justifyContent: "center",
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              borderColor: "rgba(0, 0, 0, 0.1)",
              marginTop: 45,
            }}
          >
            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Missed {job?.jobType} Reason
              </Text>
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  borderRadius: 5,
                  elevation: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  marginHorizontal: 10,
                  paddingRight: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#000",
                    marginHorizontal: 10,
                  }}
                >
                  {job?.noShowReason}
                </Text>
              </View>
            </View>

            {job?.timeAdjustByNurse ? (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Requested Time Adjustment
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#00b359",
                        fontWeight: "500",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {job?.checkInTimeNurse !== "" &&
                        moment(new Date(job?.checkInTimeNurse)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#00b359",
                        fontWeight: "500",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {job?.checkOutTimeNurse !== "" &&
                        moment(new Date(job?.checkOutTimeNurse)).format(
                          "h:mma"
                        )}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Time Details
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {moment(new Date(job?.checkInTimeNurse)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {moment(new Date(job?.checkOutTimeNurse)).format("h:mma")}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {job?.noShowReasonAttachment && (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Attachment
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 5,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                  onPress={() =>
                    downloadAndOpenPDF(job?.noShowReasonAttachment?.toString())
                  }
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 12,
                      color: "#8888",
                      marginHorizontal: 10,
                    }}
                  >
                    Click to view the attachment
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {job?.pendingOrNoShowFacilityDecideMessage !== null &&
              !job?.pendingOrNoShowFacilityDecideStatus ? (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Reviewer Notes
                </Text>
                <View
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 5,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 12,
                      color: "#000",
                      marginHorizontal: 10,
                    }}
                  >
                    {job?.pendingOrNoShowFacilityDecideMessage}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Reviewer Notes <Text style={{ color: "red" }}>*</Text>
                </Text>

                <View
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 10,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    style={{
                      width: "90%",
                      padding: 2,
                      paddingLeft: 5,
                      fontSize: 12,
                      color: "#737373",
                    }}
                    multiline
                    onChangeText={(text) =>
                      setPendingOrNoShowFacilityDecideMessage(text)
                    }
                    value={pendingOrNoShowFacilityDecideMessage}
                    keyboardType={"default"}
                    autoCapitalize="sentences"
                    placeholderTextColor="#b3b3b3"
                    placeholder={"Message"}
                  />
                  <View
                    style={{
                      height: 40,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {pendingOrNoShowFacilityDecideMessage ? (
                      <TouchableOpacity
                        onPress={() =>
                          setPendingOrNoShowFacilityDecideMessage("")
                        }
                        style={{ marginLeft: 3 }}
                      >
                        <Ionicons
                          name="close-sharp"
                          size={22}
                          color="#808080"
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              </View>
            )}

            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              {/* {job?.pendingOrNoShowFacilityDecideMessage === null && (
                <TouchableOpacity
                  onPress={() => {
                    Platform.OS === "web"
                      ? confirm("Are you sure want to Approve?").valueOf(
                        true
                      ) && pendingOrNoShowFacilityDecide(job)
                      : Alert.alert("Are you sure want to Approve?", "", [
                        {
                          text: "Yes",
                          onPress: () => pendingOrNoShowFacilityDecide(job),
                        },
                        {
                          text: "No",
                          style: "cancel",
                        },
                      ]);
                  }}
                  style={{
                    backgroundColor: "#00b359",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    Approve
                  </Text>
                </TouchableOpacity>
              )}
              {job?.pendingOrNoShowFacilityDecideMessage === null && (
                <TouchableOpacity
                  onPress={() => {
                    Platform.OS === "web"
                      ? confirm("Proceed with Not-Approved?").valueOf(true) &&
                      pendingOrNoShowFacilityDecideCancel(job)
                      : Alert.alert("Proceed with Not-Approved?", "", [
                        {
                          text: "Yes",
                          onPress: () =>
                            pendingOrNoShowFacilityDecideCancel(job),
                        },
                        {
                          text: "No",
                          style: "cancel",
                        },
                      ]);
                  }}
                  style={{
                    backgroundColor: "red",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    Not Approved
                  </Text>
                </TouchableOpacity>
              )} */}
              <TouchableOpacity
                onPress={() => {
                  setNoShowViewModelAction(false);
                  setPendingOrNoShowFacilityDecideMessage("");
                }}
                style={{
                  backgroundColor: "gray",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={pendingNeverCheckOutModelAction}
        onRequestClose={() => setPendingNeverCheckOutModelAction(false)}
      >
        <View
          style={{
            height: height,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 15,
              width: 300,
              justifyContent: "center",
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              borderColor: "rgba(0, 0, 0, 0.1)",
              marginTop: 45,
            }}
          >
            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Pending Clock Out Reason
              </Text>
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  borderRadius: 5,
                  elevation: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  marginHorizontal: 10,
                  paddingRight: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#000",
                    marginHorizontal: 10,
                  }}
                >
                  {job?.neverCheckOutReason}
                </Text>
              </View>
            </View>

            {job?.timeAdjustByNurse ? (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Requested Time Adjustment
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#00b359",
                        fontWeight: "500",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {job?.checkInTime !== "" &&
                        moment(new Date(job?.checkInTime)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#00b359",
                        fontWeight: "500",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {job?.checkOutTimeNurse !== "" &&
                        moment(new Date(job?.checkOutTimeNurse)).format(
                          "h:mma"
                        )}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Time Details
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {moment(new Date(job?.checkInTime)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {moment(new Date(job?.checkOutTimeNurse)).format("h:mma")}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {job?.neverCheckOutReasonAttachment && (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Attachment
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 5,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                  onPress={() =>
                    downloadAndOpenPDF(
                      job?.neverCheckOutReasonAttachment?.toString()
                    )
                  }
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 12,
                      color: "#8888",
                      marginHorizontal: 10,
                    }}
                  >
                    Click to view the attachment
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {job?.pendingOrNoShowFacilityDecideMessage !== null &&
              !job?.pendingOrNoShowFacilityDecideStatus ? (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Reviewer Notes
                </Text>
                <View
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 5,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 12,
                      color: "#000",
                      marginHorizontal: 10,
                    }}
                  >
                    {job?.pendingOrNoShowFacilityDecideMessage}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Reviewer Notes <Text style={{ color: "red" }}>*</Text>
                </Text>

                <View
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 10,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    style={{
                      width: "90%",
                      padding: 2,
                      paddingLeft: 5,
                      fontSize: 12,
                      color: "#737373",
                    }}
                    multiline
                    onChangeText={(text) =>
                      setPendingOrNoShowFacilityDecideMessage(text)
                    }
                    value={pendingOrNoShowFacilityDecideMessage}
                    keyboardType={"default"}
                    autoCapitalize="sentences"
                    placeholderTextColor="#b3b3b3"
                    placeholder={"Message"}
                  />
                  <View
                    style={{
                      height: 40,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {pendingOrNoShowFacilityDecideMessage ? (
                      <TouchableOpacity
                        onPress={() =>
                          setPendingOrNoShowFacilityDecideMessage("")
                        }
                        style={{ marginLeft: 3 }}
                      >
                        <Ionicons
                          name="close-sharp"
                          size={22}
                          color="#808080"
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              </View>
            )}

            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              {/* {job?.pendingOrNoShowFacilityDecideMessage === null && (
                <TouchableOpacity
                  onPress={() => {
                    Platform.OS === "web"
                      ? confirm("Are you sure want to Approve?").valueOf(
                        true
                      ) && pendingJobOrNoShowFacilityDecide(job)
                      : Alert.alert("Are you sure want to Approve?", "", [
                        {
                          text: "Yes",
                          onPress: () =>
                            pendingJobOrNoShowFacilityDecide(job),
                        },
                        {
                          text: "No",
                          style: "cancel",
                        },
                      ]);
                  }}
                  style={{
                    backgroundColor: "#00b359",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    Approve
                  </Text>
                </TouchableOpacity>
              )}
              {job?.pendingOrNoShowFacilityDecideMessage === null && (
                <TouchableOpacity
                  onPress={() => {
                    Platform.OS === "web"
                      ? confirm("Proceed with Not-Approved?").valueOf(true) &&
                      pendingJobOrNoShowFacilityDecideCancel(job)
                      : Alert.alert("Proceed with Not-Approved?", "", [
                        {
                          text: "Yes",
                          onPress: () =>
                            pendingJobOrNoShowFacilityDecideCancel(job),
                        },
                        {
                          text: "No",
                          style: "cancel",
                        },
                      ]);
                  }}
                  style={{
                    backgroundColor: "red",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    Not Approved
                  </Text>
                </TouchableOpacity>
              )} */}
              <TouchableOpacity
                onPress={() => {
                  setPendingNeverCheckOutModelAction(false);
                  setPendingOrNoShowFacilityDecideMessage("");
                }}
                style={{
                  backgroundColor: "gray",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* {job?.jobFinalSelectionNurseId === null ||
      job?.jobFinalSelectionNurseId === "" ? null : (
        <TouchableOpacity
          style={{
            backgroundColor: "#00b359",
            width: 65,
            height: 65,
            borderRadius: 100,
            position: "absolute",
            bottom: 100,
            right: 35,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.8}
          onPress={() =>
            onAksQuestionChatRoomScreenNavigate({
              chatRoomId: "",
              nurseId: job?.jobFinalSelectionNurseId,
              facilityId: userId,
              job: job,
            })
          }
        >
          <Entypo name="message" size={35} color="white" />
        </TouchableOpacity>
      )} */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={noShowViewModel}
        onRequestClose={() => setNoShowViewModel(false)}
      >
        <View
          style={{
            height: height,
            // justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 15,
              // height: 150,
              width: 300,
              justifyContent: "center",
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              borderColor: "rgba(0, 0, 0, 0.1)",
              marginTop: 45,
            }}
          >
            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Missed {job?.jobType} Reason
              </Text>
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  borderRadius: 5,
                  elevation: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  marginHorizontal: 10,
                  paddingRight: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#000",
                    marginHorizontal: 10,
                  }}
                >
                  {job?.noShowReason}
                </Text>
              </View>
            </View>

            {job?.pendingOrNoShowFacilityDecideStatus ? (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Time Details
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {moment(new Date(job?.checkInTime)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {moment(new Date(job?.checkOutTime)).format("h:mma")}
                    </Text>
                  </View>
                </View>
              </View>
            ) : job?.timeAdjustByNurse ? (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Requested Time Adjustment
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#00b359",
                        fontWeight: "500",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {job?.checkInTime !== "" &&
                        moment(new Date(job?.checkInTime)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#00b359",
                        fontWeight: "500",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {job?.checkOutTime !== "" &&
                        moment(new Date(job?.checkOutTime)).format("h:mma")}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Time Details
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {moment(new Date(job?.checkInTime)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {moment(new Date(job?.checkOutTime)).format("h:mma")}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {job?.noShowReasonAttachment && (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Attachment
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 5,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                  onPress={() =>
                    downloadAndOpenPDF(job?.noShowReasonAttachment?.toString())
                  }
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 12,
                      color: "#8888",
                      marginHorizontal: 10,
                    }}
                  >
                    Click to view the attachment
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setNoShowViewModel(false);
                }}
                style={{
                  backgroundColor: "gray",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={pendingNeverCheckOutModel}
        onRequestClose={() => setPendingNeverCheckOutModel(false)}
      >
        <View
          style={{
            height: height,
            // justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 15,
              // height: 150,
              width: 300,
              justifyContent: "center",
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              borderColor: "rgba(0, 0, 0, 0.1)",
              marginTop: 45,
            }}
          >
            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "#737373",
                  marginHorizontal: 10,
                }}
              >
                Pending Clock Out Reason
              </Text>
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  borderRadius: 5,
                  elevation: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#e6e6e6",
                  marginHorizontal: 10,
                  paddingRight: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#000",
                    marginHorizontal: 10,
                  }}
                >
                  {job?.neverCheckOutReason}
                </Text>
              </View>
            </View>

            {job?.pendingOrNoShowFacilityDecideStatus ? (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Time Details
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {moment(new Date(job?.checkInTime)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {moment(new Date(job?.checkOutTime)).format("h:mma")}
                    </Text>
                  </View>
                </View>
              </View>
            ) : job?.timeAdjustByNurse ? (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Requested Time Adjustment
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#00b359",
                        fontWeight: "500",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {job?.checkInTime !== "" &&
                        moment(new Date(job?.checkInTime)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#00b359",
                        fontWeight: "500",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {job?.checkOutTimeNurse !== "" &&
                        moment(new Date(job?.checkOutTimeNurse)).format(
                          "h:mma"
                        )}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Time Details
                </Text>
                <View
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    alignItems: "flex-start",
                    // justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock In Time -{" "}
                      {moment(new Date(job?.checkInTime)).format("h:mma")}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#00b359",
                        fontWeight: "600",
                        marginHorizontal: 10,
                        textDecorationLine: "underline",
                      }}
                    >
                      Clock Out Time -{" "}
                      {moment(new Date(job?.checkOutTimeNurse)).format("h:mma")}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {job?.neverCheckOutReasonAttachment && (
              <View>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 12,
                    color: "#737373",
                    marginHorizontal: 10,
                  }}
                >
                  Attachment
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 5,
                    elevation: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#e6e6e6",
                    marginHorizontal: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                  onPress={() =>
                    downloadAndOpenPDF(
                      job?.neverCheckOutReasonAttachment?.toString()
                    )
                  }
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 12,
                      color: "#8888",
                      marginHorizontal: 10,
                    }}
                  >
                    Click to view the attachment
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPendingNeverCheckOutModel(false);
                }}
                style={{
                  backgroundColor: "gray",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>




    </View>
  );
};

export default JobDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
