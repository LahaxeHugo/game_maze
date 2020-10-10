const gridDisplay = document.getElementById('grid');
const gridSize = {y: 15, x: 15};
var grid = [];
var pixelSize = 30;
if(window.innerWidth < 500)	{
	pixelSize = Math.floor(window.innerWidth/gridSize.x)-1;
	document.getElementById('d-pad').style.display = 'block';
}
const dPadArrow = document.querySelectorAll('#d-pad > .pad');
var player = {y: 14, x: 7};
var playerView = [];
var keyFound = false;

// Play Key Z,Q,S,D or ↑,→,↓,←
document.addEventListener('keydown', e => {
	let key = e.keyCode;
	if([37, 38, 39, 40, 81, 90, 68, 83].includes(key)) {
		if(key === 37 || key === 81) direction = 'left';
		if(key === 38 || key === 90) direction = 'up';
		if(key === 39 || key === 68) direction = 'right';
		if(key === 40 || key === 83) direction = 'down';
		playerMove(direction);
	}
});

// Play Dpad
for(let i = 0; i < dPadArrow.length; i++) {
	let dPadEl = dPadArrow[i];
	dPadEl.addEventListener('click', function() {
		direction = this.getAttribute('direction');
		playerMove(direction);
	});
}

function init() {
	gridDisplay.innerHTML = '';
	grid = [];
	playerView = [];
	player = {y: 14, x: 7};
	keyFound = false;
	gridGenerate();
	
	roomPixel(0,7,3);
	roomPixel(1,1);roomPixel(1,2);roomPixel(1,3);roomPixel(1,4);roomPixel(1,7);roomPixel(1,10);roomPixel(1,11);roomPixel(1,12);
	roomPixel(2,1);roomPixel(2,4);roomPixel(2,5);roomPixel(2,6);roomPixel(2,7);roomPixel(2,10);
	roomPixel(3,1);roomPixel(3,9);roomPixel(3,10);
	roomPixel(4,0);roomPixel(4,1);roomPixel(4,2);roomPixel(4,3);roomPixel(4,5);roomPixel(4,6);roomPixel(4,7);roomPixel(4,8);roomPixel(4,9);
	roomPixel(5,0);roomPixel(5,5);roomPixel(5,12);roomPixel(5,13,2);roomPixel(5,14);
	roomPixel(6,0);roomPixel(6,2);roomPixel(6,3);roomPixel(6,4);roomPixel(6,5);roomPixel(6,6);roomPixel(6,7);roomPixel(6,8);roomPixel(6,9);roomPixel(6,10);roomPixel(6,12);roomPixel(6,13);roomPixel(6,14);
	roomPixel(7,0);roomPixel(7,2);roomPixel(7,7);roomPixel(7,12);roomPixel(7,13);roomPixel(7,14);
	roomPixel(8,0);roomPixel(8,1);roomPixel(8,2);roomPixel(8,7);roomPixel(8,13);
	roomPixel(9,1);roomPixel(9,4);roomPixel(9,5);roomPixel(9,7);roomPixel(9,8);roomPixel(9,9);roomPixel(9,10);roomPixel(9,13);
	roomPixel(10,1);roomPixel(10,5);roomPixel(10,7);roomPixel(10,10);roomPixel(10,13);
	roomPixel(11,1);roomPixel(11,3);roomPixel(11,4);roomPixel(11,5);roomPixel(11,6);roomPixel(11,7);roomPixel(11,10);roomPixel(11,11);roomPixel(11,13);
	roomPixel(12,3);roomPixel(12,7);roomPixel(12,11);roomPixel(12,13);
	roomPixel(13,1);roomPixel(13,2);roomPixel(13,3);roomPixel(13,6);roomPixel(13,7);roomPixel(13,8);roomPixel(13,11);roomPixel(13,12);roomPixel(13,13);
	roomPixel(14,6);roomPixel(14,7);roomPixel(14,8);
	
	playerInit();
}
init();