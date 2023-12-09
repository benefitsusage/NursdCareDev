import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect, } from "react";
import UserCardDetail from "./Card/UserCardDetail";
import { NurseTable } from "../../../models";
import CustomInputSearch from "../../../customComponents/Input/CustomInputSearch";
import { DataStore } from "aws-amplify";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Nurse = ({ props, location_id, organization }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [dateSort, setDateSort] = useState(null);

  const onUserDetailNavigate = (d) => {
    props.navigation.navigate("UserDetailsScreen", {
      data: d,
    });
  };

  const getNurseList = async (location, organization) => {
    try {
      const nurseList = await DataStore.query(NurseTable, (item) =>
        item.and((c) => [c.organization.eq(organization), c.location_id.eq(location)])
      );
      setData(nurseList);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //NurseTable Insert
  useEffect(() => {
    if (location_id !== undefined || organization !== undefined) {
      getNurseList(location_id, organization);
    }
  }, [location_id, organization]);

  useEffect(() => {
    const subscription = DataStore.observe(NurseTable).subscribe((msg) => {
      if (location_id !== undefined && organization !== undefined) {
        if (msg.model === NurseTable && msg.opType === "INSERT") {
          getNurseList(location_id, organization);
        }
        if (msg.model === NurseTable && msg.opType === "UPDATE") {
          console.log("Nurse NurseTable", msg.opType);
          getNurseList(location_id, organization);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [location_id, organization]);

  const updateUser = async (data, value) => {
    await DataStore.save(
      NurseTable.copyOf(data, (updated) => {
        updated.nurseLoginControl = value;
      })
    );
  };

  const updateUserSuspend = async (data, value) => {
    await DataStore.save(
      NurseTable.copyOf(data, (updated) => {
        updated.nurseAppAcceControl = value;
      })
    );
  };

  const updateNurseVerifiedUser = async (data, value) => {
    await DataStore.save(
      NurseTable.copyOf(data, (updated) => {
        updated.nurseVerified = value;
      })
    );
  };

  const handleChange = (e) => {
    setSearchText(e);
  };
  const handleChangeClear = () => {
    setSearchText("");
  };

  const filter = (data) => {
    return data?.filter(
      (item) =>
        item?.firstName?.toLowerCase().includes(searchText?.toLowerCase()) ||
        item?.lastName?.toLowerCase().includes(searchText.toLowerCase())
      //  ||
      // item?.licenseType?.toLowerCase().includes(searchText?.toLowerCase())
    );
  };

  if (dateSort) {
    data?.sort((a, b) => b?.firstName.localeCompare(a?.firstName));
  } else {
    data?.sort((a, b) => a?.firstName.localeCompare(b?.firstName));
  }

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
          {data?.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text>No nurse under the location </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingBottom: 5,
                  marginHorizontal: 5,
                  alignItems: "center",
                  marginTop: 5,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CustomInputSearch
                  value={searchText}
                  placeholder="Search first or last name. . ."
                  keyboardType={"web-search"}
                  onChangeText={(text) => handleChange(text)}
                  clearValue={() => handleChangeClear()}
                />
                <TouchableOpacity onPress={() => setDateSort(!dateSort)} style={{ marginLeft: 5 }}>
                  <MaterialCommunityIcons name="sort" size={22} color="#595959" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: Platform.OS === "ios" ? 30 : 50,
                }}
              >
                {filter(data)?.map((element, index) => {
                  return (
                    <UserCardDetail
                      key={element?.id}
                      element={element}
                      updateUser={updateUser}
                      onUserDetailNavigate={onUserDetailNavigate}
                      updateUserSuspend={updateUserSuspend}
                      updateNurseVerifiedUser={updateNurseVerifiedUser}
                    />
                  );
                })}
              </View>
            </ScrollView>
          )}
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
              props?.navigation.navigate("CreateNurseScreen", {
                data: {
                  location_id,
                  organization,
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

export default Nurse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
