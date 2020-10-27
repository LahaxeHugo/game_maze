function gridGenerate() {
	gridDisplay.style.width = gridSize.x*pixelSize+'px';
	gridDisplay.style.height = gridSize.y*pixelSize+'px';
	
	for (let i = 0; i < gridSize.y; i++) {
		grid[i] = [];
		for(let j = 0; j < gridSize.x; j++) {
			grid[i][j] = {type: 0, player: 0, visible: 0};
			let pixel = document.createElement('div');
			pixel.classList.add('pixel');
			pixel.setAttribute('data-y', i);
			pixel.setAttribute('data-x', j);
			pixel.style.top = i*pixelSize+'px';
			pixel.style.left = j*pixelSize+'px';
			pixel.style.width = pixelSize+'px';
			pixel.style.height = pixelSize+'px';
			gridDisplay.append(pixel);
		}
	}
}

function mapGenerate(map) {
	for(y in map) {
		for(x in map[y]) {
			mapPixel(y, x, map[y][x]);
		}
	}
}

function getPixelEl(y, x) {
	return document.querySelector('.pixel[data-y="'+y+'"][data-x="'+x+'"]');
}

function mapPixel(y, x, type = 1) {
	grid[y][x].type = type;
	let el = getPixelEl(y, x);
	el.setAttribute('type', type);
}

function playerInit(player) {
	grid[player.y][player.x].player = 1;
	let el = getPixelEl(player.y, player.x);
	el.setAttribute('player','1');
	playerViewUpdate();
}

function playerMove(direction) {
	let newPos = {y: player.y, x: player.x};
	switch (direction) {
		case 'left':	newPos.x--;break;
		case 'right':	newPos.x++;break;
		case 'up':		newPos.y--;break;
		case 'down':	newPos.y++;break;
	}

	if(newPos.x >= 0 && newPos.x < gridSize.x && newPos.y >= 0 && newPos.y < gridSize.y) {
		let type = grid[newPos.y][newPos.x].type;
		if(type !== 0) {
			let update = false;
			if(type === 3 || type === 5) {
				if(doorKey > 0) {
					doorKey--;
					if(type === 5) {
						alert('You win !');
						init();
					} else {
						update = true;	
					}
				} else {
					alert('Find the key !');
				}
			} else {
				update = true;
			}

			if(update === true) {
				grid[player.y][player.x].player = 0;
				let currEl = getPixelEl(player.y, player.x);
				currEl.setAttribute('player','0');
				
				let newEl = getPixelEl(newPos.y, newPos.x);
				grid[newPos.y][newPos.x].player = 1;
				grid[newPos.y][newPos.x].type = 1;
				newEl.setAttribute('player','1');
				newEl.setAttribute('type','1');
				player = {y: newPos.y, x: newPos.x};
				
				playerViewUpdate();
				
				if(type === 2) {
					newEl.setAttribute('type', '1');
					doorKey++;
				}
			}
		}
	}
}

function playerViewUpdate() {
	let area = viewRadius*2+1;

	for(let i = 0; i < playerView.length; i++) {
		playerView[i].el.setAttribute('visible', '0');
	}
	playerView = [];
	

	let start = {
		y: player.y-viewRadius,
		x: player.x-viewRadius
	}
	
	for(i = 0; i < area; i++) {
		for(j = 0; j < area; j++) {
			let y = start.y+i;
			let x = start.x+j;
			if(grid[y] && grid[y][x]) {
				playerViewPixel(y, x);
			}
		}
	}
}

function playerViewPixel(y, x) {
	let el = getPixelEl(y, x);
	el.setAttribute('visible', '1');

	grid[y][x].visible = 1;
	playerView.push({y: y, x: x, el: el});
}