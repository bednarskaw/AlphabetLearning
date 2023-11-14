import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState(Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait');

  const handleOrientationChange = ({ window: { width, height } }) => {
    const newOrientation = width > height ? 'landscape' : 'portrait';
    setOrientation(newOrientation);
    console.log(newOrientation);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
        subscription?.remove();
    };
  }, []);

  return orientation;
};