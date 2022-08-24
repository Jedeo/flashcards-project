const { should, expect } = require("chai")
const Game = require('../src/Game')
const data = require('../src/data');
const Card = require('../src/Card')
const Deck = require('../src/Deck')
const Round = require('../src/Round')
const Turn = require('../src/Turn')
const prototypeQuestions = data.prototypeData;



describe("class", ()=> {
    let newRound;
    let cards;
    let deck;
    let round;
    
    beforeEach( () => {
         cards = prototypeQuestions.map(card => new Card(card.id,card.question,card.answers,card.correctAnswer))
         deck = new Deck(cards)
         round = new Round(deck)
         
    })
       
    it("should keep track of the currentRound", ()=> {
        newRound = new Game()
        newRound.start();
        expect(newRound.currentRound[1]).to.equal(round[1])
    })
    
    it("should Creates Cards", () => {
        expect(cards[0].id).to.equal(prototypeQuestions[0].id)
    })

    it('should Put Cards in a Deck', () => {
        console.log(deck.decks.length)
        expect(deck.decks.length).to.equal(cards.length)

    })

    it('should Create a new Round using the Deck', ()=> {
       // expect(cards[0].id).to.equal(prototypeQuestions[0].id)
    })
    
        
   
})