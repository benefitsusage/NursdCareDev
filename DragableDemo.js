
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import {
  View,
  Text,
  PanResponder,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

const DraggableDemo = () => {
  const [draggingIndices, setDraggingIndices] = useState(null);
  const [scrollEnabled, setScroll] = useState(true);
  const [drop, setDrop] = useState(null);
  const [data, setData] = useState([
    { key: 'day1', values: [1, 2] },
    { key: 'day2', values: [3, 4] },
    { key: 'day3', values: [5, 6] },
    { key: 'day4', values: [7, 8] },
    { key: 'day5', values: [9, 10] },
    { key: 'day6', values: [11, 12] },
    { key: 'day7', values: [13, 14] },
  ]);

  const onValueLongPress = (rowIndex, itemIndex, value) => {
    setDraggingIndices({ rowIndex, itemIndex, value });
    setScroll(false)
  };

  console.log(draggingIndices)

  const findIndicesByCoordinate = (y) => {
    const rowIndex = Math.floor(y / 120); // Assuming each item has a height of 120
    const itemIndex = Math.min(data[rowIndex]?.values.length - 1, rowIndex);
    return { rowIndex, itemIndex };
  };

  const findIndexByCoordinate = (y) => {
    const index = Math.floor(y / 120); // Assuming each item has a height of 120
    return Math.min(data.length - 1, index);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !scrollEnabled,
    onMoveShouldSetPanResponder: () => !scrollEnabled,
    onPanResponderGrant: (e, gestureState) => {
      const { y0 } = gestureState;
      const { rowIndex, itemIndex } = findIndicesByCoordinate(y0);
      // console.log(rowIndex, itemIndex)
      // setDraggingIndices({ rowIndex, itemIndex });
    },
    onPanResponderMove: (e, gestureState) => {
      const translateY = gestureState.dy;
      const dropRowIndex = findIndexByCoordinate(gestureState.moveY);
      // console.log("drop", dropRowIndex)
      if (!scrollEnabled) {
        setDrop(dropRowIndex)
        setTranslateY(translateY);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (draggingIndices !== null) {
        const { rowIndex, itemIndex } = draggingIndices;
        const newData = [...data];
        const draggingItem = newData[rowIndex].values.splice(itemIndex, 1)[0];
        const dropRowIndex = findIndexByCoordinate(gestureState.moveY);
        // console.log("drop",dropRowIndex,draggingItem)
        newData[dropRowIndex].values.push(draggingItem);
        setData(newData);
        setDraggingIndices(null);
        setTranslateY(0);
        setScroll(true)
        setDrop(null)
      }
    },
  });

  const translateItemY = (index) => {
    if (index === draggingIndices?.rowIndex) {
      return translateItemYValue._value; // Access the numeric value directly
    }
    return 0;
  };

  const translateItemYValue = new Animated.Value(0);
  const setTranslateY = (value) => {
    translateItemYValue.setValue(value);
  };


  const renderItem = (item, rowIndex) => {
    const animatedStyle = {
      transform: [{ translateY: translateItemY(rowIndex) }],
    };

    return (
      <Animated.View
        style={[styles.item, animatedStyle,
        { backgroundColor: drop === rowIndex ? "green" : "lightblue" }]}
        key={item.key}
        {...panResponder.panHandlers}
      >
        <Text>{item.key}</Text>
        {item.values.map((value, itemIndex) => (
          <TouchableOpacity
            key={value}
            style={{
              backgroundColor: "#000",
              width: 40,
              height: 40,
              margin: 2,
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  scale: (!scrollEnabled && draggingIndices?.value === value)
                    ? 1.2 : 1
                },
              ],
            }}
            onLongPress={() => onValueLongPress(rowIndex, itemIndex, value)}
          >
            <Text style={{ color: "#fff" }}>{value}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={{ backgroundColor: "green" }}>
          {data.map((item, index) => renderItem(item, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'gray',
  },
});

export default DraggableDemo;

