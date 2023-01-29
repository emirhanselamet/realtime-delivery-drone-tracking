const socket = io();

let map;
let markers = {};

socket.on('droneLocations', locations => {
    // haritayı oluştur
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.785091, lng: -73.968285 },
      })