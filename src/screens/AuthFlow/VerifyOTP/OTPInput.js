import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OTPVerificationScreen = ({ otpCode, setOtpCode }) => {
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleChange = (index, text) => {
    setOtpCode(otpCode.concat(text));
    if (index === 5) {
      return;
    }
    inputRefs.current[index + 1].current.focus();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRefs.current[0]}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={(text) => handleChange(0, text)}
      />
      <TextInput
        ref={inputRefs.current[1]}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={(text) => handleChange(1, text)}
      />
      <TextInput
        ref={inputRefs.current[2]}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={(text) => handleChange(2, text)}
      />
      <TextInput
        ref={inputRefs.current[3]}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={(text) => handleChange(3, text)}
      />
      <TextInput
        ref={inputRefs.current[4]}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={(text) => handleChange(4, text)}
      />
      <TextInput
        ref={inputRefs.current[5]}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={(text) => handleChange(5, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "#b3b3b3",
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    elevation: 3,
  },
});

export default OTPVerificationScreen;
