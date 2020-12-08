'use strict';
let stopperTime = 0;

let seconds = 0;
let minutes = 0;
let hours = 0;
let stopperIsRunning = false;
let scores = 0;
const score = document.querySelector(".scores");

setInterval(() => {
    if (!stopperIsRunning) {
        return;
    }


    seconds++;
    if (seconds == 60) {
        minutes++;
        if (minutes == 60) {
            hours++;
            minutes = 0;
        }
        seconds = 0;
    }

    const stopper = makeTwoDigits(hours) + ':' + makeTwoDigits(minutes) + ':' + makeTwoDigits(seconds);
    const stopperFace = document.querySelector('.stopper-face');
    stopperFace.textContent = stopper;
}, 1000);



const makeTwoDigits = (num) => num < 10 ? '0' + num : num;

document.querySelector('.restart').addEventListener('click', () => {
    location.reload();
});

function Stopper() {
    if (stopperIsRunning) {
        stopperIsRunning = false;

        seconds = 0;
        minutes = 0;
        hours = 0;
    } else {
        stopperIsRunning = true;
    }
}

const frontImgList = [
    './pictures/Mozart-01.jpg',
    './pictures/Mozart-02.jpg',
    './pictures/Mozart-03.jpg',
    './pictures/Mozart-04.jpg',
    './pictures/Mozart-05.jpg',
    './pictures/Mozart-01.jpg',
    './pictures/Mozart-02.jpg',
    './pictures/Mozart-03.jpg',
    './pictures/Mozart-04.jpg',
    './pictures/Mozart-05.jpg'
];

const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let shuffledImgList = shuffle(frontImgList);

const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.setAttribute("bg-img", './pictures/Mozart-bg.jpg');
    card.src = './pictures/Mozart-bg.jpg';
    card.setAttribute("front-img", shuffledImgList[parseInt(card.getAttribute("cardnum")) - 1]);

    card.addEventListener('click', () => {
        turnOver(card);
    });
});

function turnOver(card) {
    if (stopperIsRunning == false) {
        Stopper();
    }
    if (card.getAttribute("flipped") == "false") {
        card.setAttribute("flipped", "true");
        setTimeout(() => card.src = card.getAttribute("front-img"), 250);
        card.classList.toggle('rotated');
        checkPairs();
    } else {
        turnBack(card);
    };
};

function checkPairs() {
    let flippedCards = [];
    cards.forEach(card => {
        if (card.getAttribute("flipped") == "true" && card.getAttribute("paired") == "false") {
            flippedCards.push(card);
        }
    });

    if (flippedCards.length == 2 && flippedCards[0].getAttribute("front-img") == flippedCards[1].getAttribute("front-img")) {
        flippedCards.forEach(card => { card.setAttribute("paired", "true"); });
        scores++;
        score.textContent = "Scores: " + scores;
        if (scores == 5) {
            Stopper();
        }
    } else if (flippedCards.length == 2) {
        setTimeout(() => {
            flippedCards.forEach(card => { turnBack(card); })
        }, 1000);
    }
};

function turnBack(card) {
    if (card.getAttribute("flipped") == "true" && card.getAttribute("paired") == "false") {
        card.setAttribute("flipped", "false");
        setTimeout(() => card.src = card.getAttribute("bg-img"), 250);
        card.classList.toggle('rotated');
    };
};