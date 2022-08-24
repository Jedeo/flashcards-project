const { expect } = require("chai")
const data = require('../src/data');
const prototypeQuestions = data.prototypeData;
const Card = require('../src/Card')
const Deck = require('../src/Deck')

describe('Deck', () => {
    let cards;
    let deck;
    beforeEach( () => {
         cards = prototypeQuestions.map(card => new Card(card.id,card.question,card.answers,card.correctAnswer))
         deck = new Deck(cards)
    })

    it('should know how many Cards are in the Deck', () => {
        let decks = new Deck(cards)
        let result = decks.countCards();

        expect(result).to.equal(30)
    });
})