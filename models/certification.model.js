const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({   
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    url: {
        type: String,
        required: [true, 'El url es obligatorio']
    },
    idUsuario: {
        type: String,
        required: [true, 'El idUsuario es obligatorio']
    },
    fechaExpedicion:{
        type: Date,
        required: [true, 'La fecha de Expedicion es obligatoria'],
    }
});

CertificationSchema.virtual('fecha_Expedicion')
.set(function(fecha) {
    this.fechaExpedicion = new Date(fecha);
})
.get(function(){
    return this.fechaExpedicion.toISOString().substring(0,10);
});

const Certification = mongoose.model('Certification', CertificationSchema);
module.exports = Certification;