// StatusContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { storeData, getData } from './Storage';

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [happiness, setHappiness] = useState(0);
  const [hunger, setHunger] = useState(0);
  const [lastLearnedAlphabetIdx, setLastLearnedAlphabetIdx] = useState(0);
  const [lastModification, setLastModification] = useState(new Date());

  useEffect(() => {
    initialLoad();
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    if (happiness > 0 || hunger > 0) {
      updateLastModification();
    }
    if (happiness > 0) {
      updateHappiness(-1); // Reduce happiness by 1
    }
    if (hunger > 0) {
      updateHunger(-1); // Reduce hunger by 1
    }
  }, 864000); // 86400000  milliseconds = 24 hours 864000

  return () => clearInterval(interval);
}, []);

  const initialLoad = async () => {
    const savedHappiness = await getData('happiness');
    const savedHunger = await getData('hunger');
    const savedAlphabetIdx = await getData('lastLearnedAlphabetIdx');
    const savedLastModification = await getData('lastModification');
    let deductStatusBarTime = 0;
    if (savedLastModification !== null) {
      const currentTime = new Date();
      const differenceInMilliseconds = Math.abs(currentTime - new Date(savedLastModification));
      deductStatusBarTime = Math.round(differenceInMilliseconds / 864000);
    }
    if (savedHappiness !== null) {
      let updatedHappiness = savedHappiness - deductStatusBarTime;
      updatedHappiness = Math.max(updatedHappiness, 0);

      setHappiness(updatedHappiness);;
      updateHappiness(-deductStatusBarTime);
    }
    if (savedAlphabetIdx !== null) {
      setLastLearnedAlphabetIdx(savedAlphabetIdx);
    }
    if (savedHunger !== null) {
      let updatedHunger = savedHunger - deductStatusBarTime;
      updatedHunger = Math.max(updatedHunger, 0);

      setHunger(updatedHunger);
      updateHunger(-deductStatusBarTime);
    }

  };

  const updateHappiness = (value) => {
    setHappiness((prevHappiness) => {
      const newHappiness = prevHappiness + value;
      if (newHappiness > 100) {
        return 100;
      } else if (newHappiness < 0) {
        return 0;
      } else {
        if (newHappiness !== prevHappiness) {
          storeData('happiness', newHappiness); // Save the updated happiness only if it's different
        }
        return newHappiness;
      }
    });
  };


  const updateLastModification = () => {
    currentDate = new Date();
    setLastModification(currentDate);
    storeData('lastModification', currentDate);
  };

  const updateLastLearnedAlphabetIdx = (updatedIdx) => {
    setLastLearnedAlphabetIdx(updatedIdx);
    storeData('lastLearnedAlphabetIdx', updatedIdx);
  };

  const updateHunger = (value) => {
    setHunger((prevHunger) => {
    let newHunger = prevHunger + value;
    if (newHunger > 100) {
      newHunger = 100;
    } else if (newHunger < 0) {
      newHunger = 0;
    }
    storeData('hunger', newHunger);
    return newHunger;
  });
};

  return (
    <StatusContext.Provider
      value={{ happiness, updateHappiness, lastLearnedAlphabetIdx, updateLastLearnedAlphabetIdx,hunger, updateHunger, updateLastModification }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
