/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var winningNumber = generateWinningNumber(1,100);
var hint1 = generateWinningNumber(1,100);
var hint2 = generateWinningNumber(1,100);
var guessArray = [];
var guessRemaining = 5;


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(min,max){
	return Math.floor(Math.random() * (max-min+1) + min);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	var playersGuess = +$('#guess').val();
	checkGuess(playersGuess);
	$('#guess').val('');
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(playersGuess){
	if(winningNumber > playersGuess){
		guessArray.push(playersGuess);
		return "Your guess is lower than the winning number ";
	}else if (winningNumber < playersGuess){
		guessArray.push(playersGuess);
		return "Your guess is higher than the winning number ";
	}else 
		return "";
}

function guessMessage(playersGuess){
	var closeness;
	if(Math.abs(winningNumber - playersGuess) <= 10){
		closeness = "and you are within 10 digits!";
	} else if(Math.abs(winningNumber - playersGuess) > 10){
		closeness = "and you are more than 10 digits away!";
	}

	return closeness;
}
// Check if the Player's Guess is the winning number 

function checkGuess(playersGuess){
	if($.inArray(playersGuess, guessArray) > -1){
		$('.response').text("You already guessed that number!");
	}else if(playersGuess == 0) {
		$('.response').text("Submit a number 1-100!");
	}else if(winningNumber == playersGuess){
		guessRemaining = 0
		$('.response').text("You Got It!");
		$('.meme').append("<img src='http://i.giphy.com/8VrtCswiLDNnO.gif'>");
		$('form').hide();
		$('.playagain').show();
	}else {
		guessRemaining -= 1;
		
		if(guessRemaining === 0){
			$('.response').text("Game Over!");
			$('.meme').append("<img src='http://i.giphy.com/vy3mYVqIyXpsc.gif'>");
			$('form').hide();
			$('.playagain').show();
		}else {
			$('.response').text(lowerOrHigher(playersGuess) + guessMessage(playersGuess) + "\n" + "You have: " + guessRemaining + " remaining guesses.");
		}
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var possibleNums = [hint1, winningNumber, hint2];
	var hint = "The winning number is one of these numbers: "
	$('.response').text(hint + possibleNums);
}

// Allow the "Player" to Play Again

function playAgain(){
	guessRemaining = 5;
	$('.response').html("");
	$('.meme').html('');
	winningNumber = generateWinningNumber(1,100);
	guessArray = [];
	$('form').show();
	$('.playagain').hide();
}
/* **** Event Listeners/Handlers ****  */

$(document).ready(function() {
  $(window).keydown(function(event){
    if(guessRemaining == 0){
    	playAgain()
    }else if(event.keyCode == 13) {
      event.preventDefault();
      playersGuessSubmission();
    }
  });
});