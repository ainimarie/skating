<?php
    require 'config.php';
    require 'common.php';

    $connection = new PDO($dsn, $username, $password, $options);


$parks = array();

$sql = "SELECT * FROM parks";

$statement = $connection->prepare($sql);
$statement->execute();
$result = $statement->fetchAll();

  foreach ($result as $row) {
    $parkName = $row['parkName'];
    $latitude = $row['latitude'];
    $longitude = $row['longitude'];
    $imgUrl = $row['imgUrl'];
    $description = $row['description'];
    $parks[] = array (
        'parkName' => $parkName,
        'latitude' => $latitude,
        'longitude' => $longitude,
        'imgUrl' => $imgUrl,
        'description' => $description
    );
  }
  $response = json_encode($parks);

  header('Content-type: application/json');
  echo $response;
  ?>
  