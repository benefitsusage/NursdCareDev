import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataStore } from "aws-amplify";
import {
  FacilityTable,
  JobPostingTable,
  TimeOffFacility,
} from "../../../models";
import CalendarCard from "../Home/Card/CalendarCard";
import moment from "moment";

const CalendarScreen = (props) => {
  const onHomeScreenNavigate = () => {
    props?.navigation.navigate("ManagePage");
  };

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(undefined);
  const [markedDates, setMarkedDates] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

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

  // const setTopData = (data) => {
  //   var rv = {};
  //   for (var i = 0; i < data?.length; ++i) {
  //     rv[convertDate(data[i].startDate)] = [
  //       {
  //         id: data[i].id,
  //         licenseType: data[i].licenseType,
  //         shiftTitle: data[i].shiftTitle,
  //         specialty: data[i].specialty,
  //         certification: data[i].certification,
  //         yearOfExperience: data[i].yearOfExperience,
  //         expiration: data[i].expiration,
  //         startDate: data[i].startDate,
  //         endDate: data[i].endDate,
  //         startTime: data[i].startTime,
  //         endTime: data[i].endTime,
  //         break: data[i].break,
  //         selectCustomer: data[i].selectCustomer,
  //         unit: data[i].unit,
  //         floor: data[i].floor,
  //         fullAddress: data[i].fullAddress,
  //         latitude: data[i].latitude,
  //         longitude: data[i].longitude,
  //         baseRate: data[i].baseRate,
  //         enableBid: data[i].enableBid,
  //         notes: data[i].notes,
  //         jobType: data[i].jobType,
  //         jobStatus: data[i].jobStatus,
  //         jobFinalSelectionNurseId: data[i].jobFinalSelectionNurseId,
  //         jobBitFinalAmount: data[i].jobBitFinalAmount,
  //       },
  //     ];
  //   }
  //   setNewItem(rv);
  // };

  const onJobDetailNavigate = (d) => {
    props?.navigation.navigate("JobDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    const subscription = DataStore.observe(JobPostingTable).subscribe((msg) => {
      if (msg.model === JobPostingTable && msg.opType === "INSERT") {
        getHospitalJob(userId);
      }
      if (msg.model === JobPostingTable && msg.opType === "UPDATE") {
        console.log("CalenderView JobPostingTable", msg.opType);
        getHospitalJob(userId);
      }
      if (msg.model === JobPostingTable && msg.opType === "DELETE") {
        getHospitalJob(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  useEffect(() => {
    const subscription = DataStore.observe(TimeOffFacility).subscribe((msg) => {
      if (msg.model === TimeOffFacility && msg.opType === "INSERT") {
        getFacilityTimeOff(userId);
      }
      if (msg.model === TimeOffFacility && msg.opType === "UPDATE") {
        console.log("CalenderView TimeOffFacility", msg.opType);
        getFacilityTimeOff(userId);
      }
      if (msg.model === TimeOffFacility && msg.opType === "DELETE") {
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

  const colorHospital = "#006002";

  // const [items, setItems] = useState({
  //   "2022-07-15": [{ name: "item 1 - any js object" }],
  //   "2022-07-06": [{ name: "item 2 - any js object", height: 80 }],
  //   "2022-07-17": [{ name: "item 3 - any js object", height: 80 }],
  //   "2022-07-18": [
  //     { name: "item 4 - any js object" },
  //     { name: "item 5 - any js object" },
  //   ],
  // });

  // const originalArray = [
  //   { name: "item 1 - any js object", date: "2022-07-15" },
  //   { name: "item 2 - any js object", date: "2022-07-16" },
  //   { name: "item 3 - any js object", date: "2022-07-17" },
  //   { name: "item 4 - any js object", date: "2022-07-18" },
  //   { name: "item 5 - any js object", date: "2022-07-18" },
  // ];

  // useEffect(() => {
  //   if (job !== undefined) {
  //     // setTopData(job);
  //     const convertedObject = job.reduce((acc, item) => {
  //       if (!acc[convertDate(item.startDate)]) {
  //         acc[convertDate(item.startDate)] = [
  //           {
  //             id: item.id,
  //             licenseType: item.licenseType,
  //             shiftTitle: item.shiftTitle,
  //             specialty: item.specialty,
  //             certification: item.certification,
  //             yearOfExperience: item.yearOfExperience,
  //             expiration: item.expiration,
  //             startDate: item.startDate,
  //             endDate: item.endDate,
  //             startTime: item.startTime,
  //             endTime: item.endTime,
  //             break: item.break,
  //             selectCustomer: item.selectCustomer,
  //             unit: item.unit,
  //             floor: item.floor,
  //             fullAddress: item.fullAddress,
  //             latitude: item.latitude,
  //             longitude: item.longitude,
  //             baseRate: item.baseRate,
  //             enableBid: item.enableBid,
  //             notes: item.notes,
  //             jobType: item.jobType,
  //             jobStatus: item.jobStatus,
  //             jobTiming: item.jobTiming,
  //             jobFinalSelectionNurseId: item.jobFinalSelectionNurseId,
  //             jobBitFinalAmount: item.jobBitFinalAmount,
  //             jobAutoIncrementId: item.jobAutoIncrementId,
  //           },
  //         ];
  //       } else {
  //         acc[convertDate(item.startDate)].push({
  //           id: item.id,
  //           licenseType: item.licenseType,
  //           shiftTitle: item.shiftTitle,
  //           specialty: item.specialty,
  //           certification: item.certification,
  //           yearOfExperience: item.yearOfExperience,
  //           expiration: item.expiration,
  //           startDate: item.startDate,
  //           endDate: item.endDate,
  //           startTime: item.startTime,
  //           endTime: item.endTime,
  //           break: item.break,
  //           selectCustomer: item.selectCustomer,
  //           unit: item.unit,
  //           floor: item.floor,
  //           fullAddress: item.fullAddress,
  //           latitude: item.latitude,
  //           longitude: item.longitude,
  //           baseRate: item.baseRate,
  //           enableBid: item.enableBid,
  //           notes: item.notes,
  //           jobType: item.jobType,
  //           jobStatus: item.jobStatus,
  //           jobTiming: item.jobTiming,
  //           jobFinalSelectionNurseId: item.jobFinalSelectionNurseId,
  //           jobBitFinalAmount: item.jobBitFinalAmount,
  //           jobAutoIncrementId: item.jobAutoIncrementId,
  //         });
  //       }
  //       return acc;
  //     }, {});
  //     setNewItem(convertedObject);
  //   }
  // }, [job]);

  useEffect(() => {
    if (job !== undefined && timeOff !== undefined) {
      let mergedArray = [...job, ...timeOff];
      // setTopData(job);
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
              },
            ];
          }
        }
        return acc;
      }, {});
      setNewItem(convertedObject);

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
                color: "#006002",
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
                color: "#006002",
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
    }
  }, [job, timeOff]);

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
        markedDates !== undefined &&
        newItems !== undefined && (
          <View
            style={{
              flex: 1,
            }}
          >
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markingType={"period"}
              markedDates={markedDates}
            />
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                color: "#000",
                fontWeight: "500",
              }}
            >
              {moment(selectedDate).format("MMMM")}
            </Text>
            <Agenda
              // loadItemsForMonth={loadItems}
              showClosingKnob={true}
              showOnlySelectedDayItems={true}
              items={newItems}
              theme={{
                dotColor: "#006002",
                selectedDayBackgroundColor: "#006002",
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
        )
      )}
    </View>
  );
};

export default CalendarScreen;
