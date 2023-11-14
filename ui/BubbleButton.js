import React, {useState} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {ButtonAndTextColors} from '../constans/colors';
import { useCustomFonts } from './Font';

const BubbleButton = ({ title, onPress, style }) => {
  const colorKeys = Object.keys(ButtonAndTextColors);

  function generateColor() {
    return ButtonAndTextColors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
  };

  const [randomColor, setRandomColor] = useState(generateColor());
  const [fontsLoaded] = useCustomFonts(); 

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: randomColor }, style]} 
      onPress={() => {
        setRandomColor(generateColor());
        onPress();
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Ninces'
  },
});



export default BubbleButton;
