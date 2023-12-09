import React, { useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const LoadingIndicator = () => {
  const [progress, setProgress] = useState(new Animated.Value(0.3));

  React.useEffect(() => {
    const animate = () => {
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setProgress(new Animated.Value(0));
          animate();
        }
      });
    };
  }, []);

  const height = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.percentage}>
        {(progress._value * 100).toFixed(0)}%
      </Text>
      <View style={styles.container}>
        <Animated.View style={[styles.loadingBar, { height: height }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 8,
    borderWidth: 1,
    borderColor: "#d5e6f6",
    backgroundColor: "#d5e6f6",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  loadingBar: {
    width: "100%",
    backgroundColor: "#2775BD",
    position: "absolute",
    bottom: 0,
  },
  percentage: {
    color: "#2775BD",
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default LoadingIndicator;
