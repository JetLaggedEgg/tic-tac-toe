// Logic script for Noughts and Crosses by JetLaggedStudios.

// Notes Blue: #80CCFF  Red: #FF8080.

// Variables.

var playerTurn = 0; // The player turn. 0 is p1 and 1 is p2.

var matchWon = false; // Has the match been won?

var whoPlayedLast = 0; // Who played last... used for begining a new game.

var turnNumber = 0; // Turn number out of 9

var playerScore1 = 0; // Player one's score.
var playerScore2 = 0; // Player two's score.

var disableTile1 = 0;
var disableTile2 = 0;
var disableTile3 = 0;
var disableTile4 = 0;
var disableTile5 = 0;
var disableTile6 = 0;
var disableTile7 = 0;
var disableTile8 = 0;
var disableTile9 = 0;

// New get scores from cookies.

function getScores () {

	var playerScore1Cookie = getCookie('playerScore1data');
	var playerScore2Cookie = getCookie('playerScore2data');
	if (playerScore1Cookie == "" || playerScore2Cookie == "") {
		playerScore1 = "0";
		playerScore2 = "0";
	}
	else {
		playerScore1 = playerScore1Cookie;
		playerScore2 = playerScore2Cookie;
	}
	document.getElementById('playerOneScore').innerHTML = playerScore1;
	document.getElementById('playerTwoScore').innerHTML = playerScore2;
	console.log("Just got the cookies!");
}

// Cookies

// Get cookie
function getCookie(cname) {
	var cookieName = cname;
	var allCookies = document.cookie.split(';');
	var cookieData = "";
	for (var i=0; i < allCookies.length; i++) {
		if ((allCookies[i].indexOf(cookieName)) != -1) {
			match = allCookies[i].replace(" ", "");
			cookieData = match.substr((cookieName.length + 1));
		}
	}
	return cookieData;
}

// Set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// Delete cookie
function delCookie(cname) {
	document.cookie = cname + "=" + "" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
}

// Highlight Player one.
function p1highlight() {
	document.getElementById("playerTwoName").style.lineHeight = "25px";
	document.getElementById("playerOneName").style.lineHeight = "35px";
	document.getElementById("playerOneName").style.color = "#FFFFFF";
	document.getElementById("playerTwoName").style.color = "#433628";
	console.log("Just told player X it's their turn!");
}

// Highlight player two.
function p2highlight() {
	document.getElementById("playerOneName").style.lineHeight = "25px";
	document.getElementById("playerTwoName").style.lineHeight = "35px";
	document.getElementById("playerOneName").style.color = "#433628";
	document.getElementById("playerTwoName").style.color = "#FFFFFF";
	console.log("Just told player O it's their turn!");
}

// Initiate a turn.
function playTurn (x) {
	var played = false;
	if (played == false) {
		played = true;
		if (document.getElementById('inTile'+x).innerHTML != 'X' && document.getElementById('inTile'+x).innerHTML != 'O' && matchWon != true) {
			if (playerTurn === 0) {
				document.getElementById('tile'+x).style.backgroundColor = "#FF8080";
				document.getElementById('tile'+x).style.opacity = "1";
				document.getElementById('inTile'+x).innerHTML = "X";
				changeTurn();
				console.log("Changed tile "+x+" to an X.");
			}
			else {
				document.getElementById('tile'+x).style.backgroundColor = "#80CCFF";
				document.getElementById('tile'+x).style.opacity = "1";
				document.getElementById('inTile'+x).innerHTML = "O";
				changeTurn();
				console.log("Changed tile "+x+" to an O.");
			}
		}
		else {

		}
		played = false;
	}
}

// Change the player.
function changeTurn () {
	if (playerTurn === 0) {
		playerTurn = 1;
		turnNumber++;
		console.log("Turn "+turnNumber+" was just taken by player X.");
		checkWin();
	}
	else {
		playerTurn = 0;
		turnNumber++;
		console.log("Turn "+turnNumber+" was just taken by player O.");
		checkWin();
	}
}

// Update Score.
function updateScore () {
	document.getElementById('playerOneScore').innerHTML = playerScore1;
	document.getElementById('playerTwoScore').innerHTML = playerScore2;
	setCookie('playerScore1data', playerScore1, '365');
	setCookie('playerScore2data', playerScore2, '365');
}

// Check if anyone has won.
function checkWin () {

	// Tile inners
	var aa = document.getElementById('inTile1').innerHTML;
	var ab = document.getElementById('inTile2').innerHTML;
	var ac = document.getElementById('inTile3').innerHTML;
	var ba = document.getElementById('inTile4').innerHTML;
	var bb = document.getElementById('inTile5').innerHTML;
	var bc = document.getElementById('inTile6').innerHTML;
	var ca = document.getElementById('inTile7').innerHTML;
	var cb = document.getElementById('inTile8').innerHTML;
	var cc = document.getElementById('inTile9').innerHTML;

	// Tiles.
	var AA = document.getElementById('tile1').style;
	var AB = document.getElementById('tile2').style;
	var AC = document.getElementById('tile3').style;
	var BA = document.getElementById('tile4').style;
	var BB = document.getElementById('tile5').style;
	var BC = document.getElementById('tile6').style;
	var CA = document.getElementById('tile7').style;
	var CB = document.getElementById('tile8').style;
	var CC = document.getElementById('tile9').style;

	var checking = false;
	if (checking == false) {
		checking = true;
		if (playerTurn == 1) {
			whoPlayedLast = 0;
			if (aa == 'X' && ab == 'X' && ac == 'X') {
				AA.backgroundColor = "#9AFF9A";
				AB.backgroundColor = "#9AFF9A";
				AC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player X just won!");
				playerScore1++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (ba == 'X' && bb == 'X' && bc == 'X') {
				BA.backgroundColor = "#9AFF9A";
				BB.backgroundColor = "#9AFF9A";
				BC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player X just won!");
				playerScore1++;
				turnNumber = 0;
				matchWon = true;
				updateScore();

			}
			else if (ca == 'X' && cb == 'X' && cc == 'X') {
				CA.backgroundColor = "#9AFF9A";
				CB.backgroundColor = "#9AFF9A";
				CC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player X just won!");
				playerScore1++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
				
			}
			else if (aa == 'X' && ba == 'X' && ca == 'X') {
				AA.backgroundColor = "#9AFF9A";
				BA.backgroundColor = "#9AFF9A";
				CA.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player X just won!");
				playerScore1++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
				
			}
			else if (ab == 'X' && bb == 'X' && cb == 'X') {
				AB.backgroundColor = "#9AFF9A";
				BB.backgroundColor = "#9AFF9A";
				CB.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player X just won!");
				playerScore1++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
				
			}
			else if (ac == 'X' && bc == 'X' && cc == 'X') {
				AC.backgroundColor = "#9AFF9A";
				BC.backgroundColor = "#9AFF9A";
				CC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player X just won!");
				playerScore1++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
				
			}
			else if (aa == 'X' && bb == 'X' && cc == 'X') {
				AA.backgroundColor = "#9AFF9A";
				BB.backgroundColor = "#9AFF9A";
				CC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player X just won!");
				playerScore1++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
				
			}
			else if (ca == 'X' && bb == 'X' && ac == 'X') {
				CA.backgroundColor = "#9AFF9A";
				BB.backgroundColor = "#9AFF9A";
				AC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player X just won!");
				playerScore1++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
				
			}
			else if (turnNumber == 9) {
				matchWon = true;
				turnNumber = 0;
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#FF8533";
				AA.backgroundColor = "#FF8533";
				AB.backgroundColor = "#FF8533";
				AC.backgroundColor = "#FF8533";
				BA.backgroundColor = "#FF8533";
				BB.backgroundColor = "#FF8533";
				BC.backgroundColor = "#FF8533";
				CA.backgroundColor = "#FF8533";
				CB.backgroundColor = "#FF8533";
				CC.backgroundColor = "#FF8533";
				playerTurn = 0;
				console.log("Nobody won!");
			}
			else {
				p2highlight();
				playerTurn = 1;
			}
		}
		else if (playerTurn == 0) {
			whoPlayedLast = 1;
			if (aa == 'O' && ab == 'O' && ac == 'O') {
				AA.backgroundColor = "#9AFF9A";
				AB.backgroundColor = "#9AFF9A";
				AC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player O just won!");
				playerScore2++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (ba == 'O' && bb == 'O' && bc == 'O') {
				BA.backgroundColor = "#9AFF9A";
				BB.backgroundColor = "#9AFF9A";
				BC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player O just won!");
				playerScore2++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (ca == 'O' && cb == 'O' && cc == 'O') {
				CA.backgroundColor = "#9AFF9A";
				CB.backgroundColor = "#9AFF9A";
				CC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player O just won!");
				playerScore2++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (aa == 'O' && ba == 'O' && ca == 'O') {
				AA.backgroundColor = "#9AFF9A";
				BA.backgroundColor = "#9AFF9A";
				CA.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player O just won!");
				playerScore2++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (ab == 'O' && bb == 'O' && cb == 'O') {
				AB.backgroundColor = "#9AFF9A";
				BB.backgroundColor = "#9AFF9A";
				CB.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player O just won!");
				playerScore2++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (ac == 'O' && bc == 'O' && cc == 'O') {
				AC.backgroundColor = "#9AFF9A";
				BC.backgroundColor = "#9AFF9A";
				CC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player O just won!");
				playerScore2++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (aa == 'O' && bb == 'O' && cc == 'O') {
				AA.backgroundColor = "#9AFF9A";
				BB.backgroundColor = "#9AFF9A";
				CC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player O just won!");
				playerScore2++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (ca == 'O' && bb == 'O' && ac == 'O') {
				CA.backgroundColor = "#9AFF9A";
				BB.backgroundColor = "#9AFF9A";
				AC.backgroundColor = "#9AFF9A";
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
				console.log("Player O just won!");
				playerScore2++;
				turnNumber = 0;
				matchWon = true;
				updateScore();
			}
			else if (turnNumber == 9) {
				matchWon = true;
				turnNumber = 0;
				document.getElementById('playAgain').innerHTML = "Play Again?";
				document.getElementById('playAgain').style.backgroundColor = "#FF8533";
				AA.backgroundColor = "#FF8533";
				AB.backgroundColor = "#FF8533";
				AC.backgroundColor = "#FF8533";
				BA.backgroundColor = "#FF8533";
				BB.backgroundColor = "#FF8533";
				BC.backgroundColor = "#FF8533";
				CA.backgroundColor = "#FF8533";
				CB.backgroundColor = "#FF8533";
				CC.backgroundColor = "#FF8533";
				console.log("Nobody won!");
			}
			else {
				p1highlight();
				playerTurn = 0;
			}
		}
		checking = false;
		return;
	}
	return;
}

// Reset scores.
function resetScores () {
	var confiScore = confirm("Are you sure you want to clear your scores? This cannot be undone!");
	if (confiScore == true) {
		restartMatch();
		delCookie(playerScore1);
		delCookie(playerScore2);
		playerScore1 = 0;
		playerScore2 = 0;
		document.getElementById("playerOneScore").innerHTML = '0';
		document.getElementById("playerTwoScore").innerHTML = '0';
		console.log("Just reset scores :(");
	}
	else {

	}
}

// Wipe the board.
function restartMatch () {
	matchWon = false;
	document.getElementById('playAgain').innerHTML = "Restart Round";
	document.getElementById('playAgain').style.backgroundColor = "#BBADA0";
	clearTile(1);
	clearTile(2);
	clearTile(3);
	clearTile(4);
	clearTile(5);
	clearTile(6);
	clearTile(7);
	clearTile(8);
	clearTile(9);
	turnNumber = 0;
	if (whoPlayedLast === 0) {
		p1highlight();
		playerTurn = 0;
	}
	else {
		p2highlight();
		playerTurn = 1;
	}
	console.log("Just wiped the board clean!");
}

// Clear asked tile.
function clearTile (x) {
	document.getElementById("inTile"+x).innerHTML = "";
	document.getElementById("tile"+x).style.backgroundColor = "#EEE4DA";
	document.getElementById("tile"+x).style.opacity = "0.5";
	console.log("Cleaning tile"+x);
}