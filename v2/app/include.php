<?php
	function standardizePath($path) {
		return str_replace('\\', '/', str_replace('//', '/', $path));
	}

	define("FILE_ROOT_PATH", dirname(__DIR__));
	define('ROOT_PATH', str_replace(standardizePath($_SERVER['DOCUMENT_ROOT']), '', standardizePath(FILE_ROOT_PATH)));
	define("APP_PATH", FILE_ROOT_PATH.'/app');
	define("APP_FUNCT_PATH", APP_PATH.'/function');
	define("APP_HANDLER_PATH", APP_PATH.'/handler');
	define("IMG_PATH", FILE_ROOT_PATH.'/assets/img');
	define("IMG_PATH_SERVER", ROOT_PATH.'/assets/img');
	

	$uploadPasswd = 'plop';
?>