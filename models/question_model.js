class Question {
  constructor(category, text, correctAnswer, answers, ifAnswered) {
    this.category = category;
    this.text = text;
    this.correctAnswer = correctAnswer;
    this.answers = answers;
    this.ifAnswered = ifAnswered;
  }
}

export default Question;