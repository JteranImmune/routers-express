const express = require('express');
const router = express.Router();
let { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Clientes, Habitaciones, Reservas } = require('../schemas');


router.post('/nuevaHabitacion', async (req, res) => {

    let {numeroHabitacion, estado} = req.body;

    try {

        let habitacionNueva = new Habitaciones({ 
            _id: new mongoose.Types.ObjectId(),
            numeroHabitacion, 
            estado,
        });

        await habitacionNueva.save();
        res.status(200).send({
            mensaje: 'Habitacion agregada: ' + habitacionNueva.numeroHabitacion,
            habitacionNueva
        });
        
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al agregar',
            error
        });
    }
}) 

module.exports = router;