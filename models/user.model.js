const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({   
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellido:{
        type: String,
        required: [true, 'El apellido es obligatorio'],
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    fechaNacimiento:{
        type: Date,
        required: [true, 'La fechaNacimiento es obligatoria'],
    },
    telefono:{
        type: String,
    },
    usuario:{
        type: String,
        required: [true, 'El usuario es obligatorio'],
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    
});

UserSchema.virtual('fecha_Nacimiento')
.set(function(fecha) {
    this.fechaNacimiento = new Date(fecha);
})
.get(function(){
    return this.fechaNacimiento.toISOString().substring(0,10);
});

const User = mongoose.model('User', UserSchema);
module.exports = User;