// components/ModulesScreen.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import { CATEGORIES } from '../data/default-data';
import Card from '../components/Card';

const ModulesScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {CATEGORIES.map((category) => (
          <Card
            key={category.id}
            name={category.name}
            image={category.image} // Make sure to import and provide the image
            onPress={() => {
              navigation.navigate('LearnOrAnswer', { category: category.name });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ModulesScreen;
