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

// Dont break this, it holds where the riddles reside on the map and if theyve been triggered or not.

const riddleTriggers = [
    { x: 100, y: 150, riddleNumber: 1, triggered: false },
    { x: 100, y: 200, riddleNumber: 2, triggered: false },
    { x: 101, y: 230, riddleNumber: 3, triggered: false }
];

document.addEventListener('DOMContentLoaded', initializeGame);

function initializeGame() {
    const bgMusic = document.getElementById('background-music');
    bgMusic.play();
    startRiddleTimer();
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

let audioElement;

// Initialize the audio element
document.addEventListener('DOMContentLoaded', () => {
    audioElement = new Audio('assets/trigger sound.mp3');
});

function checkForRiddleTrigger() {
    const threshold = 10; // Define your threshold here
    const character = document.getElementById('character');
    const left = character.offsetLeft;
    const top = character.offsetTop;

    riddleTriggers.forEach(trigger => {
        if (!trigger.triggered && Math.abs(left - trigger.x) < threshold && Math.abs(top - trigger.y) < threshold) {
            trigger.triggered = true; // Set the riddle as triggered
            showRiddle(trigger.riddleNumber);
            resetRiddleTimer();
            playRiddleTriggerAudio();
        }
    });
}



function playRiddleTriggerAudio() {
    // Check if the audio element is defined
    if (audioElement) {
        // Play the audio
        audioElement.play();
    }
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

function hideRiddle(number) {
    const riddleId = 'riddle-container' + number;
    const riddleContainer = document.getElementById(riddleId);
    riddleContainer.style.display = 'none';
}

function checkAnswer(answer, riddleNumber) {
    // Update this function to handle different answers for different riddles
    if (answer !== correctAnswers[riddleNumber]) {
        loseLife();
        alert('You will feed the ravens...')
    } else {
        alert('And so you prolong the end...');
        resetRiddleTimer();
        hideRiddle(riddleNumber);
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
let riddleTimer;

function startRiddleTimer() {

    const riddleTimeout = 15000;

    riddleTimer = setTimeout(() => {
        showNextRiddle();
    }, riddleTimeout);
}

function showNextRiddle() {

    // Determine which riddle to show next
    const nextRiddleNumber = findNextRiddleNumber();
    showRiddle(nextRiddleNumber);
}

function findNextRiddleNumber() {
    // Implement logic to determine the next riddle number
    // This can be based on the last answered riddle or other game logic
    // Example: return lastAnsweredRiddleNumber + 1;
}

function resetRiddleTimer() {
    clearTimeout(riddleTimer);
    startRiddleTimer();
}

// Call startRiddleTimer when the game starts or a riddle is answered
startRiddleTimer();

// Remember to call resetRiddleTimer() when the player finds or answers a riddle
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

let correctlyAnsweredRiddles = 0; // Tracks the number of correctly answered riddles

function checkAnswer(answer, riddleNumber) {
    if (answer !== correctAnswers[riddleNumber]) {
        loseLife();
        alert('And so you shall feed the ravens...');
    } else {
        alert('And so you prolong the end...');
        correctlyAnsweredRiddles++;
        if (correctlyAnsweredRiddles >= 3) {
            gameWin();
        } else {
            resetRiddleTimer();
            hideRiddle(riddleNumber);
        }
    }
}

function gameWin() {
    clearTimeout(riddleTimer);
    alert('Despite the sea of faceless whispers, and the pounding in your throbbing skull...you find a sense of relief as you approach a clearing in the shadows...');
    document.getElementById('character').style.display = 'none';
    const gameWinScreen = document.getElementById('game-win-screen');
    gameWinScreen.style.display = 'block';

    // Handle win restart button click
    document.getElementById('win-restart-button').addEventListener('click', function() {
        location.reload(); // Reload the page to restart the game
    });
}

function gameOver() {
    clearTimeout(riddleTimer);
    alert('This world of your thrives in conflict. Sleep...and be born anew.');
    document.getElementById('character').style.display = 'none';
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