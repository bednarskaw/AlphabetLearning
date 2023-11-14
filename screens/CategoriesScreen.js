// components/CategoryScreen.js
import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { CATEGORIES } from '../data/default-data'
import SmallCard from '../components/SmallCard';
import { useOrientation } from '../util/orientation';

const CategoriesScreen = ({ navigation, route }) => {
  const categoryName = route.params.category;
  let dataLink = [];
  let categoryData = CATEGORIES.find(
    (category) => category.name === categoryName
  ).data;
  const orientation = useOrientation();

  useEffect(() => {
  if (categoryName) {
    navigation.setOptions({
      headerTitle: categoryName,
    });
  }
  }, [categoryName, navigation]);

   dataLink =  categoryData.map(item => item.url);
   categoryData = categoryData.map(item => item.name);
  
  const categoryDetailsHandler = (item) => {
     navigation.navigate('Details', { data: categoryData, category: categoryName, selectedItem: item, dataUrl: dataLink });
  };

  const contentConteinerStyle = {
    paddingHorizontal: orientation === 'landscape' ? 20 : 0,
  };

  return (
    <ScrollView contentContainerStyle={[styles.contentContainer, contentConteinerStyle]}>
      <View style={styles.cardsContainer}>
        {categoryData.map((item, index) => (
          <SmallCard key={index} name={item} onPress={() => categoryDetailsHandler(item)} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CategoriesScreen;
