// components/SlideUpView.js
import React, { useRef, useEffect } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SmallCard from './SmallCard';
import { useStatus } from '../store/StatusContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constans/colors';
import { Platform } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const SlideUpView = ({ isVisible, onClose, onChooseItem, data }) => {

const slideAnim = useRef(new Animated.Value(screenHeight)).current;
const {lastLearnedAlphabetIdx} = useStatus();

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isVisible ? 10 : screenHeight,
      useNativeDriver: false,
    }).start();
  }, [isVisible, slideAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close-circle" size={30} style={styles.closeButton}></Ionicons>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {lastLearnedAlphabetIdx > 0 ? (
          <View style={styles.cardsContainer}>
              {data.map((item, index) => (
                index <= lastLearnedAlphabetIdx - 1 && (
                  <SmallCard
                    key={index}
                    name={item.name}
                    image={item.url}
                    onPress={onChooseItem}
                    isImageCard={true}
                    style={{ width: 75, height: 75 }}
                  />
                )
              ))}
            </View>
          ) : (
            <View style={styles.cardsContainer}>
             <SmallCard
                name={'PetFood'}
                image={'https://storage.googleapis.com/childrenapp_storage/PetFood.png'}
                onPress={onChooseItem}
                isImageCard={true}
                style={{ width: 75, height: 75 }}
              />
            </View>
          )}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomEndRadius: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: 5,
    paddingBottom: 20,
    paddingTop: 5,
    elevation: 6,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    alignItems: 'flex-end',
    paddingLeft: 20,
  },
  closeButton: {
    fontSize: 30,
    color: Colors.headerCol,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SlideUpView;
