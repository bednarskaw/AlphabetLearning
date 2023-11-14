import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import BubbleButton from '../ui/BubbleButton';
import { generateRandomColor } from '../util/randomColor';
import { useFocusEffect } from '@react-navigation/native';
import LoadingView from './LoadingView';

const AnswerResult = ({ isCorrect, onNext, isFinished, finishedFunction }) => {
  const [customBackgroundColor, setCustomBackgroundColor] = useState(generateRandomColor());
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setCustomBackgroundColor(generateRandomColor());
      setLoading(false);
    }, [])
  );

  if (loading) {
    return <View style={ { backgroundColor: customBackgroundColor }}><LoadingView /></View>;
  }

  return (
    <View style={[styles.container, { backgroundColor: customBackgroundColor }]}>
      <Text style={styles.text}>{isCorrect ? 'Correct' : 'Incorrect'}</Text>
      {isFinished ? (
        <> 
          <Image source={{uri: "https://storage.googleapis.com/childrenapp_storage/bear-confetti.png"}} style={styles.image} />
          <Text style={styles.text}>Congratulations!</Text>
          <BubbleButton style={styles.button} title="Reset Alphabet" onPress={finishedFunction} />
        </>   
        ) : null}
      <BubbleButton title={isFinished ? 'Return' : (isCorrect ? 'Next Question' : 'Try Again')} onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 40
  },
  text: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Ninces',
    margin: 10
  },
  image: {
    width: 200,
    height: 200
  }
});

export default AnswerResult;
