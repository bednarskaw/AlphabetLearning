import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, Animated, StatusBar, Dimensions  } from 'react-native';
import BubbleButton from '../ui/BubbleButton';
import { useOrientation } from '../util/orientation';

const StartScreen = ({ navigation }) => {
  const orientation = useOrientation();
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateImage = (anim, delay) => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    };

    animateImage(fadeAnim1, 0);
    animateImage(fadeAnim2, 1000);

  }, [fadeAnim1, fadeAnim2]);
  
  const contentContainerStyle = {
    flexDirection: orientation === 'landscape' ? 'row-reverse' : 'column',
    justifyContent: orientation === 'landscape' ? 'space-between' : 'center',
    alignItems: 'center',
    marginTop: orientation === 'landscape' ? -30 : 20,
    marginBottom: orientation === 'landscape' ? 20 : 10,
  };

  const buttonContainerStyle = {
    marginTop: orientation === 'landscape' ? 40 : Dimensions.get('window').height*0.2,
    marginBottom: orientation === 'landscape' ? 20 : 10,
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: 'https://storage.googleapis.com/childrenapp_storage/Landscape1.jpg',
        }}
        style={styles.background}
      >
        <View style={styles.container}>
          <Image
            source={require('../assets/images/welcome-art.png')}
            style={styles.logo}
          />
          <View style={contentContainerStyle}>
            <BubbleButton
              style={buttonContainerStyle}
              title="Let's Start"
              onPress={() => navigation.navigate('VirtualAnimal')}
            />
            <View style={styles.imageContainer}>
              <Animated.Image
                source={{
                  uri: 'https://storage.googleapis.com/childrenapp_storage/wepik-export-2023110812145021ax.png',
                }}
                style={[styles.firstImage, { opacity: fadeAnim1 }]}
              />
              <Animated.Image
                source={{
                  uri: 'https://storage.googleapis.com/childrenapp_storage/wepik-export-20231107233354vI34.png',
                }}
                style={[styles.secondImage, { opacity: fadeAnim2 }]}
              />
            </View>
        </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 340,
    height: 120,
    marginTop: 40,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 40,
  },
  firstImage: {
    width: 280,
    height: 280,
    marginLeft: -15,
  },
  secondImage: {
    width: 150,
    height: 150,
    marginLeft: -30,
  },
});

export default StartScreen;
