import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { useState } from "react";
import CustomInput from "../../../../customComponents/Input/CustomInput";
import AuthButton from "../../../../customComponents/Button/AuthButton";
import { useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Organisation } from "../../../../models";

const EditProfileForm = (props) => {
  const { width, height } = Dimensions.get("window");

  const [facilityData, setFacilityData] = useState({
    emailId: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (props.route.params.data) {
      setFacilityData({
        ...facilityData,
        emailId: props.route.params.data.emailId,
        phoneNumber: props.route.params.data.phoneNumber,
      });
    }
  }, [props.route.params.data]);

  const update = async (data) => {
    await DataStore.save(
      Organisation.copyOf(data, (updated) => {
        (updated.emailId = facilityData.emailId),
          (updated.phoneNumber = facilityData.phoneNumber);
      })
    );
    props.navigation.navigate("ProfileScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <CustomInput
              label={"Email ID"}
              required={true}
              onChangeText={(text) =>
                setFacilityData({ ...facilityData, emailId: text })
              }
              keyboardType={"email-address"}
              placeholder={"Email"}
              value={facilityData.emailId}
              clearValue={() =>
                setFacilityData({ ...facilityData, emailId: "" })
              }
              labelStyle={{
                marginHorizontal: 10,
              }}
              viewStyle={{
                height: 40,
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                elevation: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 0.5,
                borderColor: "#e6e6e6",
                marginHorizontal: 10,
                paddingRight: 10,
                justifyContent: "space-between",
              }}
              textInputStyle={{
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 12,
              }}
              iconStyle={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              editable={false}
            />
            <CustomInput
              label={"Phone Number"}
              required={true}
              onChangeText={(text) =>
                setFacilityData({ ...facilityData, phoneNumber: text })
              }
              keyboardType={"number-pad"}
              placeholder={"Phone Number"}
              value={facilityData.phoneNumber}
              clearValue={() =>
                setFacilityData({ ...facilityData, phoneNumber: "" })
              }
              labelStyle={{
                marginHorizontal: 10,
              }}
              viewStyle={{
                height: 40,
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                elevation: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 0.5,
                borderColor: "#e6e6e6",
                marginHorizontal: 10,
                paddingRight: 10,
                justifyContent: "space-between",
              }}
              textInputStyle={{
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 12,
              }}
              iconStyle={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 25,
            }}
          >
            <AuthButton
              name={"Save"}
              onPress={() => update(props.route.params.data)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
