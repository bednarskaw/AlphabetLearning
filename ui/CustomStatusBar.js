import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBarColors } from '../constans/colors';

const CustomStatusBar = ({ percentage }) => {
  const [barColor, setBarColor] = useState(StatusBarColors.red300);

  useLayoutEffect(() => {
    if (percentage > 83.5) {
      setBarColor(StatusBarColors.green300);
    } else if (percentage > 67) {
      setBarColor(StatusBarColors.green200);
    } else if (percentage > 50.5) {
      setBarColor(StatusBarColors.green100);
    } else if (percentage > 34) {
      setBarColor(StatusBarColors.red100);
    } else if (percentage > 17.5) {
      setBarColor(StatusBarColors.red200);
    } else {
      setBarColor(StatusBarColors.red300);
    }
  }, [percentage]);

  return (
    <View style={styles.container}>
      <View style={[styles.statusBar, { width: `${percentage}%`, backgroundColor: barColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 30,
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginVertical: 15,
    justifyContent: 'center', // center vertically
    alignSelf: 'center', // center horizontally
  },
  statusBar: {
    height: 28,
    borderRadius: 5,
    // removed alignItems and justifyContent from this style
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomStatusBar;
