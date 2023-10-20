const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema({   
    descripcionResponsabilidades: {
        type: String,
        required: [true, 'La descripcion de Responsabilidades es obligatoria']
    },
    ambitoLaboral: {
        type: String,
        required: [true, 'El ámbito laboral es obligatorio']
    },
    empresa: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio']
    },
    fechaInicio:{
        type: Date,
        required: [true, 'La fecha de Inicio es obligatoria'],
    },
    fechaFin:{
        type: Date,
        required: [true, 'La fecha de Fin es obligatoria'],
    },
    idUsuario:{
        type: String,
        required: [true, 'El idUsuario es obligatorio']
    }
});

WorkExperienceSchema.virtual('fecha_inicio')
.set(function(fecha) {
    this.fechaInicio = new Date(fecha);
})
.get(function(){
    return this.fechaInicio.toISOString().substring(0,10);
});

WorkExperienceSchema.virtual('fecha_fin')
.set(function(fecha) {
    this.fechaFin = new Date(fecha);
})
.get(function(){
    return this.fechaFin.toISOString().substring(0,10);
});

const WorkExperience = mongoose.model('WorkExperience', WorkExperienceSchema);
module.exports = WorkExperience;