const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({ 
    puesto: {
        type: String,
        required: [true, 'El puesto es obligatoria']
    },  
    idEmpresa: {
        type: String,
        required: [true, 'El id de la Empresa es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    formacionAcademica: {
        type: String,
        required: [true, 'La formación Academica es obligatoria']
    },
    experiencia: {
        type: String,
        required: [true, 'La experiencia es obligatoria']
    }, 
    conocimientos: {
        type: String,
        required: [true, 'Los conocimientos requeridos son obligatorios']
    },
    aptitudes: {
        type: String,
        required: [true, 'Las aptitudes requeridos son obligatorias']
    },
    modalidad: {
        type: String,
        required: [true, 'La modalidad es obligatoria']
    }, 
    numeroVacantes: {
        type: String,
        required: [true, 'El numero de vacantes es obligatorio']
    },
});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;