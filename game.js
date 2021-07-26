const gameWrapper = document.getElementById('game__container');

class Game {
    cardColors = [
        "red", "red", "blue", "blue", "yellow", "yellow", "green", "green", "brown", "brown", "lightgreen", "lightgreen", "violet", "violet", "cadetblue", "cadetblue", "gray", "gray"
    ]
    numberOfCards = this.cardColors.length;
    cardsArray = []; 
    clickedCards = [];
    pointsCounter = 0;
    winCounter = this.numberOfCards / 2;

    constructor(placeForGame) {
        this.placeForGame = placeForGame;
    }

    start() {
        this.drawAndDisplayCards();
        this.coverCards();
    }

    drawAndDisplayCards() {
        let cardsWrapper = new DocumentFragment();
        for (let i = 0; i < this.numberOfCards; i++) {
            const card = document.createElement('div');
            this.cardsArray.push(card);
            card.classList.add('card');
            const random = Math.floor(Math.random() * this.cardColors.length);
            card.classList.add(this.cardColors[random]);
            this.cardColors.splice(random, 1);
            cardsWrapper.appendChild(card);
        }
        this.placeForGame.appendChild(cardsWrapper);
    }

    coverCards() {
        setTimeout(() => {
            this.cardsArray.forEach((card) => {
                card.classList.add('hidden');
            })
        }, 2000);
        this.listenToClick();
    }

    listenToClick() {
        this.cardsArray.forEach((card) => {
            card.addEventListener('click',  e => this.clickCard(e) )
        })
    }

    clickCard(e) {
        const activeCard = e.target;
        activeCard.classList.add('not-clickable');
        activeCard.classList.remove('hidden'); 
        this.clickedCards.push(activeCard); 

        if (this.clickedCards.length === 1) {
            return; 

        } else {
            this.cardsArray.forEach((card) => {
                card.classList.add('not-clickable');
            }) 
            this.checkMatching(); 
        }
    }
    
    checkMatching() {
        setTimeout(() => {
                if (this.clickedCards[0].className === this.clickedCards[1].className) {
                    this.clickedCards.forEach((card) => {
                        card.classList.add('off');
                        this.cardsArray = this.cardsArray.filter((el) => el !== card);
                    })
                    this.pointsCounter++;

                    if (this.pointsCounter === this.winCounter) {
                        this.clickedCards.forEach((card) => {
                            card.classList.add('hidden')
                        })
                        setTimeout(() => {
                            this.won();
                        }, 500);
                    }
    
                } else {
                    this.clickedCards.forEach((card) => {
                        card.classList.add('hidden');
                        card.classList.remove('not-clickable')
                    })
                }
                this.cardsArray.forEach((card) => {
                    card.classList.remove('not-clickable')
                })
                this.clickedCards.length = 0;
            }, 500);
    }

    won() {
        alert("Congrats! You won! Click OK to try again");
        location.reload();
    }
}
const game = new Game(gameWrapper);
game.start();
