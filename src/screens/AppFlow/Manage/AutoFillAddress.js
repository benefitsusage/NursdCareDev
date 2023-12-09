import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import { SafeAreaView } from "react-native";

const GOOGLE_PLACES_API_KEY = "AIzaSyASI0r2SAGfynCLZxSeP0pBRju4hmWWrao";

const AutoFillAddress = ({ setShowAddress, jobState, setJobState }) => {
  const openMap = async (latitude, longitude, lat2, lon2) => {
    // const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    const url = `https://maps.google.com/?saddr=${latitude},${longitude}&daddr=${lat2},${lon2}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      throw new Error("Couldn't open the map.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => setShowAddress(false)}
          style={{
            backgroundColor: "#006002",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: "right",
              fontSize: 12,
              color: "#fff",
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Search your address here..."
        styles={{color: "#000"}}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en", // language of the results
        }}
        minLength={2}
        autoFocus={false}
        returnKeyType={"search"}
        listViewDisplayed="auto"
        fetchDetails
        onPress={(data, details = null) => {
          if (details && details.address_components) {
            setJobState({
              ...jobState,
              fullAddress: details.address_components
                .map((value) => value.long_name)
                .join(","),
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            setShowAddress(false);
          }
        }}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    backgroundColor: "#f1f1f1",
  },
});

export default AutoFillAddress;
