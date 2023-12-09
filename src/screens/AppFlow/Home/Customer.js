import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomerCardDetail from "./Card/CustomerCardDetail";
import { CustomerPatient } from "../../../models";
import { DataStore } from "aws-amplify";
import { MaterialIcons } from "@expo/vector-icons";

const Facility = ({ props, location_id }) => {
  const { width, height } = Dimensions.get("window");
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(undefined);

  const onUserDetailNavigate = (d) => {
    props.navigation.navigate("CustomerDetailsScreen", {
      data: d,
    });
  };

  const getCustomerList = async (location) => {
    console.log(location);
    try {
      const nurseList = await DataStore.query(CustomerPatient, (item) =>
        item.location_id.eq(location)
      );
      setData(nurseList);
    } catch (error) {
      console.log(error);
    }
  };

  //CustomerPatient Insert
  useEffect(() => {
    if (location_id !== undefined) {
      getCustomerList(location_id);
    }
  }, [location_id]);

  useEffect(() => {
    const subscription = DataStore.observe(CustomerPatient).subscribe((msg) => {
      if (location_id !== undefined) {
        if (msg.model === CustomerPatient && msg.opType === "INSERT") {
          getCustomerList(location_id);
        }
        if (msg.model === CustomerPatient && msg.opType === "UPDATE") {
          console.log("HomeScreen CustomerPatient", msg.opType);
          getCustomerList(location_id);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [location_id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                marginBottom: Platform.OS === "ios" ? 30 : 50,
              }}
            >
              {data?.map((element, index) => {
                return (
                  <CustomerCardDetail
                    key={element?.id}
                    element={element}
                    // onUserDetailNavigate={onUserDetailNavigate}
                    userId={userId}
                  />
                );
              })}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{
              backgroundColor: "#006002",
              width: 60,
              height: 60,
              borderRadius: 100,
              position: "absolute",
              bottom: 100,
              right: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.8}
            onPress={() =>
              props?.navigation.navigate("CreateFacilityScreen", {
                data: {
                  location_id,
                },
              })
            }
          >
            <MaterialIcons name="add" size={35} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Facility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
