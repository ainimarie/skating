<?php include "templates/header.php"; ?>

   

<h2 id="fav" onclick="listFavs()">Suosikkiparkit</h2>
        <div id="favBox"><ul id="favList"></ul>
        </div>

    <h2 id="search">Hae parkkia</h2>
        <div id="findBox">       
            <form id="searchform">
            <input type="text" id="parkName" name="parkName">
            <input type="submit" name="submit" value="Hae">
            </form>
        </div>

        <div id="weatherbox"></div>
    <div id="parkbox" class="box__info"></div>
   
    

<?php include "templates/footer.php"; ?>