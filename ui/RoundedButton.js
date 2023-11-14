import React, {useState} from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ButtonAndTextColors } from '../constans/colors';

const RoundedButton = ({iconName, onPress }) => {
  const colorKeys = Object.keys(ButtonAndTextColors);

  function generateColor() {
    return ButtonAndTextColors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
  };

  const [randomColor, setRandomColor] = useState(generateColor());

  return (
        <TouchableOpacity 
            onPress={() => {
                setRandomColor(generateColor());
                onPress();
            }} 
            style={{ marginHorizontal: 40 }}>
          <Ionicons name={iconName} size={50} color={randomColor} />
        </TouchableOpacity> 
  );
};


export default RoundedButton;
