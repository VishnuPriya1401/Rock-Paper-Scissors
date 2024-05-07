

let score=JSON.parse(localStorage.getItem('score')) || {wins:0 , loses: 0, ties:0};

updateScoreElement();

document.querySelector('.js-rock-btn').addEventListener('click',()=>{
  playGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click',()=>{
  playGame('paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click',()=>{
  playGame('scissors');
});

document.querySelector('.reset-btn').addEventListener('click', ()=>{
  checkReset();
});


document.querySelector('.auto-btn').addEventListener('click',()=>{
  autoplay();
});



document.body.addEventListener('keydown',(event)=>{
  if((event.key === 'r')||(event.key === 'R')){playGame('rock');}
  else if((event.key === 'p')||(event.key === 'P')){playGame('paper');}
  else if((event.key === 's')||(event.key === 'S')){playGame('scissors');}
  else if(event.key === 'Backspace'){checkReset();}
  else if((event.key === 'a')||(event.key === 'A')){autoplay();}
});

let isAutoPlaying = false;
let intervalID;

function autoplay(){

  if(!isAutoPlaying){
    intervalID = setInterval(()=>{
      const computer = pickComputerMove();
      playGame(computer);
      document.querySelector('.auto-btn').innerHTML = 'Stop Play';
    }, 1000);

    isAutoPlaying=true;
  }
  else{
    clearInterval(intervalID);
    isAutoPlaying=false;
    document.querySelector('.auto-btn').innerHTML = 'Auto Play';
  }
}

function checkReset(){
  document.querySelector('.confirmation').innerHTML=`
  <p> Are you sure you want to reset the score? </p>
  <button class="confirmation-btn yes-reset" onclick="resetScore();"> yes </button>
  <button class="confirmation-btn" onclick="document.querySelector('.confirmation').innerHTML='';"> no </button>`;
}

function resetScore(){
  score.wins=0; score.loses=0; score.ties=0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.confirmation').innerHTML='';
}

function playGame(playerMove){
  let computerMove = pickComputerMove();

  let result ='';

  if(playerMove === 'rock'){
    if(computerMove === 'rock'){
        result='Tie.';
    } else if(computerMove === 'paper'){
        result='You Lose.';
    } else if(computerMove === 'scissors'){
        result='You win.';
    }
  }
  else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
        result='You win.';
    } else if(computerMove === 'paper'){
        result='Tie.';
    } else if(computerMove === 'scissors'){
        result='You Lose.';
    }
  }
  else if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result='You Lose.';
    } else if(computerMove === 'paper'){
        result='You win.';
    } else if(computerMove === 'scissors'){
        result='Tie.';
    }
  }

  
  if(result === 'You win.'){
    score.wins+=1;
  } else if(result === 'You Lose.'){
    score.loses+=1;
  } else if(result === 'Tie.'){
    score.ties+=1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="result-icon"> --  Computer <img src="images/${computerMove}-emoji.png" class="result-icon">`;
  
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}, Loses : ${score.loses}, Ties : ${score.ties}`;
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3){
      computerMove = 'rock';
  } else if(randomNumber >= 1/3 && randomNumber < 2/3){
      computerMove = 'paper';
  } else if(randomNumber >= 2/3 && randomNumber < 1){
      computerMove = 'scissors';
  }

  return computerMove;
}
