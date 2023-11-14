// components/LearnOrAnswerScreen.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Platform, StatusBar } from 'react-native';
import { useStatus } from '../store/StatusContext';
import AnswerResult from '../components/AnswerResult'
import Card from '../components/Card';
import { useOrientation } from '../util/orientation';

const LearnOrAnswerScreen = ({ navigation, route }) => {
  const {lastLearnedAlphabetIdx, updateLastLearnedAlphabetIdx} = useStatus();
  const { category } = route.params;
  const [endScreen, setEndScreen] = useState(false);
  const orientation = useOrientation();
  
  const resetAlphabet = () => {
    updateLastLearnedAlphabetIdx(0);
    navigation.goBack();
  }

  const handleLearnPress = () => {
    if(category === 'Alphabet') {
      if (lastLearnedAlphabetIdx !== -1) {
      navigation.navigate('Answers', { questionIndex: lastLearnedAlphabetIdx, category: category});
      } else {
        setEndScreen(true);
      }
    } else {
       navigation.navigate('Answers', { questionIndex: 0, category: category});
    }
  };

  if (endScreen){
    return <AnswerResult isCorrect={true} isFinished={true} onNext={() => navigation.goBack()} finishedFunction={resetAlphabet} />;
  };

  const cardStyle = {
    flex: orientation === 'landscape' ? 0 : 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <ScrollView contentContainerStyle={cardStyle}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginTop: 20 }}>
          <Card
            name="Learn"
            image="https://storage.googleapis.com/childrenapp_storage/Learn.png"
            onPress={() => {
              navigation.navigate('Categories', { category: category });
            }}
          />
          <Card
            name="Answer"
            image="https://storage.googleapis.com/childrenapp_storage/Answer.png"
            onPress={handleLearnPress}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LearnOrAnswerScreen;
