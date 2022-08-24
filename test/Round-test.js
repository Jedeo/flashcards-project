const { expect } = require('chai');

const Turn = require('../src/Turn')
const Card = require('../src/Card')
const Deck = require('../src/Deck')
const Round = require('../src/Round');
describe('Round', () => {
    let deck;
    let round;
    let card1;
    let card2;
    let card3;
    beforeEach( ()=> {
         card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
         card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
         card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

         deck = new Deck([card1, card2, card3]);
         round = new Round(deck);
    })
    
    it('should returns the current card being played', () => {
        let result = round.returnCurrentCard()
        
        expect(result).to.eql(card1);
        

    });

    it('should update turns count', () => {
        
        round.takeTurn('sea otter')
      
        expect(round.turns).to.equal(1);
        
       
    } )
    it('should evaluates guesses', () => {

        const turn = new Turn('sea otter', card1)
        
        round.takeTurn('sea otter')

        //const turn = new Turn(result, card1)
      
        expect(turn.evaluateGuess()).to.equal(true);

    })

    it('should gives feedback', ()=> {


        round.takeTurn('sea otter')

        let result = new Turn('sea otter', card1)
      
        expect(result.giveFeedback()).to.equal('correct!');

    })


    it('should store ids of incorrect guesses', () => {
       
        
        round.takeTurn('pug')
        //console.log(result)

        expect(round.incorrectGuesses[0]).to.equal(1);
        
    } )

    it('should calculate and returns the percentage of correct guesses', () => {
       
        round.takeTurn('sea otter')
        let result = round.calculatePercentCorrect()
        expect(result).to.equal(33);
    })

    it('should prints "Round over!" message to the console', () => {
      
        round.takeTurn('sea otter')
        let result = round.endRound()
        expect(result).to.equal(`** Round over! ** You answered 33% of the questions correctly!`);
    })

})