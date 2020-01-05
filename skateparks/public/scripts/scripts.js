const parkBox = document.getElementById("parkbox");
const mapBox = document.getElementById("map");
const weatherBox = document.getElementById("weatherbox");
let parks = [];
let forecast = [];
let favParks = [""];
let i = 0;

function storageOnLoad() {
  if (!localStorage.parks) {
    localStorage.setItem("parks", JSON.stringify(favParks));
  }
}

function ajax(urlAdd, fn) {
  $.ajax({
    url: urlAdd
  })
    .fail(function() {
      console.log("failed to get data!");
    })
    .done(function(data) {
      fn(data);
    });
}

//map

var mymap = L.map("map", {
  center: [62.2438095, 25.7365319],
  zoom: 13,
  zoomControl: false
});

var tileUrl =
    "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=12345",
  layer = new L.TileLayer(tileUrl, { maxZoom: 18 });

mymap.addLayer(layer);

var pin = L.icon({
  iconUrl: "img/skate.png",
  iconSize: [45, 45],
  iconAnchor: [16, 32],
  popupAnchor: [-32, -32]
});

//updating weather

function updateWeather(park) {
  ajax(
    `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/12345/${park.latitude},${park.longitude}?lang=fi&units=si`,
    function(response) {
      forecast = response;
      console.log(forecast);
      $("#weatherbox").empty();
      $("#weatherbox").append(`<h3>${park.parkName}, sää nyt</h3>
                                 <span class="weather__span"><img src="img/${forecast.currently.icon}.png" class="weather__img"> ${forecast.currently.temperature} °C
                               ${forecast.currently.summary}</span>
                                <h4>Lähipäivien ennuste</h4>
                                <span class="weather__span"><img src="img/${forecast.daily.icon}.png" class="weather__img">
                                 ${forecast.daily.summary}</span>`);
    }
  );
}

//loading parks

function loadParks() {
  ajax("../get_parks.php", function(response) {
    parks = response;

    $.each(parks, function(index, park) {
      var marker = L.marker([park.latitude, park.longitude], {
        icon: pin
      }).addTo(mymap);
      var imgList = document.querySelectorAll(".leaflet-marker-icon");

      imgList[index].addEventListener("click", function(e) {
        showPark(park);
      });
    });
  });
}

//showing parkbox-element

function showPark(park) {
  if ((weatherBox.style.display = "none")) {
    $(weatherBox).slideToggle("fast");
  }
  updateWeather(park);
  mymap.panTo([park.latitude, park.longitude]);

  $(parkBox).empty();
  if ((parkBox.style.display = "none")) {
  }
  let parkContent = `<div id="parkdesc"><span id="close">X</span>
                     <h3>${park.parkName}</h3>
                    <p>${park.description}</p>`;

  if (!park.imgUrl) {
    let imgContent = `<p>ei kuvaa saatavilla</p></div>`;
    $(parkBox).append(imgContent);
  } else {
    let imgContent = `<a href="img/parks/${park.imgUrl}" target="_blank"><img src="img/parks/${park.imgUrl}"></a></div>`;
    $(parkBox).append(imgContent);
  }

  $(parkBox).append(parkContent);

  //favourite-heart

  let retrievedData = localStorage.getItem("parks");
  favParks = JSON.parse(retrievedData);

  if (favParks.includes(park.parkName)) {
    $(parkBox).append(
      `<span class="fav__span">Suosikki <img src="img/heart-full.png" id="favImg" class="smaller__icon" onclick="addToFav('${park.parkName}')"></span>`
    );
  } else {
    $(parkBox).append(
      `<span class="fav__span">Suosikki <img src="img/heart-empty.png" id="favImg" class="smaller__icon" onclick="addToFav('${park.parkName}')"></span>`
    );
  }

  $("#favImg").click(function() {
    if (favParks.includes(park.parkName)) {
      $("#favImg").attr("src", "img/heart-full.png");
    } else {
      $("#favImg").attr("src", "img/heart-empty.png");
    }
  });

  $(parkBox).slideToggle("linear");

  $("#close").click(function() {
    $(parkBox).slideToggle("fast");
    $(weatherBox).slideToggle("fast");
  });
}

//search-boxes

$("#search").click(function() {
  $("#findBox").slideToggle("fast");
});

$('#parkName').keyup(function (e) {
  let arr = [];
  console.log(parks);
  parks.forEach(park => {
    arr.push(park.parkName);
  });

  $("#parkName").autocomplete({
    source: arr
  });

});

$("#searchform").submit(function(e) {
  e.preventDefault();
  parks.forEach(park => {
    if ($("input:first").val() == park.parkName) {
      showPark(park);
    }
  });
});

//fake sign in for database stuff

function fakeSign() {
  $("#adminStuff").toggle();
}

//fav-stuff

$("#fav").on("click", function() {
  $("#favBox").slideToggle("linear");
});

function addToFav(park) {
  if (typeof Storage !== "undefined") {
    if (favParks == null || favParks.length === 0) {
      favParks.push(park);
      localStorage.setItem("parks", JSON.stringify(favParks));
    } else if (favParks !== "undefined" && favParks.includes(`${park}`)) {
      var filtered = favParks.filter(function(value) {
        return value !== park;
      });

      favParks = filtered;
      localStorage.setItem("parks", JSON.stringify(favParks));
    } else {
      favParks.push(park);
      localStorage.setItem("parks", JSON.stringify(favParks));
    }
  } else {
    document.getElementById("favBox").innerHTML =
      "Selaimesi ei tue suosikkeihin lisäämistä.";
  }
}

function listFavs() {
  if (typeof Storage !== "undefined") {
    var retrievedData = localStorage.getItem("parks");
    favParks = JSON.parse(retrievedData);

    if (favParks === undefined || favParks.length == 0) {
      document.getElementById("favBox").innerHTML =
        "Et ole lisännyt parkkeja suosikkeihin.";
    } else {
      $("#favList").empty();

      ajax("../get_parks.php", function(parks) {
        for (let i = 1; i < favParks.length; i++) {
          let content = document.createElement("li");
          content.innerHTML = `<li id="${favParks[i]}">${favParks[i]}</li>`;
          document.getElementById("favList").appendChild(content);

          var liList = document.querySelectorAll("li");

          liList[i].addEventListener("click", function(e) {
            console.log(this.id);

            if (
              (match = parks.find(function() {
                return favParks[i];
              }))
            ) {
              console.log(match);
              showPark(match);
            }
          });
        }
      });
    }
  } else {
    document.getElementById("favBox").innerHTML =
      "Selaimesi ei tue suosikkeihin lisäämistä.";
  }
}
