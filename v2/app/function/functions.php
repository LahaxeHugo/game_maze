<?php
	function standardizePath($path) {
		return str_replace('\\', '/', str_replace('//', '/', $path));
	}

	function error_throw($type, $message) {
		error_log($type.' '.$message);
	}
?>