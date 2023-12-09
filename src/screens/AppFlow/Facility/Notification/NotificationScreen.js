import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FacilityNotificationTable } from "../../../../models";
import { DataStore } from "aws-amplify";
import NotificationCard from "./NotificationCard";
import CustomDropDownNotification from "../../../../customComponents/DropDown/CustomDropDownNotification";

const NotificationScreen = (props) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  console.log(
    "NotificationScreen",
    props === undefined ? {} : props?.route?.params?.data?.id
  );
  const [userId, setUserId] = useState(
    props === undefined ? {} : props?.route?.params?.data?.id
  );

  const [selectedCards, setSelectedCards] = useState([]);
  const [selected, setSelected] = useState(false);

  const [lastDay, setLastDay] = useState("Last 10 days");

  useEffect(() => {
    if (userId !== undefined) {
      getFacilityNotification(userId, lastDay);
    }
  }, [userId, lastDay]);

  const getFacilityNotification = async (id, day) => {
    setData(undefined);

    try {
      const dateDay =
        day === "Last 10 days" ? 10 : day === "Last 30 days" ? 30 : 0;
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - dateDay);
      const facilityData = await DataStore.query(
        FacilityNotificationTable,
        (item) => item.facilityTableID.eq(id)
      ).then((items) =>
        items.filter((item) =>
          dateDay !== 0 ? new Date(item.createdAt) >= fiveDaysAgo : items
        )
      );
      setData(
        facilityData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setLoading(false);
    } catch (error) {
      console.log("data save error:", error);
    }
  };

  const optionsDoc = ["Last 10 days", "Last 30 days", "All Notification"];

  const onJobDetailNavigate = (screen, data) => {
    props.navigation.navigate(screen, {
      data: data,
    });
  };

  useEffect(() => {
    const subscription = DataStore.observe(FacilityNotificationTable, (item) =>
      item.facilityTableID.eq(userId)
    ).subscribe((msg) => {
      if (msg.model === FacilityNotificationTable && msg.opType === "INSERT") {
        getFacilityNotification(userId, lastDay);
      }
      if (msg.model === FacilityNotificationTable && msg.opType === "UPDATE") {
        getFacilityNotification(userId, lastDay);
      }
      // if (msg.model === FacilityNotificationTable && msg.opType === "DELETE") {
      //   getFacilityNotification(userId, lastDay);
      // }
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  const handleCardPress = (selectedElement) => {
    setSelectedCards((prevSelectedCards) => {
      const isSelected = prevSelectedCards.some(
        (card) => card.id === selectedElement.id
      );
      if (isSelected) {
        // Remove the card from the selected cards list
        return prevSelectedCards.filter(
          (card) => card.id !== selectedElement.id
        );
      } else {
        // Add the card to the selected cards list
        return [...prevSelectedCards, selectedElement];
      }
    });
  };

  useEffect(() => {
    if (!selected) {
      setSelectedCards([]);
    }
  }, [selected]);

  const deleteNotification = async () => {
    // for (let i = 0; i < selectedCards.length; i++) {
    //   await DataStore.delete(selectedCards[i]);
    //   handleCardPress(selectedCards[i]);
    // }
    // Create an array of promises for DataStore.delete operations
    const deletePromises = selectedCards.map(async (card) => {
      await DataStore.delete(card);
      handleCardPress(card);
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    // After all deletes are done, call getFacilityNotification
    getFacilityNotification(userId, lastDay);
    setSelected(false);
    setSelectedCards([]);
  };

  // const updateStatusNotification = async (data) => {
  //   const uJ = await DataStore.save(
  //     FacilityNotificationTable.copyOf(data, (updated) => {
  //       updated.visited = true;
  //     })
  //   );
  // };

  // const processNotification = async (data) => {
  //   const promises = [];

  //   const nonVisited = [];

  //   for (const item of data) {
  //     if (item?.visited === false) {
  //       nonVisited.push(item);
  //     }
  //   }

  //   if (nonVisited.length === 0) {
  //     setLoading(false);
  //     return;
  //   }

  //   if (nonVisited.length > 0) {
  //     for (const element of nonVisited) {
  //       promises.push(updateStatusNotification(element));
  //     }
  //   }

  //   if (promises.length > 0) {
  //     Promise.all(promises)
  //       .then(() => {
  //         getFacilityNotification(userId, lastDay);
  //       })
  //       .catch((e) => {
  //         console.log("Error updating job status", e);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (data !== undefined) {
  //     processNotification(data);
  //   }
  // }, [data]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : data?.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No New Notification</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                setSelected(!selected);
              }}
              style={{
                marginHorizontal: selectedCards.length !== 0 ? 15 : 0,
                paddingVertical: 3,
                paddingHorizontal: 10,
                backgroundColor: "#00b359",
                borderRadius: 5,
                elevation: 1,
                shadowOpacity: 0.2,
                marginTop: 5,
                shadowRadius: 3.5,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
              }}
            >
              <Text style={{ color: "#fff" }}>
                {selected ? "Cancel" : "Select"}
              </Text>
            </TouchableOpacity>
            {selectedCards.length !== 0 && (
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => {
                  Platform.OS === "web"
                    ? confirm(
                        "This will be permanently deleted, Continue?"
                      ).valueOf(true) && deleteNotification()
                    : Alert.alert(
                        "This will be permanently deleted, Continue?",
                        "",
                        [
                          {
                            text: "Yes",
                            onPress: () => deleteNotification(),
                          },
                          {
                            text: "No",
                            style: "cancel",
                          },
                        ]
                      );
                }}
                style={{
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  backgroundColor: "red",
                  borderRadius: 5,
                  elevation: 1,
                  shadowOpacity: 0.2,
                  shadowRadius: 3.5,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                }}
              >
                <Text style={{ color: "#fff" }}>Delete</Text>
              </TouchableOpacity>
            )}
          </View> */}
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginHorizontal: 20,
            }}
          >
            <CustomDropDownNotification
              container={{ flex: 1 }}
              options={optionsDoc}
              selectedValue={lastDay}
              onValueChange={(type) => setLastDay(type)}
            />
          </View>

          {data === undefined ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Loading...</Text>
            </View>
          ) : (
            data?.map((element, index) => {
              return (
                <NotificationCard
                  key={element?.id}
                  length={data?.length}
                  index={index}
                  element={element}
                  onPress={() =>
                    onJobDetailNavigate(
                      element?.navigationScreen,
                      element?.navigationData
                    )
                  }
                  onLongPress={() => handleCardPress(element)}
                  selectedCards={selectedCards}
                  selected={selected}
                />
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
