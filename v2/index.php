<?php
	include_once 'app/include.php';
	include_once APP_HANDLER_PATH.'/map_handler.php';
	
	$mapFile = array_slice(scandir('map/'), 2);
	$mapOption = '';
	foreach($mapFile as $map) {
		$mapInfo = pathinfo($map);
		$mapOption .= '<option value="'.$mapInfo['filename'].'">'.$mapInfo['filename'].'</option>';
	}	
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Maze</title>
	<link rel="stylesheet" href="assets/css/reset.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<link rel="stylesheet" href="assets/css/d-pad.css">
</head>
<body>
	<main>
		<section>
			<select id="map-option">
				<?php echo $mapOption; ?>
			</select>
			<div id="grid"></div>
			<div id="d-pad">
				<div class="pad" direction="up"><img src="assets/img/arrow.svg" alt=""></div>
				<div class="pad" direction="right"><img src="assets/img/arrow.svg" alt=""></div>
				<div class="pad" direction="down"><img src="assets/img/arrow.svg" alt=""></div>
				<div class="pad" direction="left"><img src="assets/img/arrow.svg" alt=""></div>
				<div class="pad-center"></div>
			</div>
		</section>
	</main>
	<?php echo !empty($json) ? "<script>var mapJSON='".$json."'</script>" : '';?>
	<script src="assets/js/init.js"></script>
	<script src="assets/js/game.js"></script>
	<script src="assets/js/main.js"></script>
</body>
</html>