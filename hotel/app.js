const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
let registro = require('./routers/registro');
let checkIn = require('./routers/checkin');
let checkOut = require('./routers/checkout');
let habitacion = require('./routers/habitacion');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/registro', registro);
app.use('/checkin', checkIn);
app.use('/checkout', checkOut);
app.use('/habitaciones', habitacion);


mongoose.connect('mongodb://127.0.0.1:27017/hotel')
    .then(console.log('🟢 MongoDB está conectado'))
    .catch(err => {
    console.log('🔴 MongoDB no conectado: ' + err)
});


app.listen(port, (e) =>{
    e
    ? console.log(`Error en servidor: ${e}`)
    : console.log("Servidor andando!");
});