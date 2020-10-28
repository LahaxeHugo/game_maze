<?php
	if(isset($_POST['mg-submit'])) {
		do {
			$keyInit = ($_POST['mg-key_init']) ? $_POST['mg-key_init'] : 0;
			$viewRadius = ($_POST['mg-view_radius']) ? $_POST['mg-view_radius'] : 1;
			$file = ($_FILES['mg-file']['tmp_name']) ? $_FILES['mg-file']['tmp_name'] : '';
			if(empty($file)) {
				error_throw(1, 'No file found'); break;
			}
			$name = basename($_FILES['mg-file']['name'], '.png');
			
			include_once APP_FUNCT_PATH.'/map_generate.php';
			$data = mapGenerate($file, $keyInit, $viewRadius);
			$json = json_encode($data, JSON_FORCE_OBJECT);
	
			if(isset($_POST['mg-passwd']) && !empty($_POST['mg-passwd'])) {
				if($_POST['mg-passwd'] === UPLOAD_PASSWD) {
					if(!file_put_contents('./map/'.$name.'.json', $json)) {
						error_throw(1, 'Fail to upload'); break;
					}
				} else {
					error_throw(2, 'Wrong Password'); break;
				}
			}
		} while(false);
	}
?>