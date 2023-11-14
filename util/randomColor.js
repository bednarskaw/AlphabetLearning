// utils.js
import { Colors, ButtonAndTextColors } from '../constans/colors';

export const generateRandomColor = (name) => {
    let colorKeys, randomColor;
    if (name === 'Colors'){
        colorKeys = Object.keys(Colors);
        randomColor = Colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]]
    } else {
        colorKeys = Object.keys(ButtonAndTextColors);
        randomColor = ButtonAndTextColors[colorKeys[Math.floor(Math.random() * colorKeys.length)]]
    }
  return  randomColor;
};
