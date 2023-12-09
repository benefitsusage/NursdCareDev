import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import MyPayCard from "../Card/MyPayCard";
import { JobPostingTable } from "../../../../models";
import { DataStore } from "aws-amplify";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomSliderFilter from "../../../../customComponents/CustomSliderFilter";
import { DateFormat } from "../../../../utils/function";

const Visit = ({ props }) => {
  const { width, height } = Dimensions.get("window");
  const [userId, setUserId] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(24);
  const [filterData, setFilterData] = useState([]);

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

  useEffect(() => {
    if (userId !== undefined) {
      getFacilityJob(userId);
    }
  }, [userId]);

  //Get Jobs List in Particular Facility
  const getFacilityJob = async (id) => {
    setLoading(true);
    const itemArr = await DataStore.query(
      JobPostingTable,
      (item) =>
        item.jobPostingTableFacilityTableId.eq(id) &&
        item.jobType.eq("Visit")
    );
    setData(
      itemArr
        .filter((item) => {
          return item.worked_hours !== null;
        })
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    );
    setFilterData(
      itemArr
        .filter((item) => {
          return item.worked_hours !== null;
        })
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    );
    setEnd(
      itemArr
        .filter((item) => {
          return item.worked_hours !== null;
        })
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).length -
        1
    );

    setLoading(false);
  };

  const onJobDetailNavigate = (d) => {
    props.navigation.navigate("JobDetailsScreen", {
      data: d,
    });
  };

  useEffect(() => {
    const subscription = DataStore.observe(JobPostingTable).subscribe((msg) => {
      if (msg.model === JobPostingTable && msg.opType === "UPDATE") {
        console.log("Visit JobPostingTable", msg.opType);
        getFacilityJob(userId);
      }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  const filterDataSet = (min, max) => {
    setFilterData(
      data?.filter((value, index) => {
        return index >= min && index <= max;
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
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              top: 5,
              marginTop: 20,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 12 }}>
              {DateFormat(
                filterData.sort(
                  (a, b) => new Date(b.startDate) - new Date(a.startDate)
                )[filterData.length - 1]?.startDate
              )}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {DateFormat(
                filterData.sort(
                  (a, b) => new Date(b.startDate) - new Date(a.startDate)
                )[0]?.startDate
              )}
            </Text>
          </View>
          <View style={{ marginBottom: 15, marginTop: -2 }}>
            <CustomSliderFilter
              sliderWidth={width / 1.5}
              min={0}
              max={end}
              step={1}
              type={""}
              label={false}
              color={"#006002"}
              onValueChange={(range) => {
                let { min, max } = range;
                filterDataSet(min, max);
              }}
              valueMin={0}
              valueMax={end}
              minDrag={true}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data?.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text>No Jobs</Text>
              </View>
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: Platform.OS === "ios" ? 60 : 90,
                }}
              >
                {/* <Text>{data?.length}</Text>
                <Text>{filterData?.length}</Text> */}
                {filterData
                  ?.sort(
                    (a, b) => new Date(b.startDate) - new Date(a.startDate)
                  )
                  ?.map((element, index) => {
                    return (
                      <MyPayCard
                        key={element?.id}
                        element={element}
                        onJobDetailNavigate={onJobDetailNavigate}
                        userId={userId}
                      />
                    );
                  })}
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Visit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
