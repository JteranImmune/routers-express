const express = require('express');
const router = express.Router();
let { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Clientes, Habitaciones, Reservas } = require('../schemas');

router.post('/clienteNuevo', async (req, res) => {

    let {nombre, apellido, dni} = req.body;

    try {

        let clienteNuevo = new Clientes({ 
            _id: new mongoose.Types.ObjectId(),
            nombre, 
            apellido, 
            dni 
        });

        await clienteNuevo.save();
        res.status(200).send({
            mensaje: 'Cliente agregado: ' + clienteNuevo.nombre,
            clienteNuevo
        });
        
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al agregar',
            error
        });
    }
}) 

router.put('/modificarCliente/:id', async (req,res)=>{

    let { nombre, apellido } = req.body;

    let _id = req.params.id;

    try {
        let results = await  Clientes.findByIdAndUpdate(_id ,{ $set:{ nombre, apellido }}); 
        
        res.status(200).send({ 
            mensaje:'Se ha modificado el cliente correctamente',
            results
        });

    } catch (error) {

        res.send({ mensaje: "No se ha podido completar la petición", error })
    }


}),

module.exports = router;