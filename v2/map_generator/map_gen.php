<?php
	$upload = FALSE;
	$passwd = 'plop';
	$json = '';

	if(isset($_REQUEST['mg-submit'])) {
		$key_init = ($_REQUEST['mg-key_init']) ? $_REQUEST['mg-key_init'] : 1;
		$view_radius = ($_REQUEST['mg-view_radius']) ? $_REQUEST['mg-view_radius'] : 1;
		$file = ($_FILES['mg-file']['tmp_name']) ? $_FILES['mg-file']['tmp_name'] : '';
		if(empty($file)) {
			echo 'Fail to upload image';
			die();
		}

		if(isset($_REQUEST['mg-passwd']) && $_REQUEST['mg-passwd'] === $passwd) $upload = TRUE;
	
		$name = basename($_FILES['mg-file']['name'], '.png');
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
		$settings['key_init'] = $key_init;
		$settings['view_radius'] = $view_radius;
	
		$data = ['settings' => $settings, 'map' => $map];
		// echo '<pre>'.print_r($data, true).'</pre>';
		$json = json_encode($data, JSON_FORCE_OBJECT);
		if($upload === TRUE) {
			file_put_contents('./map/'.$name.'.json', $json);
		}
	}

	// echo 'Map Generated based of map.png, stored in map/map.json file';
?>