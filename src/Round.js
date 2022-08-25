const Turn = require("./Turn");
const data = require('./data');
const Game = require("./Game");

const prototypeQuestions = data.prototypeData;


class Round{
    constructor(deck){
        this.deck = deck
        this.turns = 0;
        this.incorrectGuesses = [];
        this.currectGuesses = [];
        this.currentCard = deck.decks[this.turns];
    }
    returnCurrentCard(){
        
        return this.currentCard
    }
    takeTurn(guess){
        let turnsclass = new Turn(guess, this.currentCard);
        let result = turnsclass.evaluateGuess();
        if(result !== false){
            this.turns += 1;
            this.currentCard =  this.deck.decks[this.turns];
            this.currectGuesses.push(turnsclass.card.id);
            
            turnsclass.evaluateGuess();
            return turnsclass.giveFeedback()
        } else {
            this.turns += 1;
            this.currentCard =  this.deck.decks[this.turns];
            turnsclass.evaluateGuess()
            this.incorrectGuesses.push(turnsclass.card.id)
            //prototypeQuestions.push(turnsclass.card)
            return turnsclass.giveFeedback();
        }
    }
    calculatePercentCorrect(){
        let result = (this.currectGuesses.length/this.deck.decks.length) * 100
        return Math.floor(result);
    }
    endRound(){
        let result = this.calculatePercentCorrect()
        // let game = new Game()
        // if(result < 90 && this.turns === 30){
        //    game.start()
        // }
        console.log(`** Round over! ** You answered ${result}% of the questions correctly!`);
        return `** Round over! ** You answered ${result}% of the questions correctly!`
    }
}

module.exports = Round;