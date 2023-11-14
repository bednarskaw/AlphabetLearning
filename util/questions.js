import Question from "../models/question_model";
import { CATEGORIES } from '../data/default-data';

const filteredCategories = CATEGORIES.filter(category => category.name !== 'Alphabet');
const combinedArray = filteredCategories.map(obj => obj.data).reduce((acc, data) => acc.concat(data), []);

function randomIndexOf(item) {
    return Math.floor(Math.random() * item.length);
;}

function getRandomElementStartingWith(letter) {
  const elementsStartingWith = combinedArray.filter((item) => item.name.charAt(0).toUpperCase() === letter);
  const randomIndex = randomIndexOf(elementsStartingWith);
  return elementsStartingWith[randomIndex];
};

function getRandomCategory() {
  const randomCategoryIndex = randomIndexOf(filteredCategories);
  return filteredCategories[randomCategoryIndex];
};

function getRandomElementsExcluding(letter) {
  const randomCategories = [];
  const addedElements = new Set(); // to keep track of added elements
  while (randomCategories.length < 3) {
    const randomCategory = getRandomCategory(filteredCategories).data;
    const filteredElements = randomCategory.filter(item => item.name.charAt(0).toUpperCase() !== letter);
    if (filteredElements.length > 0) {
      const availableElements = filteredElements.filter(item => !addedElements.has(item.name));
      if (availableElements.length > 0) {
        const randomElement = availableElements[randomIndexOf(availableElements)];
        randomCategories.push(randomElement);
        addedElements.add(randomElement.name);
      };
    };
  };
  return randomCategories;
};

function getRandomElementFromCategory(category) {
    const randomIdx = randomIndexOf(category[0].data);
    //console.log(category[0].data[0].url);
    return category[0].data[randomIdx];
    //get url to image
};

function getRandomElementsFromCategory(category, element) {
  const randomCategories = [];
  const dataElements = category[0].data;

  while (randomCategories.length < 3) {
    const filteredDataElements = dataElements.filter(item => !randomCategories.includes(item) && item.name !== element.name);
    const randomElement = filteredDataElements[randomIndexOf(filteredDataElements)];
    randomCategories.push(randomElement);
  };
  return randomCategories;
};

function prepareAnswers(correctAnswer) {
  const answers = getRandomElementsFromCategory(objectCategory, correctAnswer);
  answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, correctAnswer);
  return answers;
};

export function generateQuestion(category, item) {
  let correctAnswer = "";
  let answers = {};
  let question = {};
  const randomCategory = getRandomCategory();
  if (category === 'Alphabet') {
      correctAnswer = getRandomElementStartingWith(item.name);
      answers = getRandomElementsExcluding(item.name);
      answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, correctAnswer);
      question = new Question(
        category,
        `Which one of these starts with the letter ${item.name}?`,
        correctAnswer,
        answers,
        false
      );
  } else {
      const objectCategory = filteredCategories.filter(item => item.name === category);
      correctAnswer = getRandomElementFromCategory(objectCategory);
      answers = getRandomElementsFromCategory(objectCategory, correctAnswer);
      answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, correctAnswer);
      question = new Question(
          category,
          `Find ${correctAnswer.name}!`,
          correctAnswer,
          answers,
          false
      );
  };
  return question;
}

