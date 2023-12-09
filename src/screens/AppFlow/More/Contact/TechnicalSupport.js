import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import React from "react";

const TechnicalSupport = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../../assets/images/tech-support.jpg")}
        style={{
          width: 250,
          height: 250,
          marginTop: 80,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          fontSize: 15,
          color: "#737373",
          textAlign: "center",
        }}
      >
        Email to{" "}
        <Text
          style={{
            fontSize: 15,
            color: "#2775BD",
          }}
          onPress={() =>
            Linking.openURL(
              "mailto:support@nursdhealth.com?subject=Technical Support"
            )
          }
        >
          support@nursdhealth.com.
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: "#737373",
          textAlign: "center",
        }}
      >
        Someone will respond to you within next 24 hours.
      </Text>
    </View>
  );
};

export default TechnicalSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
