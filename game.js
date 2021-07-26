class Game {
    colors = [
        "red", "red", "blue", "blue", "yellow", "yellow", "green", "green","brown", "brown", 
        "lightgreen", "lightgreen", "violet", "violet", "cadetblue", "cadetblue", 
        "gray", "gray", "aqua" , "aqua" , "coral" , "coral" , "teal" , "teal"
    ]
    cardsArray = []; 
    clickedCards = [];
    pointsCounter = 0;

    constructor(placeForGame, level) {
        this.level = +level;
        this.placeForGame = placeForGame;
        this.cardColors = this.colors.slice(0, this.level);
    }
    
    start() {
        
        this.numberOfCards = this.cardColors.length;
        this.winCounter = (+this.numberOfCards / 2) ;
        console.log( this.winCounter)
        console.log( this.numberOfCards)
        this.drawAndDisplayCards();
        this.coverCards();
    }

    drawAndDisplayCards() {
        if(this.level === 12 ){
            this.cardClass = 'card-4-3';
        }
        if(this.level === 18) {
            this.cardClass = 'card-6-3';
        }
        if(this.level === 24){
            this.cardClass = 'card-6-4';
        }
        let cardsWrapper = new DocumentFragment();
        for (let i = 0; i < this.level ; i++) {
            const card = document.createElement('div');
            this.cardsArray.push(card);
            card.classList.add(this.cardClass);
            
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

const gameWrapper = document.getElementById('game__container');
Array.from(document.getElementsByClassName('level-button')).forEach((button) =>{
    button.addEventListener('click' , function (){
        const level  = this.value;
        document.getElementById('intro').style.display = "none";
        gameWrapper.style.visibility = 'visible';
        const game = new Game(gameWrapper, level);
        game.start() }
    )
})





