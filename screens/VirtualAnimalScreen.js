// components/VirtualAnimalScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { useStatus } from '../store/StatusContext';
import CustomStatusBar from '../ui/CustomStatusBar'
import BubbleButton from '../ui/BubbleButton';
import { ButtonAndTextColors } from '../constans/colors';
import LoadingView from '../components/LoadingView';
import SlideUpView from '../components/SlideUpView';
import { fruits } from '../data/default-data'
import { useOrientation } from '../util/orientation';

const { width, height } = Dimensions.get('window');

const VirtualAnimalScreen = ({ navigation }) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingBackground, setLoadingBackground] = useState(true);
  const { happiness, updateHunger, hunger, lastLearnedAlphabetIdx } = useStatus();
  const [isSlideUpVisible, setIsSlideUpVisible] = useState(false);
  const orientation = useOrientation();
  const [imageOpacity, setImageOpacity] = useState(0);

  const handleFeedButtonClick = () => {
      setIsSlideUpVisible(true);
    };

  const handleCloseSlideUp = () => {
    setIsSlideUpVisible(false);
  };

  const feedAnimal = () => {
    updateHunger((lastLearnedAlphabetIdx+1)*2);
    setIsSlideUpVisible(false);
  };

  const petImageStyle = {
    width: orientation === 'landscape' ? Dimensions.get('window').width*0.25 : Dimensions.get('window').width*0.6,
    height: orientation === 'landscape' ? 300 : Dimensions.get('window').height*0.5,
    marginBottom: orientation === 'landscape' ? 0 : (Platform.OS === 'android' ? height * 0.1 + 10 : 30),
    marginRight: orientation === 'landscape' ? 10 : 0,
  };
  
  const contentConteinerStyle = {
    flexDirection: orientation === 'landscape' ? 'row-reverse' : 'column',
    alignItems: orientation === 'landscape' ? 'flex-end' : 'center',
    justifyContent: 'center'
  };

  const cardStyle = {
    marginTop: orientation === 'landscape' ? 0 : (Platform.OS === 'android' ? StatusBar.currentHeight + 85 : 60),
  };

  return (
  <ImageBackground
      source={require('../assets/images/Landscape.jpg')}
      style={styles.background}
      resizeMode="cover"
      onLoadStart={() => setLoadingBackground(false)}
      onLoadEnd={() => setLoadingBackground(false)}
    >
      {(loadingImage || loadingBackground) && <LoadingView />}
      <View style={contentConteinerStyle}>
       {(!loadingBackground && !loadingImage) && (
          <View style={[styles.card, cardStyle]}>
            <View style={styles.statusBars}>
              <Text style={[styles.text, { color: ButtonAndTextColors.pink }]}>
                Happiness: {happiness.toFixed(0)}%
              </Text>
              <CustomStatusBar percentage={happiness} />
              <Text style={[styles.text, { color: ButtonAndTextColors.purple }]}>
                Hunger: {hunger.toFixed(0)}%
              </Text>
              <CustomStatusBar percentage={hunger} />
            </View>
            <View style={styles.buttonContainer}>
              <BubbleButton
                title="Learn"
                onPress={() => {
                  navigation.navigate('Modules');
                }}
              />
              <BubbleButton
                title="Feed"
                onPress={handleFeedButtonClick}
              />
            </View>
          </View>
        )}
        {!loadingBackground && (
          <View>
            {happiness > 30 && hunger > 30 ? (
              <Image
                source={require('../assets/images/MyAnimal-happy.png')}
                style={[styles.image, petImageStyle]}
                onLoadEnd={() => setLoadingImage(false)}
              />
            ) : (
              <Image
                source={require('../assets/images/MyAnimal-sad.png')}
                style={[styles.image, petImageStyle, { opacity: imageOpacity }]}
                onLoadStart={() => { setImageOpacity(1) }}
                onLoadEnd={() => setLoadingImage(false)}
              />
            )}
          </View>
        )}
        </View>
        <SlideUpView isVisible={isSlideUpVisible} onClose={handleCloseSlideUp} lastLearnedAlphabetIdx={lastLearnedAlphabetIdx} onChooseItem={feedAnimal} data={fruits}>
        </SlideUpView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    //marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 85 : 60,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 6,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  statusBars: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    fontFamily: 'Ninces',
  },
  button: {
    width: width*0.4,
    height: 50,
  },
  image: {
    // width: width * 0.6,
    // height: height * 0.5,
    alignSelf: 'center',
    // marginBottom:  Platform.OS === 'android' ? height * 0.1 + 10 : 30,
  },
});

export default VirtualAnimalScreen;
