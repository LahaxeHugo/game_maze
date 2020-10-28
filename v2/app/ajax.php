<?php
	include_once 'include.php';

	$type = is_string($_POST['action']) ? $_POST['action'] : 0;
	switch ($type) {
		case 'img':
			include_once APP_HANDLER_PATH.'img_handler.php';
			break;
		
		default:
			error_throw(1, 'Invalid action');
			break;
	}
?>