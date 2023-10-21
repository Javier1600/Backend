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

UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    console.log(this.password ,this.confirmPassword)
    if (this.password != this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match!');
    }
    next();
    });

const User = mongoose.model('User', UserSchema);
module.exports = User;