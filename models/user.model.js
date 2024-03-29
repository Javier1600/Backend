const mongoose = require('mongoose');
const md5 = require('md5');

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
    sexo: {
        type: String,
        required: [true, 'El sexo es obligatorio']
    },
    fechaNacimiento:{
        type: Date,
        required: [true, 'La fechaNacimiento es obligatoria'],
    },
    telefono:{
        type: String,
        required: [true, 'El teléfono es obligatorio'],
    },
    descripcionPersonal:{
        type: String,
        required: [true, 'La descripción personal es obligatoria'],
    },
    estado:{
        type: String,
        required: [true, 'El estado es obligatorio'],
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

UserSchema.virtual('confirmPassword')
.get( () => this.confirmPassword )
.set( value => this.confirmPassword = value );

UserSchema.pre('new', function(next) {
    console.log(this.password ,this.confirmPassword)
    if (this.password != this.confirmPassword) {
    this.invalidate('confirmPassword', 'Las contraseñas deben coincidir!');
    }
    next();
    });

UserSchema.pre('save', function(next) {
    this.password = md5(this.password);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;