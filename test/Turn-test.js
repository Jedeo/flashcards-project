const { expect } = require("chai");

const Card = require('../src/Card')
const Turn = require('../src/Turn');

describe('Turn', () => {
    let card1;
    let card2;
    let card3;
    beforeEach( ()=> {
         card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
         card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
         card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
    })
  
    it('should return guessed answer', () => {
        let newGuess = new Turn("pug", card1);
        let result = newGuess.returnGuess();
        expect(result).to.equal('pug')
    });

    it('should return card', () => {
        let newCard = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter')
        let card = new Turn("pug", newCard);
        let result = card.returnCard();

        console.log(result)
        console.log(card1)
        expect(result).to.eql(card1)

    });

    it('should returns a boolean indicating if the guess matches the correct answer on the card', () => {
        let newCard = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter')
        let newGuess = new Turn("sea otter", newCard);
        let result = newGuess.evaluateGuess();
        expect(result).to.equal(true)
    });

    it('should returns either ‘incorrect!’ or ‘correct!’ based on whether the guess is correct or not.', () => {
        let newCard = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter')
        
        let newGuess = new Turn("pug", newCard);
       
        let result = newGuess.giveFeedback();
        expect(result).to.equal('incorrect!');
    })
} )