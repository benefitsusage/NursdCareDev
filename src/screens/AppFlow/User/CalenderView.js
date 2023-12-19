import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { DataStore } from "aws-amplify";
import { JobPostingTable, TimeOffNurse } from "../../../models";
import { AntDesign } from "@expo/vector-icons";
import { convertDate } from "../../../utils/function";
import moment from "moment";

const CalendarScreen = (props) => {

  const [loading, setLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState(undefined);

  const [job, setJob] = useState(undefined);
  const [timeOff, setTimeOff] = useState(undefined);

  const animation = useRef(new Animated.Value(0)).current;
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [userId, setUserId] = useState(props?.userID);
  console.log("CalendarScreen", userId);

  useEffect(() => {
    if (userId !== undefined) {
      getNurseSelectedJob(userId);
      getNurseTimeOff(userId);
    }
  }, [userId]);

  const handleRefresh = () => {
    getNurseSelectedJob(userId);
  };

  //Get Jobs List in Selected Nurse
  const getNurseSelectedJob = async (id) => {
    const itemArr = await DataStore.query(JobPostingTable, (item) =>
      item.jobFinalSelectionNurseId.eq(id)
    );
    setJob(itemArr);
  };

  //Get Jobs List in Selected Nurse
  const getNurseTimeOff = async (id) => {
    const itemArr = await DataStore.query(TimeOffNurse, (item) =>
      item.nurseTableID.eq(id)
    );
    setTimeOff(itemArr);
  };

  const getCalender = (jodData, timeOffData) => {
    let mergedArray = jodData?.concat(timeOffData);
    const transformedEvents = mergedArray.map((event) => {
      const { startDate, endDate, status } = event;

      if (event?.shiftTitle) {
        if (event?.jobStatus === "Open") {
          // if (startDate === endDate) {
          return {
            [moment(startDate).format("YYYY-MM-DD")]: {
              startingDay: true,
              endingDay: true,
              marked: true,
              selected: true,
              backgroundColor: "blue",
              // color: event?.jobType === "Shift" ? "#2775BD" : "green",
              color:
                //  event?.jobType === "Shift" ? "#2775BD" : "green",
                event?.jobStatus === "Unfulfilled" ? "#888" :
                  (event?.jobStatus === "Open" || event?.jobStatus === "Pending Assignment") ? "#e6e600" :
                    (event?.jobStatus === "Completed") ? "#00b359" :
                      (event?.jobStatus === "Nurse Assigned" || event?.jobStatus === "In-Progress"
                        || event?.jobStatus === "Pending Approval") ? "#2775BD" :
                        (event?.jobStatus === "Missed" || event?.jobStatus === "Pending Clock Out") ? "red" :
                          "#888",
            },
          };
          // } else if (startDate !== endDate) {
          //   const date1 = new Date(startDate);
          //   const date2 = new Date(endDate);
          //   const diffInMs = Math.abs(date2 - date1);
          //   const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

          //   const events = {};
          //   for (let i = 0; i <= diffInDays; i++) {
          //     const date = new Date(date1);
          //     date.setDate(date1.getDate() + i + 1);
          //     events[moment(date).format("YYYY-MM-DD")] = {
          //       startingDay: i === 0,
          //       endingDay: i === diffInDays,
          //       marked: i === 0 ? true : i === diffInDays ? true : false,
          //       selected: true,
          //       backgroundColor: "blue",
          //       // color: event?.jobType === "Shift" ? "#2775BD" : "green",
          //       color: "grey",
          //     };
          //   }
          //   return events;
          // }
        } else {
          // if (startDate === endDate) {
          return {
            [moment(startDate).format("YYYY-MM-DD")]: {
              startingDay: true,
              endingDay: true,
              marked: true,
              selected: true,
              backgroundColor: "blue",
              color:
                //  event?.jobType === "Shift" ? "#2775BD" : "green",
                event?.jobStatus === "Unfulfilled" ? "#888" :
                  (event?.jobStatus === "Open" || event?.jobStatus === "Pending Assignment") ? "#e6e600" :
                    (event?.jobStatus === "Completed") ? "#00b359" :
                      (event?.jobStatus === "Nurse Assigned" || event?.jobStatus === "In-Progress"
                        || event?.jobStatus === "Pending Approval") ? "#2775BD" :
                        (event?.jobStatus === "Missed" || event?.jobStatus === "Pending Clock Out") ? "red" :
                          "#888",
            },
          };
          // } else if (startDate !== endDate) {
          //   const date1 = new Date(startDate);
          //   const date2 = new Date(endDate);
          //   const diffInMs = Math.abs(date2 - date1);
          //   const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

          //   const events = {};
          //   for (let i = 0; i <= diffInDays; i++) {
          //     const date = new Date(date1);
          //     date.setDate(date1.getDate() + i + 1);
          //     events[moment(date).format("YYYY-MM-DD")] = {
          //       startingDay: i === 0,
          //       endingDay: i === diffInDays,
          //       marked: i === 0 ? true : i === diffInDays ? true : false,
          //       selected: true,
          //       backgroundColor: "blue",
          //       color: event?.jobType === "Shift" ? "#2775BD" : "green",
          //     };
          //   }
          //   return events;
          // }
        }
      } else {
        // if (startDate === endDate) {
        return {
          [moment(startDate).format("YYYY-MM-DD")]: {
            startingDay: true,
            endingDay: true,
            marked: true,
            selected: true,
            backgroundColor: "blue",
            color: status === "Pending" ? "red" : "red",
          },
        };
        // } else if (startDate !== endDate) {
        //   const date1 = new Date(startDate);
        //   const date2 = new Date(endDate);
        //   const diffInMs = Math.abs(date2 - date1);
        //   const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        //   const events = {};
        //   for (let i = 0; i <= diffInDays; i++) {
        //     const date = new Date(date1);
        //     date.setDate(date1.getDate() + i + 1);
        //     events[moment(date).format("YYYY-MM-DD")] = {
        //       startingDay: i === 0,
        //       endingDay: i === diffInDays,
        //       // marked: true,
        //       selected: true,
        //       backgroundColor: "blue",
        //       color: status === "Pending" ? "red" : "red",
        //     };
        //   }

        //   return events;
        // }
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

  const colorNurse = "#2775BD";

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

  useEffect(() => {
    const subscription = DataStore.observe(JobPostingTable, (item) =>
      item.jobFinalSelectionNurseId.eq(userId)
    ).subscribe((msg) => {
      if (msg.model === JobPostingTable && msg.opType === "INSERT") {
        getNurseSelectedJob(userId);
      }
      if (msg.model === JobPostingTable && msg.opType === "UPDATE") {
        console.log("Calender Screen", msg.opType);
        setRefreshScreen(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [userId]);

  useEffect(() => {
    const subscription = DataStore.observe(TimeOffNurse, (item) =>
      item.nurseTableID.eq(userId)
    ).subscribe((msg) => {
      if (msg.model === TimeOffNurse && msg.opType === "INSERT") {
        getNurseTimeOff(userId);
      }
      if (msg.model === TimeOffNurse && msg.opType === "UPDATE") {
        console.log("Calender Screen TimeOffNurse UPDATE");
        setRefreshScreen(true);
      }
      if (msg.model === TimeOffNurse && msg.opType === "DELETE") {
        getNurseTimeOff(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#c",
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
              <Calendar
                // onDayPress={(day) => setSelectedDate(day.dateString)}
                markingType={"period"}
                markedDates={markedDates}
              />
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default CalendarScreen;
