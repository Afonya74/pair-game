'use strict';
let stopperTime = 0;

let seconds = 0;
let minutes = 0;
let hours = 0;
let stopperIsRunning = false;
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

document.querySelector('.start-stop-btn').addEventListener('click', () => {
    if (stopperIsRunning) {
        stopperIsRunning = false;

        seconds = 0;
        minutes = 0;
        hours = 0;
    } else {
        stopperIsRunning = true;
    }
});


const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('rotated');

    });
});