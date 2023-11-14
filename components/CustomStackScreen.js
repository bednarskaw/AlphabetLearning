import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constans/colors'; // Make sure to import the Colors from your constants file

const CustomStackScreen = ({ name, target, navigation }) => {
  return (
    <Stack.Screen
      name={name}
      component={ModulesScreen}
      options={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate(target)}>
            <Ionicons
              name="caret-back"
              size={24}
              color="white"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.headerCol, // Make sure to provide the headerCol color from your Colors constant
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Ninces',
        },
      }}
    />
  );
};

export default CustomStackScreen;
