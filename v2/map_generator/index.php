<?php
	$resource = imagecreatefrompng('map.png');
	$width = imagesx($resource);
	$height = imagesy($resource);
	$map = [];
	$settings = [];
	
	for($y = 0; $y < $height; $y++) {
		$data[$y] = [];
		for($x = 0; $x < $width; $x++) {
			$color = imagecolorat($resource, $x, $y);
			switch ($color) {
				case 16777215:	$map[$y][$x] = 1;	break;
				case 16776960:	$map[$y][$x] = 2;	break;
				case 65280:		$map[$y][$x] = 3;	break;
				case 255:		$map[$y][$x] = 1;	$settings['start'] = ['y'=>$y, 'x'=>$x];	break;
				case 16711680:	$map[$y][$x] = 5;	break;
			}
		}
	}

	$settings['grid_size'] = ['y'=>$height, 'x'=>$width];
	$settings['key_init'] = 0;
	$settings['player_view'] = 1;

	$data = ['settings' => $settings, 'map' => $map];
	// echo '<pre>'.print_r($data, true).'</pre>';
	$json = json_encode($data, JSON_FORCE_OBJECT);
	file_put_contents('../map/map.json', $json);

	echo 'Map Generated based of map.png, stored in map/map.json file';
?>