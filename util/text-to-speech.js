import { Audio } from 'expo-av';
import { decode } from 'base-64'; 
import * as FileSystem from 'expo-file-system';
import {API_ENDPOINT} from '../data/config'

export const textToSpeech = async (text) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            text,
          },
          voice: {
            languageCode: 'en-US', // Language code
            name: 'en-US-Wavenet-D', // Voice name
          },
          audioConfig: {
            audioEncoding: 'LINEAR16', // Convert to the desired audio format
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      
      const data = await response.json();
      const audioData = data.audioContent;

      // Decode the base64 audio data
      const decodedAudio = decode(audioData);
    
      // Convert the decoded audio to URI
      const audioUri = `data:audio/mp3;base64,${audioData}`;
      const fileUri = FileSystem.documentDirectory + 'output.mp3';

      // Write the audio data to the file
      await FileSystem.writeAsStringAsync(fileUri, audioData, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Play the saved audio file
      const { sound } = await Audio.Sound.createAsync({ uri: fileUri });

      await sound.playAsync();
    } catch (error) {
      console.error('Error:', error);
    }
  };