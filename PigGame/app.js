/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentScore = 0;
var playersName = ['',''];
var scores = [0,0];
var activePlayer = 0;
var roundScore_1 = 0;
var roundScore_2 = 0;
var lastRoundScore_1 = 0;
var lastRoundScore_2 = 0;
var isWinner = false;


function newGame(){
    document.querySelector('.player-0-panel').style.display = 'block';
    document.querySelector('.player-1-panel').style.display = 'block';
    document.querySelector('.btn-new').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.score').style.display = 'block';
    document.querySelector('.dice-1').style.display = 'block';
    document.querySelector('.dice-2').style.display = 'block';
    document.querySelector('.data').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

}

document.querySelector('.start').addEventListener('click',function(){
    playersName[0] = document.getElementById('player-1-name').value;
    playersName[1] = document.getElementById('player-2-name').value;
    winScore = parseInt(document.getElementById('winningScore').value);
    console.log(playersName[0] + ' '  + playersName[1] + ' ' + winScore + ' ' +  typeof(winScore));
    document.querySelector('#name-0').textContent = playersName[0];
    document.querySelector('#name-1').textContent = playersName[1];
    document.querySelector('#score').textContent = winScore;
    if(!isNaN(winScore) && (typeof(winScore) === 'number')){
    newGame();
    }else{
        alert('Please Enter a Valid Winning Score')
    }
})

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(!isWinner){
    roundScore_1 = Math.floor(Math.random()*6) + 1;
    roundScore_2 = Math.floor(Math.random()*6) + 1;
    if((roundScore_1 === 1) || (roundScore_2 === 1)){
        currentScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = currentScore;

        newPlayer();
    }else if((lastRoundScore_1 === 6 && roundScore_1 === 6) || (lastRoundScore_2 === 6 && roundScore_2 === 6)){
        scores[activePlayer] = 0;
        currentScore = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
    }else{
        currentScore += (roundScore_1 + roundScore_2);
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
    }    
    lastRoundScore_1 = roundScore_1;
    lastRoundScore_2 = roundScore_2;
    document.querySelector('.dice-1').src = 'dice-' + roundScore_1 + '.png';
    document.querySelector('.dice-2').src = 'dice-' + roundScore_2 + '.png';
    }
    
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    document.querySelector('#current-' + activePlayer).textContent = currentScore;
    if(scores[activePlayer] >= winScore){
        isWinner = true;
        document.querySelector('#name-' + activePlayer).textContent = playersName[0] + ' wins';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        document.querySelector('.player-' + (activePlayer+1) + '-panel').classList.remove('active');

    }else{
        newPlayer();
    }
})

function newPlayer(){
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}