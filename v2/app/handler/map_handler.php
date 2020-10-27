<?php
	if(isset($_POST['mg-submit'])) {
		$keyInit = ($_POST['mg-key_init']) ? $_POST['mg-key_init'] : 0;
		$viewRadius = ($_POST['mg-view_radius']) ? $_POST['mg-view_radius'] : 1;
		$file = ($_FILES['mg-file']['tmp_name']) ? $_FILES['mg-file']['tmp_name'] : '';
		if(empty($file)) {
			echo 'Fail to upload image';
			die();
		}
		$name = basename($_FILES['mg-file']['name'], '.png');
		
		include_once APP_FUNCT_PATH.'/map_generate.php';
		$data = mapGenerate($file, $keyInit, $viewRadius);
		$json = json_encode($data, JSON_FORCE_OBJECT);

		if(isset($_POST['mg-passwd']) && $_POST['mg-passwd'] === $uploadPasswd) {
			file_put_contents('./map/'.$name.'.json', $json);
		}
	}
?>