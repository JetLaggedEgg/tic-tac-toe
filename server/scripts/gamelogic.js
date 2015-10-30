// Game Logic for Tic-Tac-Toe by JetLaggedStudios. Reuse my code, but not my identity, thanks!
// Also, hey. I'm Dan. Checkout my portfolio at http://jetlaggedstudios.github.io/ for more of my work.
// In addition, I will also try to completely comment the hell out of this file to explain my code.
// Comments will be added within new updates as I haven't completed the game yet, also sorry for messy code.
// Notes Blue: #80CCFF  Red: #FF8080  Yellow: #E1DF55  Green: #9AFF9A  Orange: #FF8533.
// Game Triggers
var gameMode = 1; // The game mode. '0' is 1 vs PC, '1' is 1 vs 1 and '2' is 3 vs all.
var turnNumber = 0; // The turn number. Used to check for the end of the game/draw. 9 turns in game mode '0' and '1' and 16 in '2'.
var playerTurn = 0; // The current player turn.
var gameWon = false; // Game won check. Is set true on draw, full board or win.
var justWon = 0; // V
/* Last player that won. Will be checked then wiped.
 *In this case 1 is player X and 2 is player O then 3 is player Y,
 *this refrains from confusion with and allows 0 to be a no one won tag.
 */

// Settings

var winnerGoesFirst = true; // The winner goes first. True by default.
var monoTone = false; // Mono tone colour scheme. False by default.
var firstTo3 = false; // First to three in game mode 2. Alternate for 3 vs all, usually it's the player with the most 3's that wins when the board is full.

// Player names.

var playerOneName = "Player X"; // Player one's name. 'Player X' by default.
var playerTwoName = "Player O"; // Player two's name. 'Player O' by default.
var playerThreeName = "Player Y"; // Player three's name. 'Player Y' by default.

// Scores

var gm0ps1 = 0; // Score for player 1 in game mode 0.
var gm0ps2 = 0; // Score for player 2 in game mode 0.
var gm1ps1 = 0; // Score for player 1 in game mode 1.
var gm1ps2 = 0; // Score for player 2 in game mode 1.
var gm2ps1 = 0; // Score for player 1 in game mode 2.
var gm2ps2 = 0; // Score for player 2 in game mode 2.
var gm2ps3 = 0; // Score for player 3 in game mode 2.

// 3 Way - number of 3s.

var player1threes = 0; // Number of three in a rows on GM 2 for player X.
var player2threes = 0; // Number of three in a rows on GM 2 for player O.
var player3threes = 0; // Number of three in a rows on GM 2 for player Y.

// 3 way mode suits, 0 is unclaimed 1 is byt player X and so on.
// This is used to keep a track of what 3 in a row combinations have been taken.

var suit11 = 0;
var suit12 = 0;
var suit21 = 0;
var suit22 = 0;
var suit31 = 0;
var suit32 = 0;
var suit41 = 0;
var suit42 = 0;
var suit51 = 0;
var suit52 = 0;
var suit61 = 0;
var suit62 = 0;
var suit71 = 0;
var suit72 = 0;
var suit81 = 0;
var suit82 = 0;
var suit90 = 0;
var suit91 = 0;
var suit92 = 0;
var suit93 = 0;
var suit100 = 0;
var suit101 = 0;
var suit102 = 0;
var suit103 = 0;

// Game pointers

var gameModeName = document.getElementById('gameModeName');

// Player names and tags.
var playerOneTag = document.getElementById('playerOneName');
var playerOneInput = document.getElementById('playerOneTag');
var playerTwoTag = document.getElementById('playerTwoName');
var playerTwoInput = document.getElementById('playerTwoTag');
var playerThreeTag = document.getElementById('playerThreeName');
var playerThreeInput = document.getElementById('playerThreeTag');

/* Dealings with cookies, my way!
 * You can reuse anything between the following 'REUSE' tags
 * in any code you make. It simplifies using cookies a lot.
 * You can also look into changing the setCookie function to allow
 * other parameters, it should be straight forward to do so, contact
 * if you want me to do that for you, if not checkout my portfolio
 * because I plan to use cookies in future projects and maybe in older
 * ones.
 */

// <REUSE>

/* Get a cookie.
 * Just call the getCookies function
 * with the name of the requested cookie
 * and it will return the cookie's data.
 */
function getCookie(cname) {
    var cookieName = cname;
    var allCookies = document.cookie.split(';');
    var cookieData = "";
    for (var i = 0; i < allCookies.length; i++) {
        if ((allCookies[i].indexOf(cookieName)) != -1) {
            match = allCookies[i].replace(" ", "");
            cookieData = match.substr((cookieName.length + 1));
        }
    }
    return cookieData;
}

/* Set a cookie.
 * Just call the setCookie function
 * with the name of the new cookie, it's
 * value to be held and lastly the number
 * of days you want the cookie to live.
 * All are best parsed as strings.
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/* Delete a cookie.
 * Just call the delCookie function
 * with the name of the cookie that
 * you wish to delete.
 * Sets the expiry date to the past
 * and wipes cookie data.
 */
function delCookie(cname) {
    document.cookie = cname + "=" + "" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

// </REUSE>

// Initialisation Stuff (to setup game after reading cookies!)

function initialise() {

    // Cookie Variables.
    var savedGm = getCookie("gameMode"); // Saved Game Mode.
    var savedWinnerGoesFirst = getCookie("wGoesFirst"); // Saved Winner Goes first setting.
    var savedMonoTone = getCookie("monoMode"); // Saved monoTone mode setting.
    var savedFirstTo3 = getCookie("firstTo3"); // Saved first to 3 (for GM 2) setting.

    // Load Scores.
    if (getCookie("gm0ps1") != '' && getCookie("gm0ps2") != '' && getCookie("gm1ps1") != '' && getCookie("gm1ps2") != '' && getCookie("gm2ps1") != '' && getCookie("gm2ps2") != '' && getCookie("gm2ps3") != '') {
        gm0ps1 = getCookie("gm0ps1");
        gm0ps2 = getCookie("gm0ps2"); // Saved player 2 score for game mode 0.
        gm1ps1 = getCookie("gm1ps1"); // Saved player 1 score for game mode 1.
        gm1ps2 = getCookie("gm1ps2"); // Saved player 2 score for game mode 1.
        gm2ps1 = getCookie("gm2ps1"); // Saved player 1 score for game mode 2.
        gm2ps2 = getCookie("gm2ps2"); // Saved player 2 score for game mode 2.
        gm2ps3 = getCookie("gm2ps3"); // Saved player 3 score for game mode 2.
    }

    // Player name cookies.
    var savedNamePlayerOne = getCookie("playerOneName");
    var savedNamePlayerTwo = getCookie("playerTwoName");
    var savedNamePlayerThree = getCookie("playerThreeName");

    // Load game mode.
    if (savedGm != "") {
        if (savedGm == 0) {
            setUpGame(0);
        } else if (savedGm == 1) {
            setUpGame(1);
        } else if (savedGm == 2) {
            setUpGame(2);
        }
    } else if (savedGm == "") {
        setUpGame(1);
    }

    // Load other settings.

    // Winner goes first setting.
    if (savedWinnerGoesFirst === "true" || savedWinnerGoesFirst == '') {
        winnerGoesFirst = true;
        document.getElementById('winnerGoesFirstCheck').checked = true;
    } else if (savedWinnerGoesFirst === "false") {
        winnerGoesFirst = false;
        document.getElementById('winnerGoesFirstCheck').checked = false;
    }

    // Monotone Setting.
    if (savedMonoTone === "true") {
        monoTone = true;
        document.getElementById('monoToneCheck').checked = true;
        monoToneMode('on');
    } else if (savedMonoTone === "false" || savedMonoTone == '') {
        monoTone = false;
        document.getElementById('monoToneCheck').checked = false;
        monoToneMode('off');
    }

    // First to three.
    if (savedFirstTo3 === "true") {
        firstTo3 = true;
        document.getElementById('firstToThreeCheck').checked = true;
    } else if (savedFirstTo3 === "false" || savedWinnerGoesFirst == '') {
        firstTo3 = false;
        document.getElementById('firstToThreeCheck').checked = false;
    }

    // Load player names.
    if (savedNamePlayerOne != '' && savedNamePlayerTwo != '' && savedNamePlayerThree != '') {
        // Pull names from cookies.
        playerOneName = savedNamePlayerOne;
        playerTwoName = savedNamePlayerTwo;
        playerThreeName = savedNamePlayerThree;
        // Make name tags say what ever the names are.
        playerOneTag.innerHTML = playerOneName;
        playerTwoTag.innerHTML = playerTwoName;
        playerThreeTag.innerHTML = playerThreeName;
        // Load the names into the settings input fields.
        playerOneInput.value = playerOneName;
        playerTwoInput.value = playerTwoName;
        playerThreeInput.value = playerThreeName;
    }

    updateCookies();
}

// Game actions.

// Mono Tone Mode.
function monoToneMode(command) {
    // Variables of elements to be changed.
    var html = document.getElementById('html');
    var upperNav = document.getElementById('upperNav');
    var lowerNav = document.getElementById('lowerNav');
    var gameBoard = document.getElementById('gameBoard');
    var playerScoreOne = document.getElementById('playerOneScore');
    var playerScoreTwo = document.getElementById('playerTwoScore');
    var playerScoreThree = document.getElementById('playerThreeScore');
    var paraOne = document.getElementById('paraOne');
    var paraTwo = document.getElementById('paraTwo');
    var paraThree = document.getElementById('paraThree');
    var b1 = document.getElementById('b1');
    var b2 = document.getElementById('b2');
    var extLink = document.getElementsByClassName('ext');

    if (command == 'on') {
        html.style.backgroundColor = '#202020';
        upperNav.style.backgroundColor = '#BBADA0';
        lowerNav.style.backgroundColor = '#BBADA0';
        gameBoard.style.backgroundColor = '#404040';
        gameModeName.style.color = '#BBADA0';
        playerScoreOne.style.color = '#BBADA0';
        playerScoreTwo.style.color = '#BBADA0';
        playerScoreThree.style.color = '#BBADA0';
        paraOne.style.color = '#BBADA0';
        paraTwo.style.color = '#BBADA0';
        paraThree.style.color = '#BBADA0';
        b1.style.color = '#BBADA0';
        b2.style.color = '#BBADA0';
        extLink[0].style.color = '#BBADA0';
        extLink[1].style.color = '#BBADA0';
        extLink[2].style.color = '#BBADA0';
        extLink[3].style.color = '#BBADA0';
        extLink[4].style.color = '#BBADA0';
    } else if (command == 'off') {
        html.style.backgroundColor = '#FAF8EF';
        upperNav.style.backgroundColor = '#EEE4DA';
        lowerNav.style.backgroundColor = '#BBADA0';
        gameBoard.style.backgroundColor = '#BBADA0';
        gameModeName.style.color = '#433628';
        playerScoreOne.style.color = '#433628';
        playerScoreTwo.style.color = '#433628';
        playerScoreThree.style.color = '#433628';
        paraOne.style.color = '#433628';
        paraTwo.style.color = '#433628';
        paraThree.style.color = '#433628';
        b1.style.color = '#433628';
        b2.style.color = '#433628';
        extLink[0].style.color = '#433628';
        extLink[1].style.color = '#433628';
        extLink[2].style.color = '#433628';
        extLink[3].style.color = '#433628';
        extLink[4].style.color = '#433628';
    }
}

function changeSetting(setting) {
    if (setting == 1) {
        if (winnerGoesFirst == true) {
            winnerGoesFirst = false;
            console.log("Winner now doesn't go first.");
        } else if (winnerGoesFirst == false) {
            winnerGoesFirst = true;
            console.log("Winner now goes first.");
        }
    }
    if (setting == 2) {
        if (monoTone == false) {
            monoTone = true;
            monoToneMode('on');
            console.log("Mono Tone is now on.");
        } else if (monoTone == true) {
            monoTone = false;
            monoToneMode('off');
            console.log("Mono Tone is now on.");
        }
    }
    if (setting == 3) {
        if (firstToThree == false) {
            firstToThree = true;
            console.log("First to 3 in a row is now on.");
        } else if (firstTo3 == true) {
            firstToThree = false;
            console.log("First to 3 in a row is now off.");
        }
    }
    updateCookies();
}

// Check player names and place them onto the screen.
function checkNames() {
    // Menu error message pointer.
    var errMsg = document.getElementById('menuError');
    if (playerOneInput != '' && playerTwoInput != '' && playerThreeInput != '') {
        if (playerOneInput.value.length <= 12 && playerTwoInput.value.length <= 12 && playerThreeInput.value.length <= 12 && playerOneInput.value.length > 0 && playerTwoInput.value.length > 0 && playerThreeInput.value.length > 0) {
            playerOneName = playerOneInput.value;
            playerTwoName = playerTwoInput.value;
            playerThreeName = playerThreeInput.value;
            errMsg.innerHTML = "";
        } else {
            errMsg.innerHTML = "Names not saved. Names must be between 1 and 12 characters long.";
        }
    }

    // Make name tags say what ever the names are.
    playerOneTag.innerHTML = playerOneName;
    playerTwoTag.innerHTML = playerTwoName;
    playerThreeTag.innerHTML = playerThreeName;

    // Save new names.
    updateCookies;
}

function wipeNames() {
    var confiNames = confirm("Are you sure you want to clear your names?");
    if (confiNames == true) {
        // Reset names.
        playerOneName = 'Player X';
        playerTwoName = 'Player O';
        playerThreeName = 'Player Y';
        // Change display names.
        playerOneTag.innerHTML = playerOneName;
        playerTwoTag.innerHTML = playerTwoName;
        playerThreeTag.innerHTML = playerThreeName;
        // Change input fields back to originals.
        playerOneInput.value = 'Player X';
        playerTwoInput.value = 'Player O';
        playerThreeInput.value = 'Player Y';
        // Delete the name cookies.
        delCookie('playerOneName');
        delCookie('playerTwoName');
        delCookie('playerThreeName');
        // Save standard names to cookies.
    }
    updateCookies();
}

// Setup the game type.
function setUpGame(GM) {
    clearBoard();
    highlightPlayer(0); // Get Tell player one it's their turn.
    if (GM == 0) {
        gameModeName.innerHTML = "Single Player";
        gameMode = 0;
        // Make it player X's turn.
        highlightPlayer(0);
        playerTurn = 0;
        turnNumber = 0;
        // Hide player 3's name and tile.
        document.getElementById('playerThreeName').style.display = "none";
        document.getElementById('playerThreeScore').style.display = "none";
        // Hide the first to 3 setting.
        document.getElementById('firstToThree').style.display = "none";
        // Resize all tiles
        var nums = [];
        for (var i = 1; i < 17; i++) {
            nums[i] = parseInt(document.getElementById("tile" + i).style.display = "block");
            nums[i] = parseInt(document.getElementById("tile" + i).style.width = "92px");
            nums[i] = parseInt(document.getElementById("tile" + i).style.height = "92px");
        }
        // Hide un-needed tiles.
        for (var i = 10; i < 17; i++) {
            nums[i] = parseInt(document.getElementById("tile" + i).style.display = "none");
        }
        console.log("Changed game mode to " + gameMode + " and changed the grid.");
        updateScores(gameMode);
    } else if (GM == 1) {
        gameModeName.innerHTML = "Two Players";
        gameMode = 1;
        // Make it player X's turn.
        highlightPlayer(0);
        playerTurn = 0;
        turnNumber = 0;
        // Hide player 3's name and tile.
        document.getElementById('playerThreeName').style.display = "none";
        document.getElementById('playerThreeScore').style.display = "none";
        // Hide the first to 3 setting.
        document.getElementById('firstToThree').style.display = "none";
        // Resize all tiles
        var nums = [];
        for (var i = 1; i < 17; i++) {
            nums[i] = parseInt(document.getElementById("tile" + i).style.display = "block");
            nums[i] = parseInt(document.getElementById("tile" + i).style.width = "92px");
            nums[i] = parseInt(document.getElementById("tile" + i).style.height = "92px");
        }
        // Hide un-needed tiles.
        for (var i = 10; i < 17; i++) {
            nums[i] = parseInt(document.getElementById("tile" + i).style.display = "none");
        }
        console.log("Changed game mode to " + gameMode + " and changed the grid.");
        updateScores(gameMode);
    } else if (GM == 2) {
        gameModeName.innerHTML = "Three Players";
        gameMode = 2;
        // Make it player X's turn.
        highlightPlayer(0);
        playerTurn = 0;
        turnNumber = 0;
        // Un-hide player 3's name and tile.
        document.getElementById('playerThreeName').style.display = "inline-block";
        document.getElementById('playerThreeScore').style.display = "inline-block";
        // Un-hide the first to 3 setting.
        document.getElementById('firstToThree').style.display = "block";
        // Un-Hide all tiles
        var nums = [];
        for (var i = 1; i < 17; i++) {
            nums[i] = parseInt(document.getElementById("tile" + i).style.display = "block");
            nums[i] = parseInt(document.getElementById("tile" + i).style.width = "67.75px");
            nums[i] = parseInt(document.getElementById("tile" + i).style.height = "67.75px");
        }
        console.log("Changed game mode to " + gameMode + " and changed the grid.");
        updateScores(gameMode);
    }
}

function restartRound() {
    // Make it player X's turn.
    if (winnerGoesFirst == true) {
        if (justWon === '1' || justWon === '0') {
            highlightPlayer(0);
            playerTurn = 0;
            turnNumber = 0;
        } else if (justWon === '2') {
            highlightPlayer(1);
            playerTurn = 1;
            turnNumber = 0;
        } else if (justWon === '3') {
            highlightPlayer(2);
            playerTurn = 2;
            turnNumber = 0;
        }
    }
    if (winnerGoesFirst == false) {
        if (justWon === '1' || justWon === '0') {
            highlightPlayer(1);
            playerTurn = 1;
            turnNumber = 0;
        } else if (justWon === '2') {
            highlightPlayer(2);
            playerTurn = 2;
            turnNumber = 0;
        } else if (justWon === '3') {
            highlightPlayer(0);
            playerTurn = 0;
            turnNumber = 0;
        }
    }
    // Clear the board.
    clearBoard();
}

// Wipe the board.
function clearBoard() {
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
    clearTile(10);
    clearTile(11);
    clearTile(12);
    clearTile(13);
    clearTile(14);
    clearTile(15);
    clearTile(16);
    turnNumber = 0;
    gameWon = false;
    console.log("Just wiped the board clean!");
}

// Clear asked tile.
function clearTile(x) {
    document.getElementById("inTile" + x).innerHTML = "";
    document.getElementById("tile" + x).style.backgroundColor = "#EEE4DA";
    document.getElementById("tile" + x).style.opacity = "";
    console.log("Cleaning tile" + x);
}

// Highlight player number.
function highlightPlayer(player) {
    var player1tag = document.getElementById("playerOneName");
    var player2tag = document.getElementById("playerTwoName");
    var player3tag = document.getElementById("playerThreeName");
    if (player == 0) {
        player1tag.style.lineHeight = "35px";
        player1tag.style.color = "#FFFFFF";
        player2tag.style.lineHeight = "25px";
        player2tag.style.color = "#433628";
        player3tag.style.lineHeight = "25px";
        player3tag.style.color = "#433628";
        console.log("Just told Player X it's their turn!");
    } else if (player == 1) {
        player1tag.style.lineHeight = "25px";
        player1tag.style.color = "#433628";
        player2tag.style.lineHeight = "35px";
        player2tag.style.color = "#FFFFFF";
        player3tag.style.lineHeight = "25px";
        player3tag.style.color = "#433628";
        console.log("Just told Player X it's their turn!");
    } else if (player == 2) {
        player1tag.style.lineHeight = "25px";
        player1tag.style.color = "#433628";
        player2tag.style.lineHeight = "25px";
        player2tag.style.color = "#433628";
        player3tag.style.lineHeight = "35px";
        player3tag.style.color = "#FFFFFF";
        console.log("Just told Player X it's their turn!");
    }
}

// Update Scores.

function updateScores() {
    // Variables for score texts.
    var player1scoreTag = document.getElementById('playerOneScore');
    var player2scoreTag = document.getElementById('playerTwoScore');
    var player3scoreTag = document.getElementById('playerThreeScore');
    // Resolve game mode scores.
    if (gameMode == 0) {
        player1scoreTag.innerHTML = gm0ps1;
        player2scoreTag.innerHTML = gm0ps2;
    } else if (gameMode == 1) {
        player1scoreTag.innerHTML = gm1ps1;
        player2scoreTag.innerHTML = gm1ps2;
    } else if (gameMode == 2) {
        player1scoreTag.innerHTML = gm2ps1;
        player2scoreTag.innerHTML = gm2ps2;
        player3scoreTag.innerHTML = gm2ps3;
    }
    // Update Cookies as backup.
    updateCookies();
    console.log("Just Updated the Scores!");
}

// Update all cookies.
function updateCookies() {

    var wantedPersistance = '365'; // Length in days in which cookies are wanted to be stored.

    setCookie('gameMode', gameMode, wantedPersistance);
    setCookie('wGoesFirst', winnerGoesFirst, wantedPersistance);
    setCookie('monoMode', monoTone, wantedPersistance);
    setCookie('firstTo3', firstTo3, wantedPersistance);
    setCookie('gm0ps1', gm0ps1, wantedPersistance);
    setCookie('gm0ps2', gm0ps2, wantedPersistance);
    setCookie('gm1ps1', gm1ps1, wantedPersistance);
    setCookie('gm1ps2', gm1ps2, wantedPersistance);
    setCookie('gm2ps1', gm2ps1, wantedPersistance);
    setCookie('gm2ps2', gm2ps2, wantedPersistance);
    setCookie('gm2ps3', gm2ps3, wantedPersistance);
    setCookie('playerOneName', playerOneName, wantedPersistance);
    setCookie('playerTwoName', playerTwoName, wantedPersistance);
    setCookie('playerThreeName', playerThreeName, wantedPersistance);
    setCookie('player1threes', player1threes, wantedPersistance);
    setCookie('player2threes', player2threes, wantedPersistance);
    setCookie('player3threes', player3threes, wantedPersistance);
    console.log("Just Updated Cookies!");
}

function delSettings() {
    var confiSets = confirm("Are you sure you want to clear your settings?");
    if (confiSets == true) {
        delCookie('gameMode');
        delCookie('wGoesFirst');
        delCookie('monoMode');
        delCookie('firstTo3');
        console.log("Just Deleted Cookies!");
    }
}

function wipeScores() {
    var confiScore = confirm("Are you sure you want to clear your scores? This cannot be undone!");
    if (confiScore == true) {
        delCookie('gm0ps1');
        delCookie('gm0ps2');
        delCookie('gm1ps1');
        delCookie('gm1ps2');
        delCookie('gm2ps1');
        delCookie('gm2ps2');
        delCookie('gm2ps3');
        gm0ps1 = 0;
        gm0ps2 = 0;
        gm1ps1 = 0;
        gm1ps2 = 0;
        gm2ps1 = 0;
        gm2ps2 = 0;
        gm2ps3 = 0;
        updateScores();
    }
}

// Game play logic.

// Play turn function.
function playTurn(x) {
    if (gameWon == false) {
        if (document.getElementById('inTile' + x).innerHTML != 'X' && document.getElementById('inTile' + x).innerHTML != 'O' && document.getElementById('inTile' + x).innerHTML != 'Y') {
            turnNumber++;
            if (playerTurn == 0) {
                highlightTile(x, 0);
            } else if (playerTurn == 1) {
                highlightTile(x, 1);
            } else if (playerTurn == 2) {
                highlightTile(x, 2);
            }
        }
    }
    console.log("Just played turn number " + turnNumber);
}

// FUnction to highlight a specified tile to a player.
function highlightTile(x, p) {
    if (p == 0) {
        document.getElementById('inTile' + x).innerHTML = "X";
        document.getElementById('tile' + x).style.backgroundColor = "#FF8080";
        document.getElementById('tile' + x).style.opacity = "1";
    } else if (p == 1) {
        document.getElementById('inTile' + x).innerHTML = "O";
        document.getElementById('tile' + x).style.backgroundColor = "#80CCFF";
        document.getElementById('tile' + x).style.opacity = "1";
    } else if (p == 2) {
        document.getElementById('inTile' + x).innerHTML = "Y";
        document.getElementById('tile' + x).style.backgroundColor = "#E1DF55";
        document.getElementById('tile' + x).style.opacity = "1";
    }
    console.log("Just highlighted the tile " + x + " to player " + playerTurn + "'s colour.");
    checkWin();
}

// Check for a winner.

function checkWin() {

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
    var xa = document.getElementById('inTile10').innerHTML;
    var xb = document.getElementById('inTile11').innerHTML;
    var xc = document.getElementById('inTile12').innerHTML;
    var xd = document.getElementById('inTile13').innerHTML;
    var xe = document.getElementById('inTile14').innerHTML;
    var xf = document.getElementById('inTile15').innerHTML;
    var xg = document.getElementById('inTile16').innerHTML;

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
    var XA = document.getElementById('tile10').style;
    var XB = document.getElementById('tile11').style;
    var XC = document.getElementById('tile12').style;
    var XD = document.getElementById('tile13').style;
    var XE = document.getElementById('tile14').style;
    var XF = document.getElementById('tile15').style;
    var XG = document.getElementById('tile16').style;

    if (gameMode == 0) {
        console.log("No logic for gamemode 0 yet :(");
    } else if (gameMode == 1) {
        if (playerTurn == 0) {
            if (aa == 'X' && ab == 'X' && ac == 'X') {
                AA.backgroundColor = "#9AFF9A";
                AB.backgroundColor = "#9AFF9A";
                AC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player X just won!");
                gm1ps1++;
                turnNumber = 0;
                gameWon = true;
                justWon = 1;
                updateScores();
            } else if (ba == 'X' && bb == 'X' && bc == 'X') {
                BA.backgroundColor = "#9AFF9A";
                BB.backgroundColor = "#9AFF9A";
                BC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player X just won!");
                gm1ps1++;
                turnNumber = 0;
                gameWon = true;
                justWon = 1;
                updateScores();

            } else if (ca == 'X' && cb == 'X' && cc == 'X') {
                CA.backgroundColor = "#9AFF9A";
                CB.backgroundColor = "#9AFF9A";
                CC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player X just won!");
                gm1ps1++;
                turnNumber = 0;
                gameWon = true;
                justWon = 1;
                updateScores();

            } else if (aa == 'X' && ba == 'X' && ca == 'X') {
                AA.backgroundColor = "#9AFF9A";
                BA.backgroundColor = "#9AFF9A";
                CA.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player X just won!");
                gm1ps1++;
                turnNumber = 0;
                gameWon = true;
                justWon = 1;
                updateScores();

            } else if (ab == 'X' && bb == 'X' && cb == 'X') {
                AB.backgroundColor = "#9AFF9A";
                BB.backgroundColor = "#9AFF9A";
                CB.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player X just won!");
                gm1ps1++;
                turnNumber = 0;
                gameWon = true;
                justWon = 1;
                updateScores();

            } else if (ac == 'X' && bc == 'X' && cc == 'X') {
                AC.backgroundColor = "#9AFF9A";
                BC.backgroundColor = "#9AFF9A";
                CC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player X just won!");
                gm1ps1++;
                turnNumber = 0;
                gameWon = true;
                justWon = 1;
                updateScores();

            } else if (aa == 'X' && bb == 'X' && cc == 'X') {
                AA.backgroundColor = "#9AFF9A";
                BB.backgroundColor = "#9AFF9A";
                CC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player X just won!");
                gm1ps1++;
                turnNumber = 0;
                gameWon = true;
                justWon = 1;
                updateScores();

            } else if (ca == 'X' && bb == 'X' && ac == 'X') {
                CA.backgroundColor = "#9AFF9A";
                BB.backgroundColor = "#9AFF9A";
                AC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player X just won!");
                gm1ps1++;
                turnNumber = 0;
                gameWon = true;
                justWon = 1;
                updateScores();

            } else if (turnNumber == 9) {
                gameWon = true;
                justWon = 0;
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
                changeTurn();
                console.log("Nobody won!");
            }
            changeTurn();
            console.log("Just checked if player 1 has won.");
        } else if (playerTurn == 1) {
            if (aa == 'O' && ab == 'O' && ac == 'O') {
                AA.backgroundColor = "#9AFF9A";
                AB.backgroundColor = "#9AFF9A";
                AC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player O just won!");
                gm1ps2++;
                turnNumber = 0;
                gameWon = true;
                justWon = 2;
                updateScores();
            } else if (ba == 'O' && bb == 'O' && bc == 'O') {
                BA.backgroundColor = "#9AFF9A";
                BB.backgroundColor = "#9AFF9A";
                BC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player O just won!");
                gm1ps2++;
                turnNumber = 0;
                gameWon = true;
                justWon = 2;
                updateScores();
            } else if (ca == 'O' && cb == 'O' && cc == 'O') {
                CA.backgroundColor = "#9AFF9A";
                CB.backgroundColor = "#9AFF9A";
                CC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player O just won!");
                gm1ps2++;
                turnNumber = 0;
                gameWon = true;
                justWon = 2;
                updateScores();
            } else if (aa == 'O' && ba == 'O' && ca == 'O') {
                AA.backgroundColor = "#9AFF9A";
                BA.backgroundColor = "#9AFF9A";
                CA.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player O just won!");
                gm1ps2++;
                turnNumber = 0;
                gameWon = true;
                justWon = 2;
                updateScores();
            } else if (ab == 'O' && bb == 'O' && cb == 'O') {
                AB.backgroundColor = "#9AFF9A";
                BB.backgroundColor = "#9AFF9A";
                CB.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player O just won!");
                gm1ps2++;
                turnNumber = 0;
                gameWon = true;
                justWon = 2;
                updateScores();
            } else if (ac == 'O' && bc == 'O' && cc == 'O') {
                AC.backgroundColor = "#9AFF9A";
                BC.backgroundColor = "#9AFF9A";
                CC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player O just won!");
                gm1ps2++;
                turnNumber = 0;
                gameWon = true;
                justWon = 2;
                updateScores();
            } else if (aa == 'O' && bb == 'O' && cc == 'O') {
                AA.backgroundColor = "#9AFF9A";
                BB.backgroundColor = "#9AFF9A";
                CC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player O just won!");
                gm1ps2++;
                turnNumber = 0;
                gameWon = true;
                justWon = 2;
                updateScores();
            } else if (ca == 'O' && bb == 'O' && ac == 'O') {
                CA.backgroundColor = "#9AFF9A";
                BB.backgroundColor = "#9AFF9A";
                AC.backgroundColor = "#9AFF9A";
                document.getElementById('playAgain').innerHTML = "Play Again?";
                document.getElementById('playAgain').style.backgroundColor = "#9AFF9A";
                console.log("Player O just won!");
                gm1ps2++;
                turnNumber = 0;
                gameWon = true;
                justWon = 2;
                updateScores();
            } else if (turnNumber == 9) {
                gameWon = true;
                justWon = 0;
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
                changeTurn();
                console.log("Nobody won!");
            }
            changeTurn();
            console.log("Just checked if player 2 has won.");
        }
    } else if (gameMode == 2) {
        // Check for winning configs.
        // Player X.
        if (playerTurn == 0) {
            // Check turn number.
            if (turnNumber == 16) {

            }
            // Horizontals.
            else if (aa == 'X' && ab == 'X' && ac == 'X') {
                // Check first to three.
                if (firstTo3 == true) {
                    // If yes, they win.
                    gameWon = true;
                    justWon = 0;
                    // Colour Buttons and tiles.
                    document.getElementById('playAgain').innerHTML = "Play Again?";
                    document.getElementById('playAgain').style.backgroundColor = "#FF8533";
                    AA.backgroundColor = "#FF8533";
                    AB.backgroundColor = "#FF8533";
                    AC.backgroundColor = "#FF8533";
                    // Update Scores and save.
                    gm2ps1++;
                    updateScores();
                } else if (firstTo3 == false) {
                    // If not, they gain a point.

                }
            } else if (ab == 'X' && ac == 'X' && ba == 'X') {

            } else if (bb == 'X' && bc == 'X' && ca == 'X') {

            } else if (bc == 'X' && ca == 'X' && cb == 'X') {

            } else if (cc == 'X' && xa == 'X' && xb == 'X') {

            } else if (xa == 'X' && xb == 'X' && xc == 'X') {

            } else if (xd == 'X' && xe == 'X' && xf == 'X') {

            } else if (xe == 'X' && xf == 'X' && xg == 'X') {

            }
            // Verticals.
            else if (aa == 'X' && bb == 'X' && cc == 'X') {

            } else if (bb == 'X' && cc == 'X' && xd == 'X') {

            } else if (ab == 'X' && bc == 'X' && xa == 'X') {

            } else if (bc == 'X' && xa == 'X' && xe == 'X') {

            } else if (ac == 'X' && ca == 'X' && bx == 'X') {

            } else if (ca == 'X' && xb == 'X' && xf == 'X') {

            } else if (ba == 'X' && cb == 'X' && xc == 'X') {

            } else if (cb == 'X' && xc == 'X' && xg == 'X') {

            }
            // Horizontals.
            else if (aa == 'X' && bc == 'X' && xb == 'X') {

            } else if (bc == 'X' && xb == 'X' && xg == 'X') {

            } else if (bb == 'X' && xa == 'X' && xf == 'X') {

            } else if (ab == 'X' && ca == 'X' && xc == 'X') {

            } else if (ba == 'X' && ca == 'X' && xa == 'X') {

            } else if (ca == 'X' && xa == 'X' && xd == 'X') {

            } else if (ac == 'X' && bc == 'X' && cc == 'X') {

            } else if (cb == 'X' && xb == 'X' && xe == 'X') {

            }
        }
    }
}

// Chnage player turn.
function changeTurn() {
    if (gameMode == 0 || gameMode == 1) {
        if (gameWon === false) {
            if (playerTurn == 0) {
                playerTurn = 1;
                highlightPlayer(1);
            } else if (playerTurn == 1) {
                playerTurn = 0;
                highlightPlayer(0);
            }
        } else if (gameWon === true) {
            if (winnerGoesFirst === true && justWon != '0') {
                if (justWon == 1) {
                    playerTurn = 0;
                    highlightPlayer(0);
                } else if (justWon == 2) {
                    playerTurn = 1;
                    highlightPlayer(1);
                }
                justWon = 0;
            } else if (winnerGoesFirst === false) {
                if (playerTurn == 0) {
                    playerTurn = 1;
                    highlightPlayer(1);
                } else if (playerTurn == 1) {
                    playerTurn = 0;
                    highlightPlayer(0);
                }
            }
        }
    } else if (gameMode == 2) {
        if (playerTurn == 0) {
            playerTurn = 1;
            console.log("Just changed the player turn to " + playerTurn);
        } else if (playerTurn == 1) {
            playerTurn = 2;
            console.log("Just changed the player turn to " + playerTurn);
        } else if (playerTurn == 2) {
            playerTurn = 0;
            console.log("Just changed the player turn to " + playerTurn);
        }
    }
}

// Pika boo, I see you!
