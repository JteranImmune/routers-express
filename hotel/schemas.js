const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaClientes = Schema({
    _id: Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: [true, "Es necesario un nombre"],
        maxlength: [15, "Nombre muy largo"]
    },
    apellido: {
        type: String,
        required: [true, "Es necesario el apellido"],
        maxlength: [15, "Apellido muy largo"]
    },
    dni: {
        type: String,
        unique: true,
        validate: {
            validator: function (dni) {
                // Expresión regular para validar un DNI español
                const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
                // Comprobar si el DNI cumple con la expresión regular
                return dniRegex.test(String(dni).toUpperCase());
            },
            message: props => `${props.value} no es un DNI español válido.`
        }
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

const schemaHabitaciones = Schema({
    _id: Schema.Types.ObjectId,
    numeroHabitacion: {
        type: Number,
        validate: {
            validator: (value) => value <= 8,
            message: props => `${props.value} no debe ser mayor a 30.`
        },
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

const schemaReservas = Schema({
    _id: Schema.Types.ObjectId,
    habitacion: {
        type: Schema.Types.ObjectId,
        ref: 'Habitaciones',
        required: true,
    },
    checkIn: {
        type: Date,
        validate: {
            validator: function (value) {
                // Validar que el check-in sea después de la fecha actual
                return value > new Date();
            },
            message: props => 'La fecha de check-in debe ser posterior a la fecha actual.'
        },
        required: true,
    },
    checkOut: {
        type: Date,
        validate: {
            validator: function (value) {
                // Validar que el check-out sea posterior al check-in por al menos un día
                return value > this.checkIn && value - this.checkIn >= 24 * 60 * 60 * 1000;
            },
            message: props => 'La fecha de check-out debe ser posterior al check-in por al menos un día.'
        },
        required: true,
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

const Clientes = mongoose.model('cliente', schemaClientes);
const Habitaciones = mongoose.model('habitacion', schemaHabitaciones, 'habitaciones');
const Reservas = mongoose.model('reserva', schemaReservas);

module.exports = {
    Clientes,
    Habitaciones,
    Reservas
};
