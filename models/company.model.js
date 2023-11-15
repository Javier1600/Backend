const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({   
    nombreEmpresa:{
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio'],
    },
    correo:{
        type: String,
        required: [true, "Correo electronico es requerido"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), 
            message: "Correo invalido"
        }
    },
    direccion:{
        type: String,
        required: [true, 'La direccion es obligatoria'],
    },
    telefono:{
        type: String,
    },
    descripcion:{
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    valores: {
        type: String,
        required: [true, 'Los valores son obligatorios'],
    },
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio'],
    },
    usuario:{
        type: String,
        required: [true, 'El usuario es obligatorio'],
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio'],
        minlength: [3, "La contraseña debe tener al menos 8 caracteres!!"]
    },
    
});

CompanySchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

CompanySchema.pre('validate', function(next) {
    console.log(this.password ,this.confirmPassword)
    if (this.password != this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match!');
    }
    next();
    });

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;