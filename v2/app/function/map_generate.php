<?php
	function mapGenerate($file, $keyInit, $viewRadius) {
		$resource = imagecreatefrompng($file);
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
		$settings['key_init'] = $keyInit;
		$settings['view_radius'] = $viewRadius;
		$data = ['settings' => $settings, 'map' => $map];

		return $data;
	}
?>