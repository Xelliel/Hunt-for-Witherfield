console.log("Script Loaded!");

document.getElementById('start-game').addEventListener('click', function() {
    const bgMusic = document.getElementById('background-music');
    bgMusic.play();
});

document.getElementById('toggle-music').addEventListener('click', function() {
    const bgMusic = document.getElementById('background-music');
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});

const riddleTriggers = [
    { x: 100, y: 150, riddleNumber: 1 },
    { x: 200, y: 250, riddleNumber: 2 },
    { x: 300, y: 350, riddleNumber: 3 }
];

document.addEventListener('DOMContentLoaded', initializeGame);

function initializeGame() {
    const bgMusic = document.getElementById('background-music');
    bgMusic.play();
    // Any other initialization code can go here
}

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    const step = 10;
    const character = document.getElementById('character');
    let left = character.offsetLeft;
    let top = character.offsetTop;

    switch(event.key) {
        case 'ArrowUp':
            character.style.top = Math.max(top - step, 0) + 'px';
            break;
        case 'ArrowDown':
            character.style.top = Math.min(top + step, 480) + 'px';
            break;
        case 'ArrowLeft':
            character.style.left = Math.max(left - step, 0) + 'px';
            break;
        case 'ArrowRight':
            character.style.left = Math.min(left + step, 640) + 'px';
            break;
    }

    checkForRiddleTrigger();
    checkForEntranceEvent();
    toggleCharacterRunAnimation(event.key, true);
}

function checkForRiddleTrigger() {
    const threshold = 10; // Define your threshold here
    const character = document.getElementById('character');
    const left = character.offsetLeft;
    const top = character.offsetTop;

    riddleTriggers.forEach(trigger => {
        if (Math.abs(left - trigger.x) < threshold && Math.abs(top - trigger.y) < threshold) {
            showRiddle(trigger.riddleNumber);
        }
    });
}

function showRiddle(number) {
    const riddleId = 'riddle-container' + number;
    const riddleContainer = document.getElementById(riddleId);
    riddleContainer.style.display = 'block';
}

document.addEventListener('keyup', handleKeyUp);

function handleKeyUp(event) {
    if (event.key.startsWith('Arrow')) {
        toggleCharacterRunAnimation(event.key, false);
    }
}

function toggleCharacterRunAnimation(key, isRunning) {
    const character = document.getElementById('character');
    if (key.startsWith('Arrow')) {
        if (isRunning) {
            character.classList.add('character-run');
        } else {
            character.classList.remove('character-run');
        }
    }
}

document.querySelectorAll('.submit-answer').forEach(button => {
    button.addEventListener('click', function(event) {
        const riddleNumber = this.dataset.riddleNumber; // Assuming each button has a data-riddle-number attribute
        const selectedAnswer = document.getElementById('riddle-answers' + riddleNumber).value;
        checkAnswer(selectedAnswer, riddleNumber);
    });
});

function checkAnswer(answer, riddleNumber) {
    // Update this function to handle different answers for different riddles
    if (answer !== correctAnswers[riddleNumber]) {
        loseLife();
        alert('You will feed the ravens...')
    } else {
        alert('And so you prolong the end...');
        // Logic for correct answer
    }
}

// Define your correct answers for each riddle here
const correctAnswers = {
    1: "No, I'll find my own way",
    2: "Mercy.",
    3: "If that's the only way..."
};

function checkForEntranceEvent() {
    const character = document.getElementById('character');
    const left = character.offsetLeft;
    const top = character.offsetTop;
    const entrancePosition = { x: 300, y: 150 };

    if (left === entrancePosition.x && top === entrancePosition.y) {
        goToNextArea();
    }
}

//function goToNextArea() {
   // alert('You have entered the Forest of Shadows...');
    // Add logic to transition to the next area, no time for a next area, just work on functionality.
//}

let lives = 3;

function loseLife() {
    if (lives > 0) {
        lives--;
        updateLivesDisplay();
        if (lives === 0) {
            gameOver();
        }
    }
}

function updateLivesDisplay() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.style.visibility = index < lives ? 'visible' : 'hidden';
    });
}

function gameOver() {
    alert('You have been consumed by Witherfield...');
    const gameOverScreen = document.getElementById('game-over-screen');
    const restartButton = document.getElementById('restart-button');

    // Display game over screen
    gameOverScreen.style.display = 'block';

    // Handle restart button click
    restartButton.addEventListener('click', function() {
        // Reload the page to restart the game
        location.reload();
    // Add more game over logic here
})
}