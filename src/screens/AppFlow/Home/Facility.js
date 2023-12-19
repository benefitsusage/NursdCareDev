import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, } from "react";
import FacilityCardDetail from "./Card/FacilityCardDetail";
import CustomInputSearch from "../../../customComponents/Input/CustomInputSearch";
import { FacilityTable } from "../../../models";
import { DataStore } from "aws-amplify";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Facility = ({ props, location_id, organization }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [dateSort, setDateSort] = useState(null);

  const onUserDetailNavigate = (d) => {
    props.navigation.navigate("FacilityDetailsScreen", {
      data: d,
    });
  };

  const getFacilityList = async (location, organization) => {
    try {
      const facilityList = await DataStore.query(FacilityTable, (item) =>
        item.and((c) => [c.organization.eq(organization), c.location_id.eq(location)])
      );
      setData(facilityList);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  //FacilityTable Insert
  useEffect(() => {
    if (location_id !== undefined || organization !== undefined) {
      getFacilityList(location_id, organization);
    }
  }, [location_id, organization]);

  useEffect(() => {
    const subscription = DataStore.observe(FacilityTable).subscribe((msg) => {
      if (location_id !== undefined && organization !== undefined) {
        if (msg.model === FacilityTable && msg.opType === "INSERT") {
          getFacilityList(location_id, organization);
        }
        if (msg.model === FacilityTable && msg.opType === "UPDATE") {
          console.log("HomeScreen FacilityTable", msg.opType);
          getFacilityList(location_id, organization);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [location_id, organization]);


  const handleChange = (e) => {
    setSearchText(e);
  };
  const handleChangeClear = () => {
    setSearchText("");
  };

  const filter = (data) => {
    return data?.filter(
      (item) =>
        item?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  if (dateSort) {
    data?.sort((a, b) => b?.name.localeCompare(a?.name));
  } else {
    data?.sort((a, b) => a?.name.localeCompare(b?.name));
  }

  const updateUser = async (data, value) => {
    await DataStore.save(
      FacilityTable.copyOf(data, (updated) => {
        updated.facilityLoginControl = value;
      })
    );
  };

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
              <Text>No manager under the location </Text>
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
                  placeholder="Search name. . ."
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
                  flex: 1,
                  flexDirection: "column",
                  marginBottom: Platform.OS === "ios" ? 30 : 50,
                }}
              >
                {filter(data)?.map((element, index) => {
                  return (
                    <FacilityCardDetail
                      key={element?.id}
                      element={element}
                      onUserDetailNavigate={onUserDetailNavigate}
                      updateUser={updateUser}
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
              props?.navigation.navigate("CreateFacilityScreen", {
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

export default Facility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
