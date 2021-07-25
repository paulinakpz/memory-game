const gameWrapper = document.getElementById('game__container');



class Game {
    cardColors = [
        "red", "red", "blue", "blue", "yellow", "yellow", "green", "green", "brown", "brown", "lightgreen", "lightgreen", "violet", "violet", "cadetblue", "cadetblue", "gray", "gray"
    ]
    level = 1
    numberOfCards = 18;

    constructor(placeForGame) {
        this.placeForGame = placeForGame;
    }
    start() {
        let cardsWrapper = new DocumentFragment();
        for (let i = 0; i < this.numberOfCards; i++) {
            const card = document.createElement('div');
            card.classList.add('card')
            const random = Math.floor(Math.random()* this.cardColors.length);
            card.classList.add(this.cardColors[random]);
            this.cardColors.splice(random,1);
            cardsWrapper.appendChild(card);
        }
        this.placeForGame.appendChild(cardsWrapper);
    }
}

const game = new Game(gameWrapper);
game.start();