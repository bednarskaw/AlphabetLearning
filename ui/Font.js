import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  return useFonts({
    'Ninces': require('../assets/fonts/ninces-ninces-400.otf'),
  });
};
