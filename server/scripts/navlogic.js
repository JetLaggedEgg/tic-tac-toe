//NAV LOGIC FOR JETLAGGEDSTUDIOS' TIC-TAC-TOE!

var navState = 0;

var slidingDrawer = document.getElementById('lowerNav'); // Nav Drawer by ID.

var wantedHeight = 400; // Wanted Height.


// Nav Request Function
function navPwease () {
	if (navState == 0) {
		rotate();
		slidingDrawer.style.height = wantedHeight + 'px';
		navState = 1;
	}
	else {
		rotate();
		slidingDrawer.style.height = '0px';
		navState = 0;
	}
}

var rotated = false;

function rotate () {
    var div = document.getElementById('menuHamburger'),
        deg = rotated ? 0 : -90; // Nav button and varoius rotation variables.

    div.style.webkitTransform = 'rotate('+deg+'deg)';
    div.style.mozTransform    = 'rotate('+deg+'deg)';
    div.style.msTransform     = 'rotate('+deg+'deg)';
    div.style.oTransform      = 'rotate('+deg+'deg)';
    div.style.transform       = 'rotate('+deg+'deg)';

    rotated = !rotated;
}