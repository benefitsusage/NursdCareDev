// import { CourierClient } from "@trycourier/courier";
import { DataStore } from "aws-amplify";
import { NurseTable } from "../models";

// const courier = CourierClient({
//   authorizationToken: "pk_test_0BD69Z2GTGMH98JVCQQGTQRHVNYE",
// });

// export const sendNewPushNotification = async (data) => {
//   const { expoPushToken, job, typeMessage, screen } = data;

//   console.log("expoPushToken", expoPushToken);
//   const requestId = await courier.send({
//     message: {
//       to: {
//         expo: {
//           token: expoPushToken,
//         },
//       },
//       content: {
//         title: job,
//         body: typeMessage,
//       },
//       data: { screen: screen },
//     },
//   });
//   console.log(requestId);
// };

export const sendNewPushNotification = async (data) => {
  const { expoPushToken, job, typeMessage, screen } = data;
  console.log("expoPushToken", expoPushToken);
  const message = {
    to: expoPushToken,
    sound: "default",
    title: job,
    body: typeMessage,
    data: { screen: screen },
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const responseData = await response.json();
  console.log("responseData", responseData);
};

// export const sendNewJobPushNotification = async (data) => {
//   const { expoPushToken, job, typeMessage, screen, jobIds } = data;

//   console.log("expoPushToken", expoPushToken);
//   const requestId = await courier.send({
//     message: {
//       to: {
//         expo: {
//           token: expoPushToken,
//         },
//       },
//       content: {
//         title: job,
//         body: typeMessage,
//       },
//       data: { jobIds: jobIds, screen: screen },
//     },
//   });
//   console.log(requestId);
// };

export const sendNewJobPushNotification = async (data) => {
  const { expoPushToken, job, typeMessage, screen, jobIds } = data;
  console.log("expoPushToken", expoPushToken);
  const message = {
    to: expoPushToken,
    sound: "default",
    title: job,
    body: typeMessage,
    data: { jobIds: jobIds, screen: screen },
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const responseData = await response.json();
  console.log("responseData", responseData);
};

// export const sendPushNotification = async (data) => {
//   const { expoPushToken, job, typeMessage, jobId } = data;

//   console.log("expoPushToken", expoPushToken);
//   const requestId = await courier.send({
//     message: {
//       to: {
//         expo: {
//           token: expoPushToken,
//         },
//       },
//       content: {
//         title: job,
//         body: typeMessage,
//       },
//       data: { jobId: jobId, screen: "JobDetailScreen" },
//     },
//   });
//   console.log(requestId);
// };

export const sendPushNotification = async (data) => {
  const { expoPushToken, job, typeMessage, jobId } = data;
  console.log("expoPushToken", expoPushToken);
  const message = {
    to: expoPushToken,
    sound: "default",
    title: job,
    body: typeMessage,
    data: { jobId: jobId, screen: "JobDetailScreen" },
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const responseData = await response.json();
  console.log("responseData", responseData);
};

// export const sendChatPushNotification = async (data) => {
//   const { expoPushToken, name, typeMessage, facilityId, nurseId } = data;

//   console.log("expoPushToken", expoPushToken);
//   const requestId = await courier.send({
//     message: {
//       to: {
//         expo: {
//           token: expoPushToken,
//         },
//       },
//       content: {
//         title: name,
//         body: typeMessage,
//       },
//       sound: "../assets/audio/mySoundFile.wav",
//       data: {
//         facilityId: facilityId,
//         nurseId: nurseId,
//         screen: "ChatRoomScreen",
//       },
//     },
//   });
//   console.log(requestId);
// };

export const sendChatPushNotification = async (data) => {
  const { expoPushToken, name, typeMessage, facilityId, nurseId } = data;
  console.log("expoPushToken", expoPushToken);
  const message = {
    to: expoPushToken,
    sound: "default",
    title: name,
    body: typeMessage,
    data: {
      facilityId: facilityId,
      nurseId: nurseId,
      screen: "ChatRoomScreen",
    },
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const responseData = await response.json();
  console.log("responseData", responseData);
};

export const sendNewJobNotification = async (item) => {
  const userList = await DataStore.query(NurseTable);

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d / 1.609344; // Distance in miles
  }

  const data = userList.filter((nurseData) => {
    const lowestYear = nurseData?.workExperienceDetails?.reduce(
      (lowest, employment) => {
        const year = new Date(employment?.startDate).getFullYear();
        return year < lowest ? year : lowest;
      },
      new Date().getFullYear()
    );
    const experience = new Date().getFullYear() - lowestYear;
    return (
      item?.licenseType?.some((i) => i === nurseData?.primaryLicenseType) &&
      item?.fullAddress?.includes(
        nurseData?.jobPreferences?.notLicensedStateHideJobs
          ? nurseData?.primaryState
          : ""
      ) &&
      (nurseData?.jobPreferences?.timing?.length !== 0
        ? nurseData?.jobPreferences?.timing?.includes(item?.jobTiming)
        : item) &&
      (nurseData?.jobPreferences?.days?.length !== 0
        ? nurseData?.jobPreferences?.days?.includes(
          moment(item?.startDate).format("ddd")
        )
        : item) &&
      // getDistance(
      //   nurseData?.latitude,
      //   nurseData?.longitude,
      //   item?.latitude,
      //   item?.longitude
      // ).toFixed(0) >=
      //   (nurseData?.jobPreferences?.minDistance === null
      //     ? 1
      //     : parseInt(nurseData?.jobPreferences?.minDistance)) &&
      getDistance(
        nurseData?.latitude,
        nurseData?.longitude,
        item?.latitude,
        item?.longitude
      ).toFixed(0) <=
      (nurseData?.jobPreferences?.maxDistance === null
        ? 100
        : parseInt(nurseData?.jobPreferences?.maxDistance)) &&
      item?.baseRate >=
      (nurseData?.jobPreferences?.minRate === null
        ? 1
        : parseInt(nurseData?.jobPreferences?.minRate)) &&
      //      &&
      // item?.baseRate <=
      //   (nurseData?.jobPreferences?.maxRate === null
      //     ? 100
      //     : parseInt(nurseData?.jobPreferences?.maxRate))
      (item?.specialtyRequired === true
        ? nurseData?.specialty?.includes(item?.specialty)
        : item?.specialtyRequired === null
          ? item
          : item) &&
      (item?.certificationRequired === true
        ? item?.certification.some((value) =>
          nurseData?.certificationDetails?.some(
            (va) => va?.certificationType === value
          )
        )
        : item?.certificationRequired === null
          ? item
          : item) &&
      (item?.experienceRequired
        ? item?.yearOfExperience === "0 - 1 year"
          ? experience <= 1
          : item?.yearOfExperience === "1 - 2 years"
            ? experience >= 1 && experience <= 2
            : item?.yearOfExperience === "2+ years"
              ? experience >= 2
              : true
        : item?.experienceRequired === null
          ? item
          : item) &&
      (item?.emrehrRequired === true
        ? item?.EMRorEHRExperience.some((value) =>
          nurseData?.EMRorEHRExperience?.some((va) => va === value)
        )
        : item?.emrehrRequired === null
          ? item
          : item)
    );
  });

  return data;
};
