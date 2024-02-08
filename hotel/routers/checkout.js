const express = require('express');
const router = express.Router();
let { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Clientes, Habitaciones, Reservas } = require('../schemas');


router.put('/:dni', async (req, res) => {

    let dni = req.params.dni;

    try {

        const cliente = await Clientes.findOne({ dni: dni }); 

        if (!cliente) return res.status(401).send("Cliente no encontrado");

        const reserva = await Reservas.findOne({cliente: cliente._id});

        const habitacion = await Habitaciones.findOne({_id: reserva.habitacion._id});
        
        habitacion.estado = false;

        await habitacion.save();

            res.status(200).send({
                mensaje: 'Checkout realizado '
            });
        
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al agregar',
            error
        });
    }
}) 

module.exports = router;