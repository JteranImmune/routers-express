const express  = require('express');
const app =  express();
const port = process.env.PORT || 3000;
const mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let pedidos = require('./routers/pedido'); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use('/pedir', pedidos);

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function connectMongo() {
    try {
        await client.connect()
        .then((client) => app.locals.db = client.db('mongodonalds'))
        await client.db("admin").command({ ping: 1 })
        console.log("🟢 MongoDB está conectado")
    } catch (error) {
        console.error("🔴 MongoDB no conectado:", error)
    }
}

connectMongo()

app.get('/menus', async (req, res) => {

    try {
        const results = await app.locals.db.collection('menus').find().toArray();
        console.log(results);
        results
        ? res.status(200).send({mensaje: "Petición satisfecha.", results})
        : res.status(401).send({mensaje: "La petición no ha devuelto resultados", results})
    } catch (error) {
        res.status(500).send({mensaje:"Error el pedir los menus " + error})
    }

});


app.listen(port, (e) =>{
    e
    ? console.log(`Error en servidor: ${e}`)
    : console.log("Servidor andando!");
});