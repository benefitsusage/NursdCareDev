import moment from "moment";
import { Text, Linking } from "react-native";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getTimeDifference(start, end) {
  // Convert start time to minutes since midnight
  let startArr = start.split(" ");
  let startMinutes =
    parseInt(startArr[0].split(":")[0]) * 60 +
    parseInt(startArr[0].split(":")[1]);
  if (startArr[1] === "PM" && startArr[0].split(":")[0] !== "12") {
    startMinutes += 12 * 60;
  }

  // Convert end time to minutes since midnight
  let endArr = end.split(" ");
  let endMinutes =
    parseInt(endArr[0].split(":")[0]) * 60 + parseInt(endArr[0].split(":")[1]);
  if (endArr[1] === "PM" && endArr[0].split(":")[0] !== "12") {
    endMinutes += 12 * 60;
  }

  // Calculate difference in minutes
  let diffMinutes = endMinutes - startMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  // Convert to hours and round to two decimal places
  let diffHours = Math.round((diffMinutes / 60) * 100) / 100;

  return diffHours;
}

export function jobUniqueId(date, type) {
  const momentDate = moment(new Date(date));
  const hour = momentDate.hours();
  const minute = momentDate.minutes();
  const second = momentDate.seconds();
  const millisecond = momentDate.milliseconds();

  let jobUniqueId = `${type === "Shift" ? "SFT" : "VST"} - ${moment(
    date
  ).format("YYYYMMDD")}-${hour < 10 ? "0" + hour : hour}${minute < 10 ? "0" + minute : minute
    }${second < 10 ? "0" + second : second}${millisecond}`;

  return jobUniqueId;
}

export function timeDifferent(sTime, eTime) {
  const startTime = moment(moment(new Date(sTime)).format("hh:mma"), "hh:mm A");

  const start = moment(new Date(sTime));
  const end = moment(new Date(eTime));

  const endTime = moment(moment(new Date(eTime)).format("hh:mma"), "hh:mm A");
  const endTimeEnd = moment(
    moment(new Date(eTime)).format("hh:mma"),
    "hh:mm A"
  ).add(1, "day");

  const duration = moment.duration(endTime.diff(startTime));
  const durationEnd = moment.duration(endTimeEnd.diff(startTime));

  const hours = Math.floor(duration.asHours());
  const hoursEnd = Math.floor(durationEnd.asHours());
  const minutes = Math.floor(duration.asMinutes()) - hours * 60;

  // const onlyHours = `${
  //   end.hour() <= 12 && start.hour() <= 12
  //     ? hours
  //     : end.hour() <= 12
  //     ? hoursEnd
  //     : hours
  // } ${
  //   end.hour() <= 12 && start.hour() <= 12
  //     ? hours <= 1
  //       ? "hour"
  //       : "hours"
  //     : end.hour() <= 12
  //     ? hoursEnd <= 1
  //       ? "hour"
  //       : "hours"
  //     : hours <= 1
  //     ? "hour"
  //     : "hours"
  // }`;

  const onlyHours = `${end.hour() <= 12 && start.hour() <= 12
    ? hours
    : end.hour() <= 12
      ? hoursEnd
      : hours
    }${hours <= 1 ? "hour" : "hours"} ${minutes <= 0 ? "" : `${minutes}minutes`}`;

  return onlyHours;
}

export function timeDifferentCard(sTime, eTime) {
  const startTime = moment(moment(new Date(sTime)).format("hh:mma"), "hh:mm A");

  const start = moment(new Date(sTime));
  const end = moment(new Date(eTime));

  const endTime = moment(moment(new Date(eTime)).format("hh:mma"), "hh:mm A");
  const endTimeEnd = moment(
    moment(new Date(eTime)).format("hh:mma"),
    "hh:mm A"
  ).add(1, "day");

  const duration = moment.duration(endTime.diff(startTime));
  const durationEnd = moment.duration(endTimeEnd.diff(startTime));

  const hours = Math.floor(duration.asHours());
  const hoursEnd = Math.floor(durationEnd.asHours());
  const minutes = Math.floor(duration.asMinutes()) - hours * 60;

  const onlyHours = `${end.hour() <= 12 && start.hour() <= 12
    ? hours
    : end.hour() <= 12
      ? hoursEnd
      : hours
    }${hours <= 1 ? "h" : "h"} ${minutes <= 0 ? "" : `${minutes}m`}`;

  return onlyHours;
}

export function totalAmount(sTime, eTime, baseRate) {
  const startTime = moment(moment(new Date(sTime)).format("hh:mma"), "hh:mm A");

  const start = moment(new Date(sTime));
  const end = moment(new Date(eTime));

  const endTime = moment(moment(new Date(eTime)).format("hh:mma"), "hh:mm A");
  const endTimeEnd = moment(
    moment(new Date(eTime)).format("hh:mma"),
    "hh:mm A"
  ).add(1, "day");

  const duration = moment.duration(endTime.diff(startTime));
  const durationEnd = moment.duration(endTimeEnd.diff(startTime));

  const hours = Math.floor(duration.asHours());
  const hoursEnd = Math.floor(durationEnd.asHours());
  // const minutes = Math.floor(duration.asMinutes()) - hours * 60;

  let durationInDecimal =
    end.hour() <= 12 && start.hour() <= 12
      ? hours
      : end.hour() <= 12
        ? hoursEnd
        : hours;
  let payment = durationInDecimal * baseRate;
  let paymentFormatted = payment.toFixed(2);
  let paymentInDollars = "$" + paymentFormatted.toString();

  return paymentInDollars;
}

export const openMap = async (from) => {
  const url = `https://maps.google.com/?q=${from}`;
  // const url = `https://maps.google.com/?saddr=${from},&daddr=${to}}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    throw new Error("Couldn't open the map.");
  }
};

export const formattedReturnTime = (value) => {
  const date = moment(value).format("hh:mm a");
  return date;
};

export function DateString(dateString) {
  const date = moment(dateString).format("MM-DD-YYYY");
  return (
    <Text>{date}</Text>
  );
}

export function convertDate(dateString) {
  const date = moment(dateString).format("YYYY-MM-DD");
  return date;
}

export const formatDate = (da) => {
  const date = moment(da).format("MM-DD-YYYY");
  return date;
};

export function DateFormat(dateString) {
  const date = moment(dateString).format("MMM DD");
  return date;
}
