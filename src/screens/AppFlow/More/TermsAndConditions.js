import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { StyleSheet } from "react-native";

const TermsAndConditions = () => {
  return (
    <View style={styles.container}>
      {/* <WebView source={{ uri: "https://docs.google.com/document/d/1frSiVwMckLGl11b2b0Hlcrd7f4Y4g37U/edit?rtpof=true" }} style={styles.webView} /> */}
      <WebView
        source={{
          uri: "https://www.nursdinc.com/terms",
        }}
        style={styles.webView}
      />
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
