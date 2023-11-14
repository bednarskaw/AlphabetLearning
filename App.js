// App.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';
import ModulesScreen from './screens/ModulesScreen';
import VirtualAnimalScreen from './screens/VirtualAnimalScreen';
import DetailsScreen from './screens/DetailsScreen';
import LearnOrAnswerScreen from './screens/LearnOrAnswerScreen'
import CategoriesScreen from './screens/CategoriesScreen';
import AnswersScreen from './screens/AnswersScreen'
import { StatusProvider } from './store/StatusContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './constans/colors'

const Stack = createStackNavigator();

const App = () => {
  return (
    <StatusProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false}} />
            <Stack.Screen name="VirtualAnimal" component={VirtualAnimalScreen} options={{headerShown: false}}/>
            <Stack.Screen
              name="Modules"
              component={ModulesScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('VirtualAnimal')}>
                    <Ionicons
                      name="caret-back"
                      size={24}
                      color="white"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: Colors.headerCol,
                },
                headerTitleStyle: {
                  color: 'white',
                  fontFamily: 'Ninces',
                },
                headerTitleAlign: 'center',
              })}
            />
            <Stack.Screen
              name="LearnOrAnswer"
              component={LearnOrAnswerScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Modules')}>
                    <Ionicons
                      name="caret-back"
                      size={24}
                      color="white"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: Colors.headerCol,
                },
                headerTitleStyle: {
                  color: 'white',
                  fontFamily: 'Ninces',
                },
                headerTitle: 'Learn or Answer',
                headerTitleAlign: 'center',
              })}
            />
            <Stack.Screen
              name="Categories"
              component={CategoriesScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="caret-back"
                      size={24}
                      color="white"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: Colors.headerCol,
                },
                headerTitleStyle: {
                  color: 'white',
                  fontFamily: 'Ninces',
                },
                headerTitle: 'Learn or Answer',
                headerTitleAlign: 'center',
              })}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="caret-back"
                      size={24}
                      color="white"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: Colors.headerCol,
                },
                headerTitleStyle: {
                  color: 'white',
                  fontFamily: 'Ninces',
                },
                headerTitleAlign: 'center',
              })}
            />
            <Stack.Screen
              name="Answers"
              component={AnswersScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="caret-back"
                      size={24}
                      color="white"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: Colors.headerCol,
                },
                headerTitleStyle: {
                  color: 'white',
                  fontFamily: 'Ninces',
                },
                headerTitle: 'Answer the question!',
                headerTitleAlign: 'center',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </StatusProvider>
  );
};

export default App;
