import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import { DataStore } from "aws-amplify";
import { JobPostingTable, TimeOffFacility } from "../../../models";
import CalendarCard from "../Home/Card/CalendarCard";
import moment from "moment";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { PanResponder } from "react-native";

const CalendarScreen = (props) => {
  const onHomeScreenNavigate = () => {
    props?.navigation.navigate("ManagePage");
  };

  const animation = useRef(new Animated.Value(0)).current;
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAgenda, setLoadingAgenda] = useState(true);
  console.log("CalendarScreen", props?.userID);
  const [userId, setUserId] = useState(props?.userID);

  const [markedDates, setMarkedDates] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const [job, setJob] = useState(undefined);
  const [timeOff, setTimeOff] = useState(undefined);
  const [newItems, setNewItem] = useState(undefined);

  function convertDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  }

  //Get Jobs List in Particular Facility
  const getHospitalJob = async (id) => {
    const itemArr = await DataStore.query(JobPostingTable, (item) =>
      item.jobPostingTableFacilityTableId.eq(id)
    );
    setJob(itemArr);
  };

  //Get Jobs List in Selected Nurse
  const getFacilityTimeOff = async (id) => {
    const itemArr = await DataStore.query(TimeOffFacility, (item) =>
      item.facilityTableID.eq(id)
    );
    setTimeOff(itemArr);
  };

  useEffect(() => {
    if (userId !== undefined) {
      getHospitalJob(userId);
      getFacilityTimeOff(userId);
    }
  }, [userId]);

  const onJobDetailNavigate = (d) => {
    props?.navigation.navigate("JobDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    const subscription = DataStore.observe(JobPostingTable, (item) =>
      item.jobPostingTableFacilityTableId.eq(userId)
    ).subscribe((msg) => {
      if (msg.model === JobPostingTable && msg.opType === "INSERT") {
        setLoading(true);
        getHospitalJob(userId);
      }
      if (msg.model === JobPostingTable && msg.opType === "UPDATE") {
        setRefreshScreen(true);
      }
      if (msg.model === JobPostingTable && msg.opType === "DELETE") {
        setLoading(true);
        getHospitalJob(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  useEffect(() => {
    const subscription = DataStore.observe(TimeOffFacility, (item) =>
      item.facilityTableID.eq(userId)
    ).subscribe((msg) => {
      if (msg.model === TimeOffFacility && msg.opType === "INSERT") {
        setLoading(true);
        getFacilityTimeOff(userId);
      }
      if (msg.model === TimeOffFacility && msg.opType === "UPDATE") {
        setRefreshScreen(true);
      }
      if (msg.model === TimeOffFacility && msg.opType === "DELETE") {
        setLoading(true);
        getFacilityTimeOff(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  const renderItem = (element) => {
    return (
      <CalendarCard
        key={element?.id}
        element={element}
        onJobDetailNavigate={onJobDetailNavigate}
        userId={userId}
      />
    );
  };

  const colorHospital = "#00b359";

  const getAgendaData = async (id, date) => {
    setLoadingAgenda(true);
    const itemArrJob = await DataStore.query(JobPostingTable, (item) =>
      item.jobPostingTableFacilityTableId.eq(id)
    );
    const itemArrTimeOff = await DataStore.query(TimeOffFacility, (item) =>
      item.facilityTableID.eq(id)
    );
    let filterJob = itemArrJob.filter(
      (item) => convertDate(item.startDate) === date
    );
    let filterTime = itemArrTimeOff.filter(
      (item) => convertDate(item.startDate) === date
    );
    let mergedArray = filterJob.concat(filterTime);
    const convertedObject = mergedArray.reduce((acc, item) => {
      if (item?.shiftTitle) {
        if (convertDate(item?.startDate) !== convertDate(item?.endDate)) {
          const date1 = new Date(item?.startDate);
          const date2 = new Date(item?.endDate);
          const diffInMs = Math.abs(date2 - date1);
          const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
          for (let i = 0; i <= diffInDays; i++) {
            const date = new Date(date1);
            date.setDate(date1.getDate() + i);
            acc[convertDate(date)] = [
              {
                id: item.id,
                licenseType: item.licenseType,
                shiftTitle: item.shiftTitle,
                specialty: item.specialty,
                certification: item.certification,
                yearOfExperience: item.yearOfExperience,
                expiration: item.expiration,
                startDate: item.startDate,
                endDate: item.endDate,
                startTime: item.startTime,
                endTime: item.endTime,
                break: item.break,
                selectCustomer: item.selectCustomer,
                unit: item.unit,
                floor: item.floor,
                fullAddress: item.fullAddress,
                latitude: item.latitude,
                longitude: item.longitude,
                baseRate: item.baseRate,
                enableBid: item.enableBid,
                notes: item.notes,
                jobType: item.jobType,
                jobStatus: item.jobStatus,
                jobTiming: item.jobTiming,
                jobFinalSelectionNurseId: item.jobFinalSelectionNurseId,
                jobBitFinalAmount: item.jobBitFinalAmount,
                cardType: "job",
                createdAt: item.createdAt,
              },
            ];
          }
        } else if (!acc[convertDate(item.startDate)]) {
          acc[convertDate(item.startDate)] = [
            {
              id: item.id,
              licenseType: item.licenseType,
              shiftTitle: item.shiftTitle,
              specialty: item.specialty,
              certification: item.certification,
              yearOfExperience: item.yearOfExperience,
              expiration: item.expiration,
              startDate: item.startDate,
              endDate: item.endDate,
              startTime: item.startTime,
              endTime: item.endTime,
              break: item.break,
              selectCustomer: item.selectCustomer,
              unit: item.unit,
              floor: item.floor,
              fullAddress: item.fullAddress,
              latitude: item.latitude,
              longitude: item.longitude,
              baseRate: item.baseRate,
              enableBid: item.enableBid,
              notes: item.notes,
              jobType: item.jobType,
              jobStatus: item.jobStatus,
              jobTiming: item.jobTiming,
              jobFinalSelectionNurseId: item.jobFinalSelectionNurseId,
              jobBitFinalAmount: item.jobBitFinalAmount,
              createdAt: item.createdAt,
              cardType: "job",
            },
          ];
        } else {
          acc[convertDate(item.startDate)].push({
            id: item.id,
            licenseType: item.licenseType,
            shiftTitle: item.shiftTitle,
            specialty: item.specialty,
            certification: item.certification,
            yearOfExperience: item.yearOfExperience,
            expiration: item.expiration,
            startDate: item.startDate,
            endDate: item.endDate,
            startTime: item.startTime,
            endTime: item.endTime,
            break: item.break,
            selectCustomer: item.selectCustomer,
            unit: item.unit,
            floor: item.floor,
            fullAddress: item.fullAddress,
            latitude: item.latitude,
            longitude: item.longitude,
            baseRate: item.baseRate,
            enableBid: item.enableBid,
            notes: item.notes,
            jobType: item.jobType,
            jobStatus: item.jobStatus,
            jobTiming: item.jobTiming,
            jobFinalSelectionNurseId: item.jobFinalSelectionNurseId,
            jobBitFinalAmount: item.jobBitFinalAmount,
            cardType: "job",
            createdAt: item.createdAt,
          });
        }
      } else {
        if (convertDate(item?.startDate) !== convertDate(item?.endDate)) {
          const date1 = new Date(item?.startDate);
          const date2 = new Date(item?.endDate);
          const diffInMs = Math.abs(date2 - date1);
          const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
          for (let i = 0; i <= diffInDays; i++) {
            const date = new Date(date1);
            date.setDate(date1.getDate() + i);
            acc[convertDate(date)] = [
              {
                baseRate: undefined,
                break: undefined,
                cardType: "job",
                certification: undefined,
                enableBid: undefined,
                endDate: undefined,
                endTime: undefined,
                expiration: undefined,
                floor: undefined,
                fullAddress: undefined,
                id: undefined,
                jobBitFinalAmount: undefined,
                jobFinalSelectionNurseId: undefined,
                jobStatus: undefined,
                jobTiming: undefined,
                jobType: undefined,
                latitude: undefined,
                licenseType: undefined,
                longitude: undefined,
                notes: undefined,
                selectCustomer: undefined,
                shiftTitle: undefined,
                specialty: undefined,
                startDate: undefined,
                startTime: undefined,
                unit: undefined,
                yearOfExperience: undefined,
                createdAt: undefined,
              },
            ];
          }
        } else {
          acc[convertDate(item?.startDate)] = [
            {
              baseRate: undefined,
              break: undefined,
              cardType: "job",
              certification: undefined,
              enableBid: undefined,
              endDate: undefined,
              endTime: undefined,
              expiration: undefined,
              floor: undefined,
              fullAddress: undefined,
              id: undefined,
              jobBitFinalAmount: undefined,
              jobFinalSelectionNurseId: undefined,
              jobStatus: undefined,
              jobTiming: undefined,
              jobType: undefined,
              latitude: undefined,
              licenseType: undefined,
              longitude: undefined,
              notes: undefined,
              selectCustomer: undefined,
              shiftTitle: undefined,
              specialty: undefined,
              startDate: undefined,
              startTime: undefined,
              unit: undefined,
              yearOfExperience: undefined,
              createdAt: undefined,
            },
          ];
        }
      }
      return acc;
    }, {});
    setNewItem(convertedObject);
    setLoadingAgenda(false);
  };

  useEffect(() => {
    getAgendaData(userId, selectedDate);
  }, [userId, selectedDate]);

  const getCalender = (jodData, timeOffData) => {
    let mergedArray = jodData?.concat(timeOffData);

    const transformedEvents = mergedArray.map((event) => {
      const { startDate, endDate } = event;

      if (event?.shiftTitle) {
        if (startDate === endDate) {
          return {
            [convertDate(startDate)]: {
              startingDay: true,
              endingDay: true,
              marked: true,
              selected: true,
              backgroundColor: "blue",
              color: event?.jobType === "Shift" ? "#2775BD" : "green",
            },
          };
        } else if (startDate !== endDate) {
          const date1 = new Date(startDate);
          const date2 = new Date(endDate);
          const diffInMs = Math.abs(date2 - date1);
          const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

          const events = {};
          for (let i = 0; i <= diffInDays; i++) {
            const date = new Date(date1);
            date.setDate(date1.getDate() + i);
            events[convertDate(date)] = {
              startingDay: i === 0,
              endingDay: i === diffInDays,
              marked: i === 0 ? true : i === diffInDays ? true : false,
              selected: true,
              backgroundColor: "blue",
              color: event?.jobType === "Shift" ? "#2775BD" : "green",
            };
          }
          return events;
        }
      } else {
        if (startDate === endDate) {
          return {
            [convertDate(startDate)]: {
              startingDay: true,
              endingDay: true,
              marked: true,
              selected: true,
              backgroundColor: "blue",
              color: "red",
            },
          };
        } else if (startDate !== endDate) {
          const date1 = new Date(startDate);
          const date2 = new Date(endDate);
          const diffInMs = Math.abs(date2 - date1);
          const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

          const events = {};
          for (let i = 0; i <= diffInDays; i++) {
            const date = new Date(date1);
            date.setDate(date1.getDate() + i);
            events[convertDate(date)] = {
              startingDay: i === 0,
              endingDay: i === diffInDays,
              // marked: true,
              selected: true,
              backgroundColor: "blue",
              color: "red",
            };
          }

          return events;
        }
      }
    });
    let output = {};
    transformedEvents.forEach((obj) => {
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        output[key] = obj[key];
      });
    });
    setMarkedDates(output);
    setLoading(false);
    setRefreshScreen(false);
  };

  useEffect(() => {
    if (job !== undefined && timeOff !== undefined) {
      getCalender(job, timeOff);
    }
  }, [job, timeOff]);

  const handleRefresh = () => {
    getHospitalJob(userId);
    getFacilityTimeOff(userId);
  };

  useEffect(() => {
    if (refreshScreen) {
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
  }, [refreshScreen, animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 10],
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Check if the user is pulling down (you can adjust the threshold as needed)
      return gestureState.dy > 50;
    },
    onPanResponderRelease: () => {
      if (refreshScreen) {
        // User has released the touch, trigger refresh
        handleRefresh();
      }
    },
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        markedDates !== undefined && (
          <View
            style={{
              flex: 1,
            }}
          >
            {refreshScreen && (
              <View
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  paddingVertical: 20,
                  backgroundColor: "#fff",
                }}
              >
                <Animated.Text
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    marginTop: -10,
                    backgroundColor: "#fff",
                    transform: [{ translateY: translateY }],
                  }}
                >
                  Pull down{" "}
                  <AntDesign name="arrowdown" size={10} color="black" />
                </Animated.Text>
              </View>
            )}
            <View {...panResponder.panHandlers} style={{ flex: 1 }}>
              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  backgroundColor: "#fff",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 20,
                  }}
                >
                  <Entypo name="dot-single" size={24} color={"#2775BD"} />
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 12,
                      color: "#2775BD",
                    }}
                  >
                    Shift
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 20,
                  }}
                >
                  <Entypo name="dot-single" size={24} color={"green"} />
                  <Text
                    style={{ fontWeight: "500", fontSize: 12, color: "green" }}
                  >
                    Visit
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 20,
                  }}
                >
                  <Entypo name="dot-single" size={24} color={"red"} />
                  <Text
                    style={{ fontWeight: "500", fontSize: 12, color: "red" }}
                  >
                    Time Off
                  </Text>
                </View>
              </View> */}
              <Calendar
                // onDayPress={(day) => {
                //   const inputDate = new Date(day.dateString).toString();
                //   console.log(inputDate);
                //   console.log(convertDate(inputDate));
                //   setSelectedDate(day.dateString);
                // }}
                markingType={"period"}
                markedDates={markedDates}
              />
              {/* <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                {moment(selectedDate).format("MMMM")}
              </Text> */}
              {/* {loadingAgenda ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text>Loading...</Text>
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  <Agenda
                    // loadItemsForMonth={loadItems}
                    showClosingKnob={true}
                    showOnlySelectedDayItems={true}
                    items={newItems}
                    theme={{
                      dotColor: "#00b359",
                      selectedDayBackgroundColor: "#00b359",
                      selectedDayTextColor: "#e6f0ff",
                      selectedDotColor: "#e6f0ff",
                      "stylesheet.agenda.main": {
                        header: {
                          height: 0,
                          width: 0,
                        },
                        knobContainer: {
                          height: 0,
                          width: 0,
                        },
                        knob: {
                          height: 0,
                          width: 0,
                        },
                        weekdays: {
                          height: 0,
                          width: 0,
                        },
                        weekday: {
                          height: 0,
                          width: 0,
                        },
                        reservations: {
                          flex: 1,
                          marginTop: 5,
                        },
                      },
                    }}
                    renderEmptyData={() => (
                      <View
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          // backgroundColor: "#fff",
                        }}
                      >
                        <Text>No work is scheduled on this day</Text>
                        <TouchableOpacity
                          style={{
                            backgroundColor: colorHospital,
                            padding: 6,
                            width: "40%",
                            borderRadius: 5,
                            elevation: 5,
                            shadowColor: "gray",
                            shadowOpacity: 0.2,
                            shadowRadius: 1.5,
                            shadowOffset: {
                              width: 1,
                              height: 1,
                            },
                            marginVertical: 5,
                          }}
                          onPress={() => onHomeScreenNavigate()}
                        >
                          <Text
                            style={{
                              fontWeight: "500",
                              textAlign: "center",
                              color: "white",
                            }}
                          >
                            Add New Job
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    selected={selectedDate}
                    renderItem={renderItem}
                  />
                </View>
              )} */}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default CalendarScreen;
