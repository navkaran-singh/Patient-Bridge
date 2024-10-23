var map = L.map("map").setView([30.5161, 76.6598], 15);

navigator.geolocation.watchPosition(success, error); // keeps watching user's location continuosly

let circle;
let marker;

function success(position) {
  const { latitude, longitude, accuracy } = position.coords;

  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  if (accuracy < 1000) {
    circle = L.circle([latitude, longitude], { radius: accuracy }).addTo(map);
    marker = L.marker([latitude, longitude]).addTo(map);
    console.log(accuracy);
  } else {
    circle = L.circle([30.5161, 76.6598], 15).addTo(map);
    marker = L.marker([30.5161, 76.6598], 15).addTo(map);
    console.log(accuracy);
  }

  map.fitBounds(circle.getBounds());
}

function error(err) {
  alert("Please Allow Location Access");
}

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 17,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
