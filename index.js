/* Things to make
Character movement

Events for riddles

Events for getting riddles wrong

Hearts to track life

Game over screen

Entraces to next area offorest */



document.addEventListener('keydown', function(event) {
    const step = 10; // How many pixels the character moves
    const character = document.getElementById('character');

    let left = character.offsetLeft;
    let top = character.offsetTop;

    switch(event.key) {
        case 'ArrowUp': // Move North
            character.style.top = Math.max(top - step, 0) + 'px';
            break;
        case 'ArrowDown': // Move South
            character.style.top = Math.min(top + step, 350) + 'px';
            break;
        case 'ArrowLeft': // Move West
            character.style.left = Math.max(left - step, 0) + 'px';
            break;
        case 'ArrowRight': // Move East
            character.style.left = Math.min(left + step, 350) + 'px';
            break;
    }
});

document.getElementById('submit-answer').addEventListener('click', function() {
    const selectedAnswer = document.getElementById('riddle-answers').value;
    checkAnswer(selectedAnswer);
});

function checkAnswer(answer) {
    const correctAnswer = "Egg"; // You can change this based on the current riddle
    if (answer !== correctAnswer) {
        loseLife();
    } else {
        alert('And so you prolong the end...');
        // You can add logic for correct answer, like moving to next riddle
    }
}

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
    for (let i = 0; i < hearts.length; i++) {
        if (i < lives) {
            hearts[i].style.visibility = 'visible';
        } else {
            hearts[i].style.visibility = 'hidden';
        }
    }
}

function gameOver() {
    alert('You have been consumed by Witherfield...');
    // Add more game over logic here
}


// Example of losing a life
// Call loseLife() whenever the character loses a life in your game
// loseLife();
