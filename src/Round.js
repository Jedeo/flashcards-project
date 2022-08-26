const Turn = require("./Turn");
const data = require("./data");
const { default: RawListPrompt } = require("inquirer/lib/prompts/rawlist");
const prototypeQuestions = data.prototypeData;

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectGuesses = [];
    this.currectGuesses = [];
    this.currentCard = deck.decks[this.turns];
    this.percentCorrect = 0;
  }

  returnCurrentCard() {
    return this.currentCard;
  }

  takeTurn(guess) {
    let turnsclass = new Turn(guess, this.currentCard);
    let result = turnsclass.evaluateGuess();
  
    let resetGame = () => {
      if (
        this.percentCorrect < 90 &&
        this.turns === this.deck.decks.length &&
        this.incorrectGuesses.length !== 0
      ) {
        console.log();
        console.log(
          `** Round over! ** You need more practice. You answered ${this.percentCorrect}% of the questions correctly!`
        );
        console.log("Next turn starts now");
        this.incorrectGuesses = [];
        this.turns = 0;
        this.percentCorrect = 0;
        this.currectGuesses = [];
        this.currentCard = this.deck.decks[this.turns];
      }
    };

    if (result !== false) {
      this.calculatePercentCorrect();
      this.turns += 1;
      this.currentCard = this.deck.decks[this.turns];
      this.currectGuesses.push(turnsclass.card.id);
      turnsclass.evaluateGuess();
      resetGame();
      return turnsclass.giveFeedback();
    } 
    else {
      this.calculatePercentCorrect();
      this.turns += 1;
      this.currentCard = this.deck.decks[this.turns];
      turnsclass.evaluateGuess();
      this.incorrectGuesses.push(turnsclass.card.id);
      prototypeQuestions.push(turnsclass.card);
      resetGame();
      return turnsclass.giveFeedback();
    }
  }

  calculatePercentCorrect() {
    this.percentCorrect = Math.floor(
      (this.currectGuesses.length / this.deck.decks.length) * 100
    );
    return this.percentCorrect;
  }

  endRound() {
    let result = this.calculatePercentCorrect();
    // console.log(`** Round over! ** You answered ${result}% of the questions correctly!`);
    return `** Round over! ** You answered ${result}% of the questions correctly!`
  }
}

module.exports = Round;
