const mongoose = require('mongoose');

const UserPhotoSchema = new mongoose.Schema({   

    foto:{
        type: String,
        default: ''
    },
    ruta: {
        type: String,
        default: ''
    },
    idUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const UserPhoto = mongoose.model('UserPhoto', UserPhotoSchema);
module.exports = UserPhoto;