const { expect } = require("chai");
const data = require('../src/data');

const Turn = require("../src/Turn");
const Card = require("../src/Card");
const Deck = require("../src/Deck");
const Round = require("../src/Round");

describe("Round", () => {
  let prototypeQuestions; 
  let deck;
  let round;
  let cards;

  beforeEach(() => {
    prototypeQuestions = data.prototypeData;
    cards = prototypeQuestions.map(card => new Card(card.id,card.question,card.answers,card.correctAnswer))
    deck = new Deck(cards);
    round = new Round(deck);
  });

  it("should returns the current card being played", () => {
    let result = round.returnCurrentCard();

    expect(result).to.eql(prototypeQuestions[0]);
  });

  it("should update turns count", () => {
    round.takeTurn("object");
    round.takeTurn("array")

    expect(round.turns).to.equal(2);
  });

  it("should evaluates guesses", () => {
    const turn = new Turn("object", prototypeQuestions[0]);
    turn.evaluateGuess();
   
    expect(turn.evaluateGuess()).to.equal(true);
  });

  it("should gives feedback", () => {
    round.takeTurn("sea otter");

    let result = new Turn("object", prototypeQuestions[0]);
    expect(result.giveFeedback()).to.equal("correct!");
  });

  it("should gives feedback when answer is not right", () => {
    round.takeTurn("sea otter");

    let result = new Turn("function", prototypeQuestions[0]);
    expect(result.giveFeedback()).to.equal("incorrect!");
  });


  it("should store ids of incorrect guesses", () => {
    round.takeTurn("object");
   
    expect(round.incorrectGuesses).to.eql([]);
  });

  it("should calculate and returns the percentage of correct guesses", () => {
    round.takeTurn("object");
    round.takeTurn("array");
    round.takeTurn("mutator method");
    round.takeTurn("accessor method");
    round.takeTurn("iteration method");
    let result = round.calculatePercentCorrect();
    
    expect(result).to.equal(round.percentCorrect);
  });

  it('should prints "Round over!" message to the console', () => {
    round.takeTurn("object");
    round.takeTurn("array");
    round.takeTurn("mutator method");
    round.takeTurn("accessor method");
    round.takeTurn("iteration method");

    expect(round.endRound()).to.equal(`** Round over! ** You answered ${round.percentCorrect}% of the questions correctly!`);
  });

});
