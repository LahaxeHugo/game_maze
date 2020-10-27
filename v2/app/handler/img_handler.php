<?php
	if(isset($_POST['type']) && $_POST['type'] === 'getAll') {
		include_once '../include.php'; // TODO : rework with switch on global page

		$imagesName = array_slice(scandir(IMG_PATH), 2);
		$imagesPath = [];
		foreach($imagesName as $image) {
			$imagesPath[] = IMG_PATH_SERVER.'/'.$image;
		}

		$json = json_encode($imagesPath);
		echo $json;
	}

?>