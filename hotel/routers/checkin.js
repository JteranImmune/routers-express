const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let { ObjectId } = require('mongodb');
const { Clientes, Habitaciones, Reservas } = require('../schemas');


router.post('/nuevaReserva', async (req, res) => {

    let {dni, numeroHabitacion, checkIn, checkOut} = req.body;

    try {

        const cliente = await Clientes.findOne({ dni: dni }); 

        if (!cliente) return res.status(401).send("Cliente no encontrado");

        const  habitacion = await Habitaciones.findOne({numeroHabitacion});

        if(habitacion.estado === true){

            return res.send({mensaje:"La habitación no está disponible"});

        }else{

            habitacion.estado = true;
            await habitacion.save();
            const newReserva = new Reservas ({
                _id: new mongoose.Types.ObjectId(),
                habitacion : habitacion._id,   
                checkIn,
                checkOut,
                cliente: cliente._id
            });

            await newReserva.save()

            res.status(200).send({
                mensaje: 'Reserva realizada ' + newReserva._id
            });
        }
        
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al agregar',
            error
        });
    }
}) 

module.exports = router;