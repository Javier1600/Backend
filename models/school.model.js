const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({   
    nombreInstitucion: {
        type: String,
        required: [true, 'El nombre de la Institucion es obligatoria']
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicacion de la Institucion es obligatoria']
    },
    estado: {
        type: String,
        required: [true, 'Es estado de la Institucion es obligatorio']
    }
});

const School = mongoose.model('School', SchoolSchema);
module.exports = School;