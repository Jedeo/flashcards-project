const { should, expect } = require("chai");
const Game = require("../src/Game");
const data = require("../src/data");
const Card = require("../src/Card");
const Deck = require("../src/Deck");
const Round = require("../src/Round");
const Turn = require("../src/Turn");
const prototypeQuestions = data.prototypeData;

describe("class", () => {
  let cards;
  let deck;
  let round;
  let newGame;

  beforeEach(() => {
    newGame = new Game();
    cards = prototypeQuestions.map(
      (card) =>
        new Card(card.id, card.question, card.answers, card.correctAnswer)
    );
    deck = new Deck(cards);
    round = new Round(deck);
  });

  it("should keep track of the currentRound", () => {
    newGame.start();

    expect(newGame.currentRound).to.deep.equal(round);
  });

  it("should Creates Cards", () => {
    expect(cards[0].id).to.equal(prototypeQuestions[0].id);
  });

  it("should Put Cards in a Deck", () => {

    expect(deck.decks.length).to.equal(cards.length);
  });

  it("should end if player gets more than 90%", () => {
    let count = 0;
    do {
      round.takeTurn(deck.decks[count].correctAnswer);
      count++;
    } while (deck.decks.length > count);

    expect(newGame.currentRound).to.eql({});
    expect(round.incorrectGuesses.length).to.equal(0);
  });

  it("should no end if player gets less than 90%", () => {
   
    let count = 0;
    let turn = new Turn(
      deck.decks[count].correctAnswer,
      prototypeQuestions[count]
    );

    do {
      round.takeTurn("object");
      count++;
    } while (deck.decks.length > count);

    expect(newGame.currentRound).to.eql({});
    expect(round.percentCorrect).to.equal(0);
    expect(round.incorrectGuesses.length).to.equal(0);
  });
});
