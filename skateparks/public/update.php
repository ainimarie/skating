<?php

try {
    require "../config.php";
    require "../common.php";

$connection = new PDO($dsn, $username, $password, $options);

    $sql = "SELECT * FROM parks";

    $statement = $connection->prepare($sql);
    $statement->execute();

    $result = $statement->fetchAll();
} catch (PDOException $error) {
    echo $sql . "<br>" . $error->getMessage();
}

include "templates/header.php"; ?>

<div class="box__info" style="display: block;">

<h2>Päivitä tietoja</h2>

<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Parkin nimi</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Kuva</th>
            <th>Kuvaus</th>
            <th>Muokkaa</th>
        </tr>
    </thead>
<tbody>
    <?php foreach ($result as $row) : ?>
    <tr>
        <td><?php echo escape($row['id']); ?></td>
        <td><?php echo escape($row['parkName']); ?></td>
        <td><?php echo escape($row['latitude']); ?></td>
        <td><?php echo escape($row['longitude']); ?></td>
        <td><?php echo escape($row['imgUrl']); ?></td>
        <td><?php echo escape($row['description']); ?></td>
        <td><a href="muokkaa-parkkia.php?id=<?php echo escape($row['id']); ?>">Muokkaa</a></td>
</tr>
<?php endforeach; ?>
</tbody>
</table>

</div>

<?php include "templates/footer.php"; ?>