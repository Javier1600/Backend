const mongoose = require('mongoose');

const AcadTrainingSchema = new mongoose.Schema({   
    idInstitucion: {
        type: String,
        required: [true, 'El idInstitucion es obligatorio']
    },
    idUsuario: {
        type: String,
        required: [true, 'El idUsuario es obligatorio']
    },
    fechaInicio:{
        type: Date,
        required: [true, 'La fecha de Inicio es obligatoria'],
    },
    fechaFin:{
        type: Date,
        required: [true, 'La fecha de Fin es obligatoria'],
    }
});

AcadTrainingSchema.virtual('fecha_inicio')
.set(function(fecha) {
    this.fechaInicio = new Date(fecha);
})
.get(function(){
    return this.fechaInicio.toISOString().substring(0,10);
});

AcadTrainingSchema.virtual('fecha_fin')
.set(function(fecha) {
    this.fechaFin = new Date(fecha);
})
.get(function(){
    return this.fechaFin.toISOString().substring(0,10);
});

const AcadTraining = mongoose.model('AcadTraining', AcadTrainingSchema);
module.exports = AcadTraining;