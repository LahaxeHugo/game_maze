<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Upload Your own map</title>
</head>
<body>
	<form id="mg" action="../" method="post" enctype="multipart/form-data">
		<!-- <div class="mg-type">
			<label for="mg-type">Type :</label>
			<select name="mg-type" id="mg-type">
				<option value="png" selected>PNG</option>
				<option value="json">JSON</option>
			</select>
		</div> -->
		<div class="mg-file">
			<label for="mg-file">File :</label>
			<input type="file" name="mg-file" id="mg-file" required>
		</div>
		<div class="mg-key_init">
			<label for="mg-key_init">Key(s) at start :</label>
			<input type="number" name="mg-key_init" id="mg-key_init" required>
		</div>
		<div class="mg-view_radius">
			<label for="mg-view_radius">View Radius :</label>
			<input type="number" name="mg-view_radius" id="mg-view_radius" required>
		</div>
		<div class="mg-passwd">
			<label for="mg-passwd">Upload Password :</label>
			<input type="text" name="mg-passwd" id="mg-passwd" autocomplete="off">
		</div>

		<input type="submit" name="mg-submit" value="Load">
	</form>
</body>
</html>