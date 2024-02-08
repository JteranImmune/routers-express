const express = require('express');
const router = express.Router();

router.get('/menus', async (req, res) => {

    try {
        const results = await req.app.locals.db.collection('menus').find().toArray();
        results
        ? res.status(200).send({mensaje: "Petición satisfecha.", results})
        : res.status(401).send({mensaje: "La petición no ha devuelto resultados", results})
    } catch (error) {
        res.status(500).send({mensaje:"Error el pedir los menus " + error})
    }

});

router.get('/hamburguesas', async (req, res) => {

    try {
        const results = await req.app.locals.db.collection('hamburguesas').find().toArray();
        results
        ? res.status(200).send({mensaje: "Petición satisfecha.", results})
        : res.status(401).send({mensaje: "La petición no ha devuelto resultados", results})
    } catch (error) {
        res.status(500).send({mensaje:"Error el pedir las hamburguesas " + error})
    }

});

router.get('/bebidas', async (req, res) => {

    try {
        const results = await req.app.locals.db.collection('bebidas').find().toArray();
        results
        ? res.status(200).send({mensaje: "Petición satisfecha.", results})
        : res.status(401).send({mensaje: "La petición no ha devuelto resultados", results})
    } catch (error) {
        res.status(500).send({mensaje:"Error el pedir las bebidas " + error})
    }

});

router.get('/patatas', async (req, res) => {

    try {
        const results = await req.app.locals.db.collection('patatas').find().toArray();
        results
        ? res.status(200).send({mensaje: "Petición satisfecha.", results})
        : res.status(401).send({mensaje: "La petición no ha devuelto resultados", results})
    } catch (error) {
        res.status(500).send({mensaje:"Error el pedir las bebidas " + error})
    }

});

router.post('/enviar', async (req, res) => {

    let confirmacion = req.body;

    try {
        let results = await  req.app.locals.db.collection("pedidos").insertOne(confirmacion);
        res.status(200).send({mensaje: "Confirmación satisfecha.", results})
        
    } catch (error) {
        res.status(500).send({mensaje:"Error al confirmar " + error})
    }

});

module.exports = router;