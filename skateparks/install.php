<?php 

/**
 * installing database
 */

require "config.php";

try {
$connection = new PDO("mysql:host=$host", $username, $password, $options);

$sql = file_get_contents("data/init.sql");
$connection->exec($sql);
echo "Tietokanta luotu";
} catch(PDOException $error) {
    echo $sql . "<br><br>" . $error->getMessage();
}