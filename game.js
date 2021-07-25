const gameWrapper = document.getElementById('game__container');

class Game {
    cardColors = [
        "red", "red", "blue", "blue", "yellow", "yellow", "green", "green", "brown", "brown", "lightgreen", "lightgreen", "violet", "violet", "cadetblue", "cadetblue", "gray", "gray"
    ]
    level = 1
    numberOfCards = 18;
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
            card.addEventListener('click', (e) => {
                this.clickCard(e)
            })
        })
    }

    clickCard(e) {
        const activeCard = e.target
        activeCard.classList.remove('hidden');
        console.log(this.clickedCards)
        this.clickedCards.push(activeCard);

        if (this.clickedCards.length === 1) {
            return;

        } else {
            this.ifCardsMatch();
        }
    }

    ifCardsMatch() {
        setTimeout(() => {
                if (this.clickedCards[0].className === this.clickedCards[1].className) {
                    console.log("cards match")
                    this.clickedCards.forEach((card) => {
                        card.classList.add('off')
                    })
                    
                    this.pointsCounter++;
                    if (this.pointsCounter === this.winCounter) {
                        this.won();
                    }
    
                } else {
                    this.clickedCards.forEach((card) => {
                        card.classList.add('hidden')
                    })
                    console.log("cards doesn't match")
                }
                this.clickedCards.length =0;
                console.log(this.clickedCards)
            }, 500);
        
    }

    won() {
        alert("you won!")
    }
}

const game = new Game(gameWrapper);
game.start();
