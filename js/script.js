/**********************************************/
//              Affichage de la map
/**********************************************/
var mymap = L.map('mapid').setView([45.764043, 4.835659], 14);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);



function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

// ---------------------------------------------------------------------------------------------------------------

/* voici à quoi ressemble une station :
{
    "number": 2010,
    "contract_name": "lyon",
    "name": "2010 - CONFLUENCE / DARSE",
    "address": "ANGLE ALLEE ANDRE MURE ET QUAI ANTOINE RIBOUD",
    "position": {
      "lat": 45.743317,
      "lng": 4.815747
    },
    "banking": true,
    "bonus": false,
    "bike_stands": 22,
    "available_bike_stands": 17,
    "available_bikes": 5,
    "status": "OPEN",
    "last_update": 1624106334000
  }
 */

// Requête API

// JC Decaux API
let apiKeyJCD = '2ed0dff9c37c1bc4632b54a40ea8761be49f7e4f';
let url = `https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=2ed0dff9c37c1bc4632b54a40ea8761be49f7e4f`

console.log(url);
const afficheMap = data => {
    // avec cet affichage on remarque que les stations sont rangées 100 par 100.
    console.log(`Nombre de station : ${data.length}`);
    // Avec map je vais lancer displayItem sur chaque élément de data
    data.map(item => displayItem(item));
}

const displayItem = item => {
    // ici je train chaque station
    // Ce qui m'intéresse : "name", "position",
    console.log(item.name);
    console.log(item.position["lat"]);

    L.marker([item.position["lat"], item.position["lng"]]).addTo(mymap)
        .bindPopup(`<b>${item.name}</b><br />I am a popup.`).openPopup();
    let popup = L.popup();
}

fetch(url, {method: 'GET', header: {'Access-Control-Allow-Origin': ' http://localhost:63342/velib/url'}, mode: 'cors'})
        .then(response => response.json())
        .then(afficheMap)



