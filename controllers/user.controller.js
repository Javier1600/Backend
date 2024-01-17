const User = require('../models/user.model');
const UserPhoto = require('../models/userPhoto.model');

module.exports.createUser = (request, response) =>{
    
    const {nombre, apellido, rol, sexo, fechaNacimiento, telefono, descripcionPersonal, estado, usuario, password, confirmPassword} = request.body;
    console.log(request.body)
    User.create({
        nombre, apellido, rol, sexo, fechaNacimiento, telefono,descripcionPersonal, estado, usuario, password, confirmPassword
    })
        .then(User => response.json({insertedUser: User, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllUsers = (_,response) =>{
    User.find({})
    .then(retrievedUsers => response.json(retrievedUsers))
    .catch(err => response.json(err))
}

module.exports.getUser = (request, response) =>{
    User.findOne({_id: request.params.id})
    .then(User => response.json(User))
    .catch(err => response.json(err))
}

module.exports.updateUser = (request, response) =>{
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateUser => response.json(updateUser))
    .catch(err => response.json(err))
}

module.exports.deleteUser = (request, response) =>{
    User.deleteOne({_id: request.params.id})
    .then(UserDeleted => response.json(UserDeleted))
    .catch(err => response.json(err))
}

module.exports.addPhoto = (request, response) => {
    if (!request.file) {
        return response.status(400).json({ error: 'No se ha enviado ningún archivo.' });
    }
    const filePath = 'Imagenes/' + request.file.filename;
    const nuevaFoto = {
        foto: request.file.filename,
        ruta: filePath,
        idUsuario : request.params.id
    };
    
    UserPhoto.findOne({idUsuario: request.params.id})
        .then(fotoUsuario => {
            if (!fotoUsuario) {
                return User.findById(request.params.id);
            }
            fotoUsuario.foto = nuevaFoto.foto;
            fotoUsuario.ruta = nuevaFoto.ruta;
            return fotoUsuario.save();
        })
        .then(userOrFoto => {
            if (!userOrFoto) {
                return Promise.reject({ status: 404, message: 'Usuario no encontrado' });
            }
            if (userOrFoto instanceof User) {
                return UserPhoto.create(nuevaFoto);
            }
            return userOrFoto;
        })
        .then(() => {
            return response.json({ mensaje: 'Foto agregada exitosamente' });
        })
        .catch(error => {
            console.error('Error al agregar la foto:', error);
            if (error.status) {
                return response.status(error.status).json({ error: error.message });
            } else {
                return response.status(500).json({ error: 'Error interno del servidor' });
            }
        });
};

module.exports.getUserPhoto = (request, response) => {
    UserPhoto.findOne({idUsuario: request.params.id})
        .then(user => {
            if (!user) {
                return response.status(404).json({ error: 'Usuario no encontrado.' });
            }
            const imageUrl = user.foto ? `https://0vmlb023-8000.use2.devtunnels.ms/Imagenes/${user.foto}` : null;
            response.json({ foto: imageUrl });
        })
        .catch(error => {
            console.error('Error al obtener la foto del usuario:', error);
            response.status(500).json({ error: 'Error interno del servidor' });
        });
};