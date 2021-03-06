 // Generate computer selection 
 const computerPlay = () => {
    const rpc = ['rock', 'paper', 'scissors'];
    return rpc[Math.floor(Math.random() * rpc.length)];
}

// Play a single round
function playRound(e) {
    const playerSelection= e.target.textContent.toLowerCase();
    const computerSelection = computerPlay();
    let playerScore = 0;
    let computerScore = 0;
    let playResults = '';
    let playStyle = '';
    if( playerSelection == 'rock' && computerSelection == 'scissors' || 
        playerSelection == 'paper' && computerSelection == 'rock' ||
        playerSelection == 'scissors' && computerSelection == 'paper'
    ){
        playResults = `You win. ${playerSelection} beats ${computerSelection}`;
        playerScore = 1;
        playStyle = 'background: #FDC1C5; color: white; font-size: 16px';
    } else if (
        playerSelection == 'rock' && computerSelection == 'paper' || 
        playerSelection == 'paper' && computerSelection == 'scissors' ||
        playerSelection == 'scissors' && computerSelection == 'rock'
    ){
        playResults  = `You lose. ${computerSelection} beats ${playerSelection}`;
        computerScore = 1;
        playStyle = 'background: #85A3B2; color: white; font-size: 16px';
    } else {
        playResults = 'It\'s a tie.';
        playStyle = 'background: #FFDA03; color: white; font-size: 16px';
    }
    return [playResults, playerScore, computerScore, playStyle];
}

// Add the playing results of each round to HTML page
function addHtml(playData) {
    const displayResults = document.querySelector('.displayResults');

        const playRound = document.createElement('div');
        playRound.setAttribute('id', 'playRound');
            // Announce a winner of the game once one player reaches 5 points
            const finalResult = document.createElement('h2');
            finalResult.setAttribute('id', 'finalResult');
            playRound.appendChild(finalResult);
            
            if (playData[5] == 5) {
                finalResult.textContent ='Game over. You are the winner!';
                buttons.forEach(button => button.removeEventListener('click', game));
            } else if (playData[6] == 5) {
                finalResult.textContent = 'Game over. You lost the game!';
                buttons.forEach(button => button.removeEventListener('click', game));
            }

            const roundNumber = document.createElement('p');
            roundNumber.setAttribute('id', 'roundNumber');
            roundNumber.textContent ='Round ' + playData[4] + ':';

            playRound.appendChild(roundNumber);
            
            // Display the play result of a sing round
            const playResults = document.createElement('h1');
            playResults.setAttribute('id', 'playResults');
            playResults.textContent = playData[0];
            playResults.style.fontSize = '16px';
            playResults.style.cssText = playData[3];
            playRound.appendChild(playResults);

            // Display the running score
            const scoreboard = document.createElement('p')
            scoreboard.textContent = 'Score: (You) ' + playData[5] + ':' + playData[6] + ' (Computer)';
            playRound.appendChild(scoreboard);

            // const line = document.createElement('hr')
            // playRound.appendChild(line);

    displayResults.insertBefore(playRound, displayResults.childNodes[0]);
}

// Display the result of a single round 
let roundNumber = 1;
let playerScore = 0;
let computerScore = 0;
function game(e) {
    const playData = playRound(e);

    playerScore += playData[1];
    computerScore += playData[2];
    playData.push(roundNumber++, playerScore, computerScore);

    addHtml(playData);
}

// Make the buttons listen for click event 
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => button.addEventListener('click', game));

// Set up play again button to reset everything
const playAgain = document.querySelector('#playAgain');
playAgain.addEventListener('click', () => {
    const displayResults = document.querySelector('.displayResults');
    while(displayResults.hasChildNodes()) {
        displayResults.removeChild(displayResults.firstChild)
    }
    roundNumber = 1;
    playerScore = 0;
    computerScore = 0;
    buttons.forEach(button => button.addEventListener('click', game));
});