import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { generateRandomColor } from '../util/randomColor';
import LoadingView from './LoadingView';

const SmallCard = ({ name, image, onPress, isImageCard, isQuestionCard, style }) => {
  const [loading, setLoading] = useState(true);
  const isShortText = name.length === 1;

  return (
    <TouchableOpacity style={[styles.card, isShortText && styles.shortTextCard, isQuestionCard && styles.smallCard, { backgroundColor: generateRandomColor() }, style]} onPress={onPress}>
      {isImageCard ? (
        <>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          {loading && <LoadingView />}
        </>
      ) : (
        <View style={styles.textContainer}>
          <Text style={[styles.text, isShortText && styles.shortText]}>{name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 100,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 6,
  },
  smallCard: {
    width: 160,
    height: 160,
  },
  shortTextCard: {
    width: 100,
  },
  textContainer: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Ninces',
  },
  shortText: {
    fontSize: 35,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default SmallCard;
