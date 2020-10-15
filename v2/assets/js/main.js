const gridDisplay = document.getElementById('grid');
var data;
var gridSize = {y: 15, x: 15};
var grid = [];
var player;
var playerView = [];
var doorKey;

var pixelSize = 30;
if(window.innerWidth < 500)	{
	pixelSize = Math.floor(window.innerWidth/gridSize.x)-1;
	document.getElementById('d-pad').style.display = 'block';
}
const dPadArrow = document.querySelectorAll('#d-pad > .pad');

const map_option = document.getElementById('map-option');

map_option.addEventListener('change', function() {
	this.blur();
	let map = this.value;
	if(map === 'user-map') {
		data = JSON.parse(mapJSON);
		init();
	} else {
		loadMap(map);
	}
});

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
	gridSize = {y: data.settings.grid_size.y, x: data.settings.grid_size.x};
	player = {y: data.settings.start.y, x: data.settings.start.x};
	doorKey = data.settings.key_init;
	gridGenerate();
	mapGenerate(data.map);
	playerInit(player);
}

function loadMap(map) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText);
			init();
		}
	};
	xhttp.open('POST', 'map/'+map+'.json', true);
	xhttp.send();

}

if(typeof mapJSON === 'undefined') {
	loadMap(map_option.value);
} else {
	data = JSON.parse(mapJSON);

	let option = document.createElement('option');
	option.value = 'user-map';
	option.text = 'Your map';
	option.setAttribute('selected', true);
	map_option.prepend(option);

	init();
}