import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const ToggleSwitch = ({ state, onValueChange }) => {
  return (
    <View>
      <Switch
        value={state}
        onValueChange={onValueChange}
        thumbColor={state ? "green" : "gray"}
        trackColor={{ true: "lightgreen", false: "lightgray" }}
        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ToggleSwitch;
