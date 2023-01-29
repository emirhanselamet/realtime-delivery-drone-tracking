const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors')

app.use(cors())

//teslimat dronelarının konumları
let droneLocations = [
    { id: 1, lat: 37.7749, lng: -122.4194 },
    { id: 2, lat: 40.785091, lng: -73.968285 },
    { id: 3, lat: 40.785091, lng: -73.968285 }
];

app.use(express.static('public'));

io.on('connection', socket => {
    // bağlandığında droneların konumlarını gönder
    socket.emit('droneLocations', droneLocations);

    // droneların konumlarını değiştir
    socket.on('updateDroneLocation', newLocation => {
        let index = droneLocations.findIndex(loc => loc.id === newLocation.id);
        droneLocations[index] = newLocation;

        // tüm bağlı cihazlara konumları güncelle
        io.sockets.emit('droneLocations', droneLocations);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

