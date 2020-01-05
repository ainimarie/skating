<?php

/**
 * parkin muokkaus submit-formilla
 */

 require '../config.php';
 require '../common.php';

 if (isset($_POST['submit'])) {
    try {
      $connection = new PDO($dsn, $username, $password, $options);
      $park =[
        "id"        => $_POST['id'],
        "parkName" => $_POST['parkName'],
        "latitude"  => $_POST['latitude'],
        "longitude"     => $_POST['longitude'],
        "imgUrl"       => $_POST['imgUrl'],
        "description"  => $_POST['description']
      ];
  
      $sql = "UPDATE parks
              SET id = :id,
              parkName = :parkName,
              latitude = :latitude,
              longitude = :longitude,
              imgUrl = :imgUrl,
              description = :description
              WHERE id = :id";
  
    $statement = $connection->prepare($sql);
    $statement->execute($park);
    } catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }
  }


 if (isset($_GET['id'])) {
     try {
         $connection = new PDO($dsn, $username, $password, $options);
         $id = $_GET['id'];

         $sql = "SELECT * FROM parks WHERE id = :id";
         $statement = $connection->prepare($sql);
         $statement->bindValue(':id', $id);
         $statement->execute();

         $park = $statement->fetch(PDO::FETCH_ASSOC);
     } catch(PDOException $error) {
         echo $sql . "<br>" . $error->getMessage();
     }
     
 } else {
     echo 'Jokin meni pieleen :(';
     exit;
 }

 include "templates/header.php"; ?>

 <div class="box__info" style="display: block;">
 

<?php if (isset($_POST['submit']) && $statement) : ?>
<?php echo escape($_POST['parkName']); ?> päivitetty!
<?php endif; ?>

 <h3>Muokkaa parkkia</h3>

 <form method="post">
 <?php foreach ($park as $key => $value) : ?>
<label for="<?php echo $key; ?>">
<?php echo ucfirst($key); ?>
</label>
<input type="text" name="<?php echo $key; ?>" id="<?php echo $key; ?>" value="<?php echo escape($value); ?>" <?php echo ($key === 'id' ? 'readonly' : null); ?>>
<?php endforeach; ?>
 <input type="submit" name="submit" value="Submit">
 </form>

<?php include "templates/footer.php"; ?>