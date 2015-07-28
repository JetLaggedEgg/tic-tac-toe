var loadingDiv = document.getElementById("loadingScreen");
var pageWrapper = document.getElementById("pageWrapper");

function pageReady () {
	console.log("Starting in 2 seconds.");
	setTimeout(function() {
		loadGame();
	}, 2000);
}

function loadGame () {
	loadingDiv.style.opacity = "0";
	initialise();
	setTimeout(function() {
		loadingDiv.style.display = "none";
	}, 500);
}