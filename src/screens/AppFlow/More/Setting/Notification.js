import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomToggle from "./CustomToggle";
import { useState } from "react";

const Notification = () => {
  const [newPost, setNewPost] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const [jobCancel, setJobCancel] = useState(false);
  const [bidAccept, setBidAccept] = useState(false);
  const [bidExpiration, setBidExpiration] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#f3f3f3",
          paddingVertical: 5,
        }}
      >
        <Text>New Job Posts</Text>
        <CustomToggle
          state={newPost}
          onValueChange={(value) => setNewPost(value)}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#f3f3f3",
          paddingVertical: 5,
        }}
      >
        <Text>Clock In/Out</Text>
        <CustomToggle
          state={checkIn}
          onValueChange={(value) => setCheckIn(value)}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#f3f3f3",
          paddingVertical: 5,
        }}
      >
        <Text>Job Cancellation</Text>
        <CustomToggle
          state={jobCancel}
          onValueChange={(value) => setJobCancel(value)}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#f3f3f3",
          paddingVertical: 5,
        }}
      >
        <Text>Bid Accepted</Text>
        <CustomToggle
          state={bidAccept}
          onValueChange={(value) => setBidAccept(value)}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#f3f3f3",
          paddingVertical: 5,
        }}
      >
        <Text>Bid Expiration</Text>
        <CustomToggle
          state={bidExpiration}
          onValueChange={(value) => setBidExpiration(value)}
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
