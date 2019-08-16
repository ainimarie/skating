let parks = [];

function ajax(url, fn) {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            fn(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

function loadParks() {

    ajax('skeittiparkit.json', function (response) {

        let obj = JSON.parse(response);
        parks = obj.parkit;

        console.log(parks);

        for (i=0;i<parks.length;i++) {
            var marker = L.marker([parks[i].lat, parks[i].long], {
                icon: pin
            }).addTo(mymap);
            break;
        }
    });
    
}
