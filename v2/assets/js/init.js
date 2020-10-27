const gridDisplay = document.getElementById('grid');
const mapOption = document.getElementById('map-option');
const dPad = document.getElementById('d-pad');
const dPadArrow = document.querySelectorAll('#d-pad > .pad');
const rootFolder = '../../';

var data;
var gridSize;
var grid;
var player;
var playerView;
var doorKey;
var view_radius;
var pixelSize = 30;