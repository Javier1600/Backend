const mongoose = require('mongoose');

const PostulationSchema = new mongoose.Schema({   
    idUsuario: {
        type: String,
        required: [true, 'El idUsuario es obligatorio']
    },
    idEmpleo: {
        type: String,
        required: [true, 'El idEmpleo es obligatorio']
    },
    estado:{
        type: String,
        required: [true, 'El estado es obligatorio'],
    },
    motivoRechazo:{
        type: String,
    },
    fechaPostulacion:{
        type: Date,
        required: [true, 'La fecha de postulación es obligatoria'],
    },
    estadoPostulacion:{
        type: String,
        required: [true, 'El estado de la postulacion es obligatorio'],
    },
});

const Postulation = mongoose.model('Postulation', PostulationSchema);
module.exports = Postulation;