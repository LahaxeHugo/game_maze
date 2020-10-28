function initResize() {
	if(window.innerWidth < 500)	{
		pixelSize = Math.floor(window.innerWidth/gridSize.x)-1;
		dPad.style.display = 'block';
	} else {
		pixelSize = 30;
		dPad.style.display = 'none';
	}
}

function init() {
	gridDisplay.innerHTML = '';
	grid = [];
	playerView = [];
	gridSize = {y: data.settings.grid_size.y, x: data.settings.grid_size.x};
	player = {y: data.settings.start.y, x: data.settings.start.x};
	doorKey = data.settings.key_init;
	viewRadius = data.settings.view_radius;
	initResize();
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

function imagePreload() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			imageArray = JSON.parse(this.responseText);
			imageGenerateObj(imageArray);
		}
	};
	xhttp.open('POST', 'app/ajax.php', true);

	xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhttp.send('action=img&type=getAll');
}

function imageGenerateObj(imageArray) {
	var images = [];
	for(let i = 0; i < imageArray.length; i++) {
		images[i] = new Image();
		images[i].src = imageArray[i];
	}
}

mapOption.addEventListener('change', function() {
	this.blur();
	let map = this.value;
	if(map === 'user-map') {
		data = JSON.parse(mapJSON);
		init();
	} else {		
		loadMap(map);
	}
});


imagePreload();
if(typeof mapJSON === 'undefined') {
	loadMap(mapOption.value);
} else {
	data = JSON.parse(mapJSON);
	
	let option = document.createElement('option');
	option.value = 'user-map';
	option.text = 'Your map';
	option.setAttribute('selected', true);
	mapOption.prepend(option);
	
	init();
}

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