const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const car2goVehicles = JSON.parse(fs.readFileSync('car2go/vehicles.json', 'utf8'));
const mytaxiVehicles = JSON.parse(fs.readFileSync('mytaxi/vehicles.json', 'utf8'));

// Return static files
app.use(express.static(__dirname + '/dist'));

// CAR2GO ROUTE
app.get('/car2go/vehicles', (req, res) => {
    res.send(JSON.stringify(car2goVehicles));
});

// MYTAXI ROUTE
app.get('/mytaxi/vehicles', (req, res) => {
    res.send(JSON.stringify(mytaxiVehicles));
});

// Catch all others and return index.html
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
    console.log(`Listening on Port: ${port} ♪♩♫♯♭`);
});
