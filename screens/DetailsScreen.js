// components/DetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, PanResponder, StyleSheet, Dimensions } from 'react-native';
import { textToSpeech } from '../util/text-to-speech';
import RoundedButton from '../ui/RoundedButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constans/colors';
import { generateRandomColor } from '../util/randomColor';
import { useOrientation } from '../util/orientation';

const DetailsScreen = ({ route, navigation }) => {
  const { data, category, selectedItem, dataUrl } = route.params;
  const [currentIndex, setCurrentIndex] = useState(data.indexOf(selectedItem));
  const [isAlphabet, setIsAlphabet] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [fontSize, setFontSize] = useState(60);
  const orientation = useOrientation();

  useEffect(() => {
    setCurrentIndex(data.indexOf(selectedItem));
    if (category !== 'Alphabet') {
      setIsAlphabet(false);
    }
  }, [selectedItem, data]);

  const updateFontSize = () => {
    const percentageOfWindowWidth = 0.1;
    const newFontSize = windowWidth * percentageOfWindowWidth;
    setFontSize(newFontSize);
  };

  useEffect(() => {
    updateFontSize();
  }, [windowWidth, windowHeight]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (evt, gestureState) => {
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        goToPreviousItem();
      } else if (gestureState.dx < -50) {
        goToNextItem();
      }
    },
  });

  const goToNextItem = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    updateFontSize();
  };

  const goToPreviousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    updateFontSize();
  };

  const handleTextToSpeech = async () => {
    textToSpeech(data[currentIndex]);
  };

  const imageStyle = {
    width: orientation === 'landscape' ? Dimensions.get('window').width * 0.3 : Dimensions.get('window').width,
    height: orientation === 'landscape' ? Dimensions.get('window').width * 0.2 : (isAlphabet ? Dimensions.get('window').height * 0.3 : Dimensions.get('window').height * 0.4),
  };

  return (
    <View
      style={ styles.container }
      {...panResponder.panHandlers}
    >
      <Image source={{ uri: dataUrl[currentIndex] }} 
        style={[styles.image, imageStyle]} />
      {isAlphabet ? '' : <Text style={[styles.text, {color: generateRandomColor(), fontSize}]}>{data[currentIndex]}</Text>}
      <View style={styles.buttonsContainer}>
        <RoundedButton iconName="caret-back-circle" onPress={goToPreviousItem} />
        <TouchableOpacity onPress={handleTextToSpeech}>
          <MaterialIcons name="speaker-phone" size={50} color={Colors.headerCol} />
        </TouchableOpacity>
        <RoundedButton iconName="caret-forward-circle" onPress={goToNextItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  image: {
    marginBottom: 20 
  },
  text: {
    fontFamily: 'Ninces',
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center' 
  }
});

export default DetailsScreen;
