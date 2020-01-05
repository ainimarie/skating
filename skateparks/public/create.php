<?php

if (isset($_POST['submit'])) {
	require "../config.php";
	require "../common.php";

	try {
		$connection = new PDO($dsn, $username, $password, $options);
		
		$new_park = array (
			"parkName" 		=> $_POST['parkName'],
			"latitude" 		=> $_POST['latitude'],
			"longitude" 	=> $_POST['longitude'],
			"imgUrl" 		=> $_POST['imgUrl'],
			"description" 	=> $_POST['description']
		);

		$sql = sprintf(
			"INSERT INTO %s (%s) values (%s)",
			"parks",
			implode(", ", array_keys($new_park)),
			":" . implode(", :", array_keys($new_park))
		);
		
		$statement = $connection->prepare($sql);
		$statement->execute($new_park);

	} catch (PDOException $error) {
		echo $sql . "<br><br>" . $error->getMessage();
	}
}


include "templates/header.php"; ?>

<div class="box__info" style="display: block;">

<form method="post">
	<label for="parkName">Nimi</label>
	<input type="text" name="parkName" id="parkName">
	<label for="latitude">Latitude</label>
	<input type="text" name="latitude" id="latitude">
	<label for="longitude">Longitude</label>
	<input type="text" name="longitude" id="longitude">
	<label for="imgUrl">Kuvan url ('kuvannimi.jpg')</label>
	<input type="text" name="imgUrl" id="imgUrl">
	<label for="description">Kuvaus</label>
	<input type="text" name="description" id="description"><br>
	<input type="submit" name="submit" value="Luo parkki">
</form>

<a href="index.php">Takaisin</a>

</div>

<?php if (isset($_POST['submit']) && $statement) { ?>
	<?php echo $_POST['parkName']; ?> lisätty. 
<?php } ?>

<?php include "templates/footer.php"; ?>