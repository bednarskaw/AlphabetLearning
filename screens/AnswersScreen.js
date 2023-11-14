// AnswerResult.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AnswerResult from '../components/AnswerResult';
import { useStatus } from '../store/StatusContext';
import {CATEGORIES} from '../data/default-data'
import {generateQuestion} from '../util/questions'
import SmallCard from '../components/SmallCard';
import { generateRandomColor } from '../util/randomColor';
import { MaterialIcons  } from '@expo/vector-icons';
import {textToSpeech} from '../util/text-to-speech';
import { Colors } from '../constans/colors';

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const gridItemWidth = (screenWidth - 20 * (numColumns + 1)) / numColumns;

const AnswersScreen = ({ route }) => {
  const navigation = useNavigation();
  const { updateHappiness, lastLearnedAlphabetIdx, updateLastLearnedAlphabetIdx, updateLastModification } = useStatus();
  const { questionIndex, category } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(questionIndex);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const categoryData = CATEGORIES.find(
      (categoryData) => categoryData.name === category
    ).data;

  const [generatedQuestion, setGeneratedQuestion] = useState({
    answers: [],
    category: "",
    correctAnswer: {},
    ifAnswered: false,
    text: "",
  });
  
  useFocusEffect(
    React.useCallback(() => {
      setCurrentQuestionIndex(lastLearnedAlphabetIdx);
      const newGeneratedQuestion = generateQuestion(
        category,
        categoryData[lastLearnedAlphabetIdx]
      );
      if (newGeneratedQuestion) {
        setGeneratedQuestion(newGeneratedQuestion);
      }
    }, [lastLearnedAlphabetIdx, setCurrentQuestionIndex, category, categoryData])
  );

  const checkAnswer = (selectedAnswer) => {
    const correctAnswer = generatedQuestion.correctAnswer;
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowAnswer(true);
    if (correct) {
      if (category === 'Alphabet') {
        if (lastLearnedAlphabetIdx === 25) {
          setIsFinished(true);
        } else {
          updateLastLearnedAlphabetIdx(currentQuestionIndex+1);
        }
      }
      updateHappiness(10);
      const newGeneratedQuestion = generateQuestion(
      category,
      categoryData[lastLearnedAlphabetIdx]
      );
      if (newGeneratedQuestion) {
        setGeneratedQuestion(newGeneratedQuestion);
      }
      updateLastModification(new Date()); 
    }
  };

  const handleNext = () => {
    if (category === 'Alphabet') {
      //supdateLastLearnedAlphabetIdx(24);
      const nextUnansweredIndex = lastLearnedAlphabetIdx;
      if (isCorrect && isFinished) {
        updateLastLearnedAlphabetIdx(-1);
        setShowAnswer(false);
        setIsCorrect(false);
        navigation.navigate('LearnOrAnswer', {category: category})
      } else {
        setCurrentQuestionIndex(nextUnansweredIndex);
      }
    }
      setShowAnswer(false);
      setIsCorrect(false);
  };

  if (showAnswer) {
    if (category === 'Alphabet') {
      return <AnswerResult isCorrect={isCorrect} isFinished={isFinished} onNext={handleNext} 
      finishedFunction={() => {
        updateLastLearnedAlphabetIdx(0);
        navigation.goBack();
      }}/>;
    } else {
      return <AnswerResult isCorrect={isCorrect} isFinished={false} onNext={handleNext} 
      finishedFunction={() => {}
      }/>;
    }
  }
  return (
   <View style={styles.container}>
      <Text style={[styles.question, {color: generateRandomColor()}]}>{generatedQuestion.text}</Text>
      <TouchableOpacity onPress={async () => {category === 'Alphabet' ? textToSpeech(categoryData[lastLearnedAlphabetIdx].name) : textToSpeech(generatedQuestion.correctAnswer.name)}}>
        <MaterialIcons name="speaker-phone" size={50} color={Colors.headerCol} />
      </TouchableOpacity>
      <View style={styles.gridContainer}>
        {generatedQuestion.answers.map((answer, index) => (
          <TouchableOpacity key={index} style={styles.gridItem} onPress={() => checkAnswer(answer)}>
            <SmallCard name={answer.name} image={answer.url} onPress={() => checkAnswer(answer)} isImageCard={true} isQuestionCard={true}  />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 30,
    fontFamily: 'Ninces',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
   gridItem: {
    width: (screenWidth - 40) / 2,
    height: (screenWidth - 40) / 2,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnswersScreen;
