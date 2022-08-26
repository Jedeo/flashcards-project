const { expect } = require("chai");
const data = require("../src/data");
const Card = require('../src/Card')
const Turn = require('../src/Turn');

describe('Turn', () => {
  let prototypeQuestions; 
  let cards;
  let turn;

  beforeEach(() => {
    prototypeQuestions = data.prototypeData;
    cards = prototypeQuestions.map(card => new Card(card.id,card.question,card.answers,card.correctAnswer))
    turn = new Turn("object", cards[0]);
  });
  
    it('should return guessed answer', () => {
        
        let result = turn.returnGuess();
        expect(result).to.equal('object')
    });

    it('should return card', () => {
        let result = turn.returnCard();

        expect(result).to.deep.equal(turn.returnCard())

    });

    it('should returns a boolean true indicating if the guess matches the correct answer on the card', () => {
        let result = turn.evaluateGuess();
        
        expect(result).to.equal(true)
    });

    it('should returns a boolean false indicating if the guess does not matches the correct answer on the card', () => {
        let turn = new Turn("find()", prototypeQuestions[11]);
        let result = turn.evaluateGuess();
        
        expect(result).to.equal(false)
    });

    it('should returns either ‘correct!’ based on whether the guess is correct or not.', () => {
        let result = turn.giveFeedback();

        expect(result).to.equal('correct!');
    })

    it('should returns either ‘incorrect!’ or ‘correct!’ based on whether the guess is correct or not.', () => {
        let turn = new Turn("object", prototypeQuestions[1]);
        let result = turn.giveFeedback();

        expect(result).to.equal('incorrect!');
    })
} )