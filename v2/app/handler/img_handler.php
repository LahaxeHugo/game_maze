<?php
	if(isset($_POST['type']) && $_POST['type'] === 'getAll') {
		$imagesName = array_slice(scandir(IMG_PATH), 2);
		$imagesPath = [];
		foreach($imagesName as $image) {
			$imagesPath[] = IMG_PATH_SERVER.$image;
		}

		$json = json_encode($imagesPath);
		echo $json;
	}
?>